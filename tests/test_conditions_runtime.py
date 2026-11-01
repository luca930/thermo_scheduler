from datetime import datetime, timedelta

from homeassistant.core import Context
from pytest_homeassistant_custom_component.common import async_fire_time_changed

from custom_components.thermo_scheduler.const import DOMAIN
from tests.test_manager import ATTRS, CLIMATE, ROME, setup, stored

WINDOW = "binary_sensor.finestra"
KITCHEN = "climate.cucina"
T0 = datetime(2026, 11, 4, 7, 0, tzinfo=ROME)
COND = {
    "id": "c1",
    "name": "Finestra",
    "checks": [{"entity_id": WINDOW, "op": "=", "value": "on"}],
    "match": "all",
    "delay": 120,
    "action": {"kind": "off", "temperature": None},
}


def with_condition(second_climate=False):
    data = stored()
    body = data["data"]
    body["conditions"]["c1"] = COND
    body["assignments"][CLIMATE]["condition_ids"] = ["c1"]
    if second_climate:
        body["assignments"][KITCHEN] = {"profile_id": "p1", "condition_ids": []}
    return data


def manager_of(hass):
    return hass.config_entries.async_entries(DOMAIN)[0].runtime_data


async def advance(hass, freezer, seconds):
    when = T0 + timedelta(seconds=seconds)
    freezer.move_to(when)
    async_fire_time_changed(hass, when)
    await hass.async_block_till_done()


async def blocked_setup(hass, hass_storage, freezer):
    """Finestra aperta e ritardo trascorso: il climate riceve `off` (eco con il nostro contesto)."""
    hass.states.async_set(WINDOW, "off")
    temp_calls, mode_calls = await setup(hass, hass_storage, freezer, data=with_condition())
    hass.states.async_set(WINDOW, "on")
    await hass.async_block_till_done()
    await advance(hass, freezer, 120)
    hass.states.async_set(CLIMATE, "off", ATTRS, context=mode_calls[-1].context)
    await hass.async_block_till_done()
    return temp_calls, mode_calls


async def test_condition_applies_after_delay(hass, hass_storage, freezer):
    hass.states.async_set(WINDOW, "off")
    _, mode_calls = await setup(hass, hass_storage, freezer, data=with_condition())
    hass.states.async_set(WINDOW, "on")
    await hass.async_block_till_done()
    assert mode_calls == []
    await advance(hass, freezer, 120)
    assert mode_calls[-1].data["hvac_mode"] == "off"


async def test_condition_cancelled_if_false_before_delay(hass, hass_storage, freezer):
    hass.states.async_set(WINDOW, "off")
    _, mode_calls = await setup(hass, hass_storage, freezer, data=with_condition())
    hass.states.async_set(WINDOW, "on")
    await hass.async_block_till_done()
    await advance(hass, freezer, 60)
    hass.states.async_set(WINDOW, "off")
    await hass.async_block_till_done()
    await advance(hass, freezer, 120)
    assert mode_calls == []


async def test_condition_end_returns_to_schedule(hass, hass_storage, freezer):
    temp_calls, mode_calls = await blocked_setup(hass, hass_storage, freezer)
    before = len(temp_calls)
    hass.states.async_set(WINDOW, "off")
    await hass.async_block_till_done()
    assert mode_calls[-1].data["hvac_mode"] == "heat"
    assert len(temp_calls) == before + 1
    assert temp_calls[-1].data["temperature"] == 21.0


async def test_activation_clears_existing_override(hass, hass_storage, freezer):
    hass.states.async_set(WINDOW, "off")
    _, mode_calls = await setup(hass, hass_storage, freezer, data=with_condition())
    hass.states.async_set(CLIMATE, "heat", {**ATTRS, "temperature": 23.0}, context=Context())
    await hass.async_block_till_done()
    assert manager_of(hass).storage.data.overrides
    hass.states.async_set(WINDOW, "on")
    await hass.async_block_till_done()
    await advance(hass, freezer, 120)
    assert manager_of(hass).storage.data.overrides == {}
    assert mode_calls[-1].data["hvac_mode"] == "off"


async def test_manual_change_during_block_wins_and_is_not_reapplied(hass, hass_storage, freezer):
    _, mode_calls = await blocked_setup(hass, hass_storage, freezer)
    calls = len(mode_calls)
    hass.states.async_set(CLIMATE, "heat", {**ATTRS, "temperature": 22.0}, context=Context())
    await hass.async_block_till_done()
    assert manager_of(hass).target_for(CLIMATE).state == "override"
    assert len(mode_calls) == calls


async def test_unavailable_entity_at_startup_does_not_block(hass, hass_storage, freezer):
    hass.states.async_set(WINDOW, "unavailable")
    _, mode_calls = await setup(hass, hass_storage, freezer, data=with_condition())
    await advance(hass, freezer, 120)
    assert mode_calls == []


async def test_restart_while_blocked_still_restores_mode(hass, hass_storage, freezer):
    _, mode_calls = await blocked_setup(hass, hass_storage, freezer)
    entry = hass.config_entries.async_entries(DOMAIN)[0]
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    await advance(hass, freezer, 240)
    hass.states.async_set(WINDOW, "off")
    await hass.async_block_till_done()
    assert mode_calls[-1].data["hvac_mode"] == "heat"


async def test_condition_scoped_to_single_climate(hass, hass_storage, freezer):
    hass.states.async_set(WINDOW, "off")
    hass.states.async_set(KITCHEN, "heat", ATTRS)
    _, mode_calls = await setup(hass, hass_storage, freezer, data=with_condition(second_climate=True))
    hass.states.async_set(WINDOW, "on")
    await hass.async_block_till_done()
    await advance(hass, freezer, 120)
    assert [c.data["entity_id"] for c in mode_calls] == [CLIMATE]
