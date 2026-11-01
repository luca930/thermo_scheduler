"""Applica le programmazioni ai climate con un solo timer sul prossimo cambio."""
from __future__ import annotations

import logging
from collections import deque

from homeassistant.core import CALLBACK_TYPE, Context, Event, HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_track_point_in_time, async_track_state_change_event
from homeassistant.util import dt as dt_util

from .core.resolve import Target, resolve
from .storage import Storage

_LOGGER = logging.getLogger(__name__)
UNAVAILABLE = ("unavailable", "unknown")


class Manager:
    def __init__(self, hass: HomeAssistant, storage: Storage) -> None:
        self.hass = hass
        self.storage = storage
        self.own_context_ids: deque[str] = deque(maxlen=64)
        self._unsub_timer: CALLBACK_TYPE | None = None
        self._unsub_states: CALLBACK_TYPE | None = None
        self._tracked: tuple[str, ...] = ()

    async def async_start(self) -> None:
        await self.async_refresh()

    async def async_stop(self) -> None:
        if self._unsub_timer:
            self._unsub_timer()
            self._unsub_timer = None
        if self._unsub_states:
            self._unsub_states()
            self._unsub_states = None

    def target_for(self, climate_id: str) -> Target | None:
        data = self.storage.data
        assignment = data.assignments.get(climate_id)
        profile = data.profiles.get(assignment.profile_id) if assignment else None
        if profile is None:
            return None
        return resolve(profile, dt_util.now(), data.overrides.get(climate_id), None)

    async def async_refresh(self, climate_id: str | None = None) -> None:
        self._track_states()
        for cid in [climate_id] if climate_id else list(self.storage.data.assignments):
            target = self.target_for(cid)
            if target is not None:
                await self._apply(cid, target)
        self._rearm()

    def _track_states(self) -> None:
        ids = tuple(sorted(self.storage.data.assignments))
        if ids == self._tracked:
            return
        if self._unsub_states:
            self._unsub_states()
        self._tracked = ids
        self._unsub_states = (
            async_track_state_change_event(self.hass, list(ids), self._on_state) if ids else None
        )

    async def _on_state(self, event: Event) -> None:
        old, new = event.data["old_state"], event.data["new_state"]
        if new and new.state not in UNAVAILABLE and (old is None or old.state in UNAVAILABLE):
            await self.async_refresh(event.data["entity_id"])

    def _rearm(self) -> None:
        if self._unsub_timer:
            self._unsub_timer()
            self._unsub_timer = None
        untils = [
            t.until for cid in self.storage.data.assignments if (t := self.target_for(cid)) and t.until
        ]
        if untils:
            self._unsub_timer = async_track_point_in_time(self.hass, self._on_timer, min(untils))

    async def _on_timer(self, _now) -> None:
        self._unsub_timer = None
        await self.async_refresh()

    async def _apply(self, climate_id: str, target: Target) -> None:
        state = self.hass.states.get(climate_id)
        if state is None or state.state in UNAVAILABLE:
            return
        attrs = state.attributes
        context = Context()
        self.own_context_ids.append(context.id)
        mode = target.hvac_mode
        if mode and mode in attrs.get("hvac_modes", []) and mode != state.state:
            await self._call("set_hvac_mode", {"entity_id": climate_id, "hvac_mode": mode}, context)
        temp = target.temperature
        if temp is not None:
            temp = min(max(temp, attrs.get("min_temp", temp)), attrs.get("max_temp", temp))
            if temp != attrs.get("temperature"):
                await self._call("set_temperature", {"entity_id": climate_id, "temperature": temp}, context)

    async def _call(self, service: str, data: dict, context: Context) -> None:
        try:
            await self.hass.services.async_call("climate", service, data, blocking=True, context=context)
        except HomeAssistantError:
            _LOGGER.exception("climate.%s fallito per %s", service, data["entity_id"])
