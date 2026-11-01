from datetime import datetime
from zoneinfo import ZoneInfo

from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_time_changed,
    async_mock_service,
)

from custom_components.thermo_scheduler.const import DOMAIN

CLIMATE = "climate.salotto"
ROME = ZoneInfo("Europe/Rome")
ATTRS = {"temperature": 19.0, "hvac_modes": ["off", "heat"], "min_temp": 7, "max_temp": 30}


def stored(temp=21.0, hvac_mode=None):
    blocks = [
        {"days": [0, 1, 2, 3, 4], "start": "06:30", "temperature": temp, "hvac_mode": hvac_mode},
        {"days": [0, 1, 2, 3, 4], "start": "22:00", "temperature": 17.0, "hvac_mode": None},
    ]
    return {
        "version": 1,
        "minor_version": 1,
        "key": DOMAIN,
        "data": {
            "profiles": {"p1": {"id": "p1", "name": "Casa", "blocks": blocks}},
            "conditions": {},
            "assignments": {CLIMATE: {"profile_id": "p1", "condition_ids": []}},
            "overrides": {},
        },
    }


async def setup(hass, hass_storage, freezer, data=None, state="heat"):
    await hass.config.async_set_time_zone("Europe/Rome")
    freezer.move_to(datetime(2026, 11, 4, 7, 0, tzinfo=ROME))
    hass_storage[DOMAIN] = data or stored()
    hass.states.async_set(CLIMATE, state, ATTRS)
    temp_calls = async_mock_service(hass, "climate", "set_temperature")
    mode_calls = async_mock_service(hass, "climate", "set_hvac_mode")
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return temp_calls, mode_calls


async def test_applies_block_at_start(hass, hass_storage, freezer):
    temp_calls, mode_calls = await setup(hass, hass_storage, freezer)
    assert [c.data["temperature"] for c in temp_calls] == [21.0]
    assert mode_calls == []


async def test_timer_rearms_on_next_change(hass, hass_storage, freezer):
    temp_calls, _ = await setup(hass, hass_storage, freezer)
    night = datetime(2026, 11, 4, 22, 0, tzinfo=ROME)
    freezer.move_to(night)
    async_fire_time_changed(hass, night)
    await hass.async_block_till_done()
    assert temp_calls[-1].data["temperature"] == 17.0


async def test_skips_unavailable_climate_then_applies_when_available(hass, hass_storage, freezer):
    temp_calls, _ = await setup(hass, hass_storage, freezer, state="unavailable")
    assert temp_calls == []
    hass.states.async_set(CLIMATE, "heat", ATTRS)
    await hass.async_block_till_done()
    assert temp_calls[-1].data["temperature"] == 21.0


async def test_clamps_to_min_max_temp(hass, hass_storage, freezer):
    temp_calls, _ = await setup(hass, hass_storage, freezer, data=stored(temp=35.0))
    assert temp_calls[-1].data["temperature"] == 30


async def test_ignores_unsupported_hvac_mode(hass, hass_storage, freezer):
    temp_calls, mode_calls = await setup(hass, hass_storage, freezer, data=stored(hvac_mode="cool"))
    assert mode_calls == []
    assert temp_calls[-1].data["temperature"] == 21.0


async def test_config_flow_single_instance(hass, hass_storage):
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] == "form"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] == "create_entry"
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] == "abort"
    assert result["reason"] == "single_instance_allowed"
