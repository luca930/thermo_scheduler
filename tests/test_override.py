from datetime import datetime

from homeassistant.core import Context
from pytest_homeassistant_custom_component.common import async_fire_time_changed

from custom_components.thermo_scheduler.const import DOMAIN
from custom_components.thermo_scheduler.core.schedule import Block, Profile
from tests.test_manager import ATTRS, CLIMATE, ROME, setup

NIGHT = datetime(2026, 11, 4, 22, 0, tzinfo=ROME)


def manager_of(hass):
    return hass.config_entries.async_entries(DOMAIN)[0].runtime_data


def manual(hass, temperature):
    hass.states.async_set(CLIMATE, "heat", {**ATTRS, "temperature": temperature}, context=Context())


async def test_manual_change_creates_override_until_next_block(hass, hass_storage, freezer):
    temp_calls, _ = await setup(hass, hass_storage, freezer)
    manual(hass, 23.0)
    await hass.async_block_till_done()
    override = manager_of(hass).storage.data.overrides[CLIMATE]
    assert (override.temperature, override.until) == (23.0, NIGHT)
    assert len(temp_calls) == 1


async def test_own_command_is_not_override(hass, hass_storage, freezer):
    temp_calls, _ = await setup(hass, hass_storage, freezer)
    hass.states.async_set(CLIMATE, "heat", {**ATTRS, "temperature": 20.5}, context=temp_calls[0].context)
    await hass.async_block_till_done()
    assert manager_of(hass).storage.data.overrides == {}


async def test_state_change_without_target_diff_is_not_override(hass, hass_storage, freezer):
    await setup(hass, hass_storage, freezer)
    manual(hass, 21.0)
    await hass.async_block_till_done()
    assert manager_of(hass).storage.data.overrides == {}


async def test_override_expires_at_next_block_and_reapplies_schedule(hass, hass_storage, freezer):
    temp_calls, _ = await setup(hass, hass_storage, freezer)
    manual(hass, 23.0)
    await hass.async_block_till_done()
    freezer.move_to(NIGHT)
    async_fire_time_changed(hass, NIGHT)
    await hass.async_block_till_done()
    assert temp_calls[-1].data["temperature"] == 17.0
    assert manager_of(hass).storage.data.overrides == {}


async def test_override_survives_restart(hass, hass_storage, freezer):
    await setup(hass, hass_storage, freezer)
    manual(hass, 23.0)
    await hass.async_block_till_done()
    entry = hass.config_entries.async_entries(DOMAIN)[0]
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert manager_of(hass).target_for(CLIMATE).state == "override"


async def test_profile_edit_keeps_valid_override(hass, hass_storage, freezer):
    await setup(hass, hass_storage, freezer)
    manual(hass, 23.0)
    await hass.async_block_till_done()
    manager = manager_of(hass)
    manager.storage.data.profiles["p1"] = Profile("p1", "Casa", ())
    await manager.async_refresh()
    assert manager.target_for(CLIMATE).state == "override"


async def test_clear_override_reapplies_schedule(hass, hass_storage, freezer):
    temp_calls, _ = await setup(hass, hass_storage, freezer)
    manual(hass, 23.0)
    await hass.async_block_till_done()
    await manager_of(hass).async_clear_override(CLIMATE)
    assert temp_calls[-1].data["temperature"] == 21.0
