"""Un sensore di stato per ogni climate assegnato."""
from __future__ import annotations

from homeassistant.components.sensor import SensorEntity
from homeassistant.core import callback


async def async_setup_entry(hass, entry, async_add_entities) -> None:
    manager = entry.runtime_data
    known: set[str] = set()

    @callback
    def add_new() -> None:
        new = [c for c in manager.storage.data.assignments if c not in known]
        known.update(new)
        async_add_entities([ThermoSensor(manager, c) for c in new])

    add_new()
    entry.async_on_unload(manager.async_add_listener(add_new))


def _iso(value):
    return value.isoformat() if value else None


class ThermoSensor(SensorEntity):
    _attr_should_poll = False

    def __init__(self, manager, climate_id: str) -> None:
        self._manager = manager
        self._cid = climate_id
        self._attr_unique_id = f"{climate_id}_scheduler"
        self._attr_name = f"{climate_id.split('.', 1)[1]} scheduler"

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self._manager.async_add_listener(self.async_write_ha_state))

    @property
    def native_value(self):
        assignment = self._manager.storage.data.assignments.get(self._cid)
        if assignment is None:
            return None
        if not assignment.enabled:
            return "disabled"
        target = self._manager.target_for(self._cid)
        return target.state if target else None

    @property
    def extra_state_attributes(self):
        data = self._manager.storage.data
        assignment = data.assignments.get(self._cid)
        profile = data.profiles.get(assignment.profile_id) if assignment else None
        target = self._manager.target_for(self._cid)
        active = self._manager.active_condition(self._cid)
        return {
            "profile": profile.name if profile else None,
            "setpoint": target.temperature if target else None,
            "next_change": _iso(self._manager.next_change_for(self._cid)),
            "override_until": _iso(target.until) if target and target.state == "override" else None,
            "condition": active.name if active else None,
        }
