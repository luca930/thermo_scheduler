from datetime import datetime

from custom_components.thermo_scheduler.const import DOMAIN
from tests.test_manager import ATTRS, CLIMATE, ROME, setup

BEFORE_BLOCK = datetime(2026, 11, 4, 5, 40, tzinfo=ROME)  # la fascia delle 06:30 porta a 21 °C


async def _at(hass, freezer, when):
    freezer.move_to(when)


def _manager(hass):
    return hass.config_entries.async_entries(DOMAIN)[0].runtime_data


async def _prepare(hass, hass_storage, freezer, outdoor="5"):
    temp_calls, _ = await setup(hass, hass_storage, freezer)
    hass.states.async_set(CLIMATE, "heat", {**ATTRS, "current_temperature": 18.0})
    hass.states.async_set("sensor.esterno", outdoor)
    await _manager(hass).storage.async_save()
    _manager(hass).storage.data.outdoor_entity = "sensor.esterno"
    await _at(hass, freezer, BEFORE_BLOCK)
    return temp_calls


async def test_preheat_starts_before_the_next_block(hass, hass_storage, freezer):
    temp_calls = await _prepare(hass, hass_storage, freezer)
    manager = _manager(hass)
    manager.storage.data.preheat.add(CLIMATE)
    await manager.async_refresh(CLIMATE)
    await hass.async_block_till_done()
    assert temp_calls[-1].data["temperature"] == 21.0
    assert manager.target_for(CLIMATE).preheating is True


async def test_no_preheat_when_flag_is_off(hass, hass_storage, freezer):
    temp_calls = await _prepare(hass, hass_storage, freezer)
    manager = _manager(hass)
    before = len(temp_calls)
    await manager.async_refresh(CLIMATE)
    await hass.async_block_till_done()
    assert all(c.data["temperature"] != 21.0 for c in temp_calls[before:])
    assert manager.target_for(CLIMATE).preheating is False


async def test_no_preheat_without_outdoor_sensor(hass, hass_storage, freezer):
    temp_calls = await _prepare(hass, hass_storage, freezer)
    manager = _manager(hass)
    manager.storage.data.outdoor_entity = None
    manager.storage.data.preheat.add(CLIMATE)
    before = len(temp_calls)
    await manager.async_refresh(CLIMATE)
    await hass.async_block_till_done()
    assert all(c.data["temperature"] != 21.0 for c in temp_calls[before:])
