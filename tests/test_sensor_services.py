from datetime import datetime

from homeassistant.core import Context
from pytest_homeassistant_custom_component.common import async_fire_time_changed

from custom_components.thermo_scheduler.const import DOMAIN
from tests.test_conditions_runtime import blocked_setup
from tests.test_manager import ATTRS, CLIMATE, ROME, setup, stored

SENSOR = "sensor.salotto_scheduler"
NIGHT = datetime(2026, 11, 4, 22, 0, tzinfo=ROME)


async def call(hass, service, **data):
    await hass.services.async_call(DOMAIN, service, {"entity_id": CLIMATE, **data}, blocking=True)
    await hass.async_block_till_done()


async def test_sensor_scheduled_and_override(hass, hass_storage, freezer):
    await setup(hass, hass_storage, freezer)
    state = hass.states.get(SENSOR)
    assert state.state == "scheduled"
    assert state.attributes["profile"] == "Casa"
    assert state.attributes["setpoint"] == 21.0
    assert state.attributes["next_change"] == NIGHT.isoformat()
    hass.states.async_set(CLIMATE, "heat", {**ATTRS, "temperature": 23.0}, context=Context())
    await hass.async_block_till_done()
    state = hass.states.get(SENSOR)
    assert state.state == "override"
    assert state.attributes["override_until"] == NIGHT.isoformat()


async def test_sensor_blocked(hass, hass_storage, freezer):
    await blocked_setup(hass, hass_storage, freezer)
    state = hass.states.get(SENSOR)
    assert state.state == "blocked"
    assert state.attributes["condition"] == "Finestra"


async def test_disable_enable(hass, hass_storage, freezer):
    temp_calls, _ = await setup(hass, hass_storage, freezer)
    await call(hass, "disable")
    assert hass.states.get(SENSOR).state == "disabled"
    freezer.move_to(NIGHT)
    async_fire_time_changed(hass, NIGHT)
    await hass.async_block_till_done()
    assert [c.data["temperature"] for c in temp_calls] == [21.0]
    await call(hass, "enable")
    assert temp_calls[-1].data["temperature"] == 17.0
    assert hass.states.get(SENSOR).state == "scheduled"


async def test_set_profile(hass, hass_storage, freezer):
    data = stored()
    data["data"]["profiles"]["p2"] = {
        "id": "p2",
        "name": "Caldo",
        "blocks": [{"days": [0, 1, 2, 3, 4, 5, 6], "start": "00:00", "temperature": 25.0, "hvac_mode": None}],
    }
    temp_calls, _ = await setup(hass, hass_storage, freezer, data=data)
    await call(hass, "set_profile", profile_id="p2")
    assert temp_calls[-1].data["temperature"] == 25.0
    assert hass.states.get(SENSOR).attributes["profile"] == "Caldo"


async def test_clear_override_service(hass, hass_storage, freezer):
    temp_calls, _ = await setup(hass, hass_storage, freezer)
    hass.states.async_set(CLIMATE, "heat", {**ATTRS, "temperature": 23.0}, context=Context())
    await hass.async_block_till_done()
    await call(hass, "clear_override")
    assert temp_calls[-1].data["temperature"] == 21.0
    assert hass.states.get(SENSOR).state == "scheduled"
