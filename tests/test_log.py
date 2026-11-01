from custom_components.thermo_scheduler.const import DOMAIN
from custom_components.thermo_scheduler.storage import LOG_LIMIT
from tests.test_manager import CLIMATE, setup
from tests.test_websocket import send


def _manager(hass):
    return hass.config_entries.async_entries(DOMAIN)[0].runtime_data


async def test_automatic_schedule_is_logged(hass, hass_storage, freezer):
    await setup(hass, hass_storage, freezer)
    log = _manager(hass).storage.data.log
    assert any(e["source"] == "auto" and e["climate"] == CLIMATE and e["detail"] == "21.0 °C" for e in log)


async def test_manual_websocket_write_is_logged(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    assert (await send(client, "set_preheat", climate_id=CLIMATE, enabled=True))["success"]
    entries = [e for e in _manager(hass).storage.data.log if e["action"] == "set_preheat"]
    assert entries and entries[-1]["source"] == "manual" and entries[-1]["climate"] == CLIMATE


async def test_log_can_be_read_over_websocket(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    result = await send(client, "log", limit=5)
    assert result["success"]
    assert 0 < len(result["result"]) <= 5
    assert {"ts", "source", "climate", "action", "detail"} <= set(result["result"][0])


async def test_log_keeps_only_the_latest_entries(hass, hass_storage, freezer):
    await setup(hass, hass_storage, freezer)
    manager = _manager(hass)
    for i in range(LOG_LIMIT + 20):
        manager.log("manual", CLIMATE, "test", str(i))
    assert len(manager.storage.data.log) == LOG_LIMIT
    assert manager.storage.data.log[-1]["detail"] == str(LOG_LIMIT + 19)
