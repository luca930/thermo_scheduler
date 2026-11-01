"""Applica le programmazioni ai climate con un solo timer sul prossimo cambio."""
from __future__ import annotations

import logging
from collections import deque
from collections.abc import Callable
from datetime import timedelta
from functools import partial

from homeassistant.core import CALLBACK_TYPE, Context, Event, HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_track_point_in_time, async_track_state_change_event
from homeassistant.util import dt as dt_util

from .core.conditions import Condition, evaluate
from .core.heating import Room, calibration, minutes_to_target
from .core.resolve import Override, Target, resolve
from .core.schedule import Profile, next_block, next_change
from .learning import HeatingLearner
from .storage import Assignment, Storage

_LOGGER = logging.getLogger(__name__)
UNAVAILABLE = ("unavailable", "unknown")
MAX_EPISODES = 60  # cicli di riscaldamento tenuti per climate
PREHEAT_MARGIN = timedelta(minutes=5)  # anticipo in più oltre la stima


def _estimate_reason(t_in, t_out, minutes) -> str | None:
    if t_in is None:
        return "inside"
    if t_out is None:
        return "outdoor"
    return None if minutes is not None else "unreachable"


class Manager:
    def __init__(self, hass: HomeAssistant, storage: Storage) -> None:
        self.hass = hass
        self.storage = storage
        self.own_context_ids: deque[str] = deque(maxlen=64)
        self._unsub_timer: CALLBACK_TYPE | None = None
        self._unsub_states: CALLBACK_TYPE | None = None
        self._tracked: tuple[str, ...] = ()
        self._active: dict[str, Condition] = {}
        self._pending: dict[tuple[str, str], CALLBACK_TYPE] = {}
        self._unsub_cond: CALLBACK_TYPE | None = None
        self._cond_tracked: tuple[str, ...] = ()
        self._listeners: list[Callable[[], None]] = []
        self._learner = HeatingLearner()

    @property
    def _saved_mode(self) -> dict[str, str]:
        return self.storage.data.saved_modes

    def async_add_listener(self, callback: Callable[[], None]) -> CALLBACK_TYPE:
        self._listeners.append(callback)
        return lambda: self._listeners.remove(callback)

    def next_change_for(self, climate_id: str):
        return self._schedule_until(climate_id)

    def active_condition(self, climate_id: str) -> Condition | None:
        return self._active.get(climate_id)

    async def async_set_profile(self, climate_id: str, profile_id: str) -> None:
        data = self.storage.data
        if profile_id not in data.profiles:
            raise ValueError(f"Programmazione sconosciuta: {profile_id}")
        current = data.assignments.get(climate_id)
        data.assignments[climate_id] = Assignment(
            profile_id, current.condition_ids if current else (), current.enabled if current else True
        )
        await self.storage.async_save()
        await self.async_refresh()

    async def async_unassign(self, climate_id: str) -> None:
        data = self.storage.data
        data.assignments.pop(climate_id, None)
        data.overrides.pop(climate_id, None)
        self._active.pop(climate_id, None)
        self._saved_mode.pop(climate_id, None)
        for key in [k for k in self._pending if k[0] == climate_id]:
            self._pending.pop(key)()
        await self.storage.async_save()
        await self.async_refresh()

    async def async_set_enabled(self, climate_id: str, enabled: bool) -> None:
        assignment = self.storage.data.assignments.get(climate_id)
        if assignment is None:
            raise ValueError(f"Climate senza programmazione: {climate_id}")
        assignment.enabled = enabled
        await self.storage.async_save()
        await self.async_refresh(climate_id)

    async def async_start(self) -> None:
        await self.async_refresh()

    async def async_stop(self) -> None:
        for cancel in self._pending.values():
            cancel()
        self._pending.clear()
        if self._unsub_cond:
            self._unsub_cond()
            self._unsub_cond = None
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
        if profile is None or not assignment.enabled:
            return None
        now = dt_util.now()
        target = resolve(profile, now, data.overrides.get(climate_id), self._active.get(climate_id))
        plan = self._preheat_plan(climate_id, profile, target, now)
        if plan is not None and now >= plan[0]:
            block = plan[1]
            return Target("scheduled", block.temperature, block.hvac_mode, target.until, preheating=True)
        return target

    def _preheat_plan(self, climate_id: str, profile: Profile, target: Target | None, now):
        """(inizio dell'anticipo, fascia successiva) se il preriscaldamento è attivo e serve."""
        if target is None or target.state != "scheduled" or target.temperature is None:
            return None
        if climate_id not in self.storage.data.preheat:
            return None
        found = next_block(profile, now)
        if found is None:
            return None
        start, block = found
        if block.temperature <= target.temperature:
            return None
        estimate = self.estimate(climate_id, block.temperature)
        if estimate["minutes"] is None:
            return None
        return start - timedelta(minutes=estimate["minutes"]) - PREHEAT_MARGIN, block

    async def async_clear_override(self, climate_id: str) -> None:
        if self.storage.data.overrides.pop(climate_id, None) is not None:
            await self.storage.async_save()
        await self.async_refresh(climate_id)

    async def async_refresh(self, climate_id: str | None = None) -> None:
        now = dt_util.now()
        expired = [c for c, o in self.storage.data.overrides.items() if o.until <= now]
        for cid in expired:
            del self.storage.data.overrides[cid]
        if expired:
            await self.storage.async_save()
        self._track_states()
        if climate_id is None:
            self._track_conditions()
            await self._sync_conditions()
        for cid in [climate_id] if climate_id else list(self.storage.data.assignments):
            target = self.target_for(cid)
            if target is not None:
                await self._apply(cid, target)
        self._rearm()
        for notify in list(self._listeners):
            notify()

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
        cid = event.data["entity_id"]
        old, new = event.data["old_state"], event.data["new_state"]
        if new is None or new.state in UNAVAILABLE:
            return
        await self._learn(cid, new)
        if old is None or old.state in UNAVAILABLE:
            await self.async_refresh(cid)
        elif new.context.id not in self.own_context_ids and self._is_manual(cid, old, new):
            await self._set_override(cid, new)

    def _outdoor_temp(self) -> float | None:
        entity = self.storage.data.outdoor_entity
        state = self.hass.states.get(entity) if entity else None
        if state is None or state.state in UNAVAILABLE:
            return None
        try:
            return float(state.state)
        except ValueError:
            return None

    async def _learn(self, climate_id: str, new) -> None:
        episode = self._learner.observe(
            climate_id,
            new.state,
            new.attributes.get("current_temperature"),
            new.attributes.get("temperature"),
            self._outdoor_temp(),
        )
        if episode is None:
            return
        history = self.storage.data.episodes.setdefault(climate_id, [])
        history.append(episode)
        del history[:-MAX_EPISODES]
        await self.storage.async_save()

    def estimate(self, climate_id: str, target: float) -> dict:
        """Minuti per arrivare a `target` con i dati attuali e lo storico del climate."""
        data = self.storage.data
        room = data.rooms.get(climate_id)
        state = self.hass.states.get(climate_id)
        t_in = state.attributes.get("current_temperature") if state else None
        t_out = self._outdoor_temp()
        factor, samples = calibration(room or Room(), data.episodes.get(climate_id, []))
        minutes = None
        if t_in is not None and t_out is not None:
            minutes = minutes_to_target(room or Room(), t_in, target, t_out, factor)
        return {
            "minutes": None if minutes is None else round(minutes),
            "configured": room is not None,
            "samples": samples,
            "inside": t_in,
            "outdoor": t_out,
            "reason": _estimate_reason(t_in, t_out, minutes),
        }

    @staticmethod
    def _clamp(attrs, temp: float) -> float:
        return min(max(temp, attrs.get("min_temp", temp)), attrs.get("max_temp", temp))

    def _is_manual(self, climate_id: str, old, new) -> bool:
        target = self.target_for(climate_id)
        if target is None:
            return False
        new_temp = new.attributes.get("temperature")
        temp_changed = new_temp != old.attributes.get("temperature")
        if target.hvac_mode is None:
            mode_ok = new.state == old.state
        else:
            mode_ok = new.state == target.hvac_mode
        temp_ok = target.temperature is None or new_temp == self._clamp(new.attributes, target.temperature)
        if not temp_changed and mode_ok:
            return False
        return not (temp_ok and mode_ok)

    async def _set_override(self, climate_id: str, new) -> None:
        data = self.storage.data
        existing = data.overrides.get(climate_id)
        until = existing.until if existing else self._schedule_until(climate_id)
        if until is None:
            return
        data.overrides[climate_id] = Override(until, new.attributes.get("temperature"), new.state)
        await self.storage.async_save()
        await self.async_refresh(climate_id)

    def _schedule_until(self, climate_id: str):
        data = self.storage.data
        assignment = data.assignments.get(climate_id)
        profile = data.profiles.get(assignment.profile_id) if assignment else None
        return next_change(profile, dt_util.now()) if profile else None

    def _assigned(self, climate_id: str) -> list[Condition]:
        data = self.storage.data
        assignment = data.assignments.get(climate_id)
        ids = assignment.condition_ids if assignment else ()
        return [data.conditions[i] for i in ids if i in data.conditions]

    def _truth(self, cond: Condition) -> bool:
        states = {c.entity_id: s.state for c in cond.checks if (s := self.hass.states.get(c.entity_id))}
        return evaluate(cond, states)

    def _track_conditions(self) -> None:
        ids = tuple(
            sorted(
                {
                    check.entity_id
                    for cid in self.storage.data.assignments
                    for cond in self._assigned(cid)
                    for check in cond.checks
                }
            )
        )
        if ids == self._cond_tracked:
            return
        if self._unsub_cond:
            self._unsub_cond()
        self._cond_tracked = ids
        self._unsub_cond = (
            async_track_state_change_event(self.hass, list(ids), self._on_condition_state) if ids else None
        )

    async def _on_condition_state(self, _event: Event) -> None:
        await self._sync_conditions()

    async def _sync_conditions(self) -> None:
        for cid in list(self.storage.data.assignments):
            conds = {c.id: c for c in self._assigned(cid)}
            active = self._active.get(cid)
            if active and (active.id not in conds or not self._truth(conds[active.id])):
                await self._deactivate(cid)
            for cond in conds.values():
                key = (cid, cond.id)
                if not self._truth(cond):
                    if cancel := self._pending.pop(key, None):
                        cancel()
                elif key not in self._pending and cid not in self._active:
                    if cond.delay <= 0:
                        await self._activate(cid, cond.id)
                    else:
                        when = dt_util.now() + timedelta(seconds=cond.delay)
                        self._pending[key] = async_track_point_in_time(
                            self.hass, partial(self._activate_later, cid, cond.id), when
                        )

    async def _activate_later(self, climate_id: str, cond_id: str, _now) -> None:
        self._pending.pop((climate_id, cond_id), None)
        await self._activate(climate_id, cond_id)

    async def _activate(self, climate_id: str, cond_id: str) -> None:
        cond = next((c for c in self._assigned(climate_id) if c.id == cond_id), None)
        if cond is None or climate_id in self._active or not self._truth(cond):
            return
        state = self.hass.states.get(climate_id)
        if cond.action.kind == "off" and state and state.state not in (*UNAVAILABLE, "off"):
            self._saved_mode[climate_id] = state.state
            await self.storage.async_save()
        self._active[climate_id] = cond
        if self.storage.data.overrides.pop(climate_id, None) is not None:
            await self.storage.async_save()
        await self.async_refresh(climate_id)

    async def _deactivate(self, climate_id: str) -> None:
        self._active.pop(climate_id, None)
        mode = self._saved_mode.pop(climate_id, None)
        if mode:
            await self.storage.async_save()
        state = self.hass.states.get(climate_id)
        # ponytail: se la fascia non impone una modalità, rimette quella che il climate aveva prima di `off`
        if (
            mode
            and climate_id not in self.storage.data.overrides
            and state
            and state.state == "off"
            and mode in state.attributes.get("hvac_modes", [])
        ):
            context = Context()
            self.own_context_ids.append(context.id)
            await self._call("set_hvac_mode", {"entity_id": climate_id, "hvac_mode": mode}, context)
        await self.async_refresh(climate_id)

    def _rearm(self) -> None:
        if self._unsub_timer:
            self._unsub_timer()
            self._unsub_timer = None
        now = dt_util.now()
        untils = []
        for cid, assignment in self.storage.data.assignments.items():
            target = self.target_for(cid)
            if target is None:
                continue
            if target.until:
                untils.append(target.until)
            profile = self.storage.data.profiles.get(assignment.profile_id)
            plan = self._preheat_plan(cid, profile, target, now) if profile and not target.preheating else None
            if plan is not None and plan[0] > now:
                untils.append(plan[0])
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
            temp = self._clamp(attrs, temp)
            if temp != attrs.get("temperature"):
                await self._call("set_temperature", {"entity_id": climate_id, "temperature": temp}, context)

    async def _call(self, service: str, data: dict, context: Context) -> None:
        try:
            await self.hass.services.async_call("climate", service, data, blocking=True, context=context)
        except HomeAssistantError:
            _LOGGER.exception("climate.%s fallito per %s", service, data["entity_id"])
