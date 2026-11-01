from custom_components.thermo_scheduler.const import DOMAIN
from tests.test_manager import ATTRS, CLIMATE, setup

KITCHEN = "climate.cucina"
PROFILE = {
    "id": "p3",
    "name": "Weekend",
    "blocks": [{"days": [5, 6], "start": "08:00", "temperature": 20.0, "hvac_mode": None}],
}
CONDITION = {
    "id": "c9",
    "name": "Finestra",
    "checks": [{"entity_id": "binary_sensor.finestra", "op": "=", "value": "on"}],
    "match": "all",
    "delay": 120,
    "action": {"kind": "off", "temperature": None},
}


async def send(client, type_, **data):
    await client.send_json_auto_id({"type": f"{DOMAIN}/{type_}", **data})
    return await client.receive_json()


async def test_profile_roundtrip(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    assert (await send(client, "save_profile", profile=PROFILE))["success"]
    listing = (await send(client, "list"))["result"]
    assert listing["profiles"]["p3"]["blocks"][0]["start"] == "08:00"


async def test_condition_roundtrip(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    assert (await send(client, "save_condition", condition=CONDITION))["success"]
    listing = (await send(client, "list"))["result"]
    assert listing["conditions"]["c9"]["delay"] == 120
    assert (await send(client, "delete_condition", condition_id="c9"))["success"]


async def test_save_profile_invalid(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    bad = {**PROFILE, "blocks": [{**PROFILE["blocks"][0], "days": [9]}]}
    reply = await send(client, "save_profile", profile=bad)
    assert not reply["success"]
    assert reply["error"]["code"] == "invalid_format"


async def test_assign_rejects_unknown_climate(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    reply = await send(client, "assign", climate_id="climate.nope", profile_id="p1")
    assert not reply["success"]
    assert reply["error"]["code"] == "not_found"


async def test_delete_profile_in_use(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    reply = await send(client, "delete_profile", profile_id="p1")
    assert not reply["success"]
    assert reply["error"]["code"] == "in_use"
    assert "p1" in (await send(client, "list"))["result"]["profiles"]


async def test_assign_and_unassign(hass, hass_storage, freezer, hass_ws_client):
    hass.states.async_set(KITCHEN, "heat", ATTRS)
    client = await hass_ws_client(hass)
    temp_calls, _ = await setup(hass, hass_storage, freezer)
    assert (await send(client, "assign", climate_id=KITCHEN, profile_id="p1"))["success"]
    assert temp_calls[-1].data["entity_id"] == KITCHEN
    assert KITCHEN in (await send(client, "list"))["result"]["assignments"]
    assert (await send(client, "unassign", climate_id=KITCHEN))["success"]
    assert KITCHEN not in (await send(client, "list"))["result"]["assignments"]
    assert CLIMATE in (await send(client, "list"))["result"]["assignments"]


async def test_room_roundtrip_and_invalid_room(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    room = {"emitter": "floor", "boiler": "heat_pump", "energy_class": "B", "area_m2": 30, "height_m": 2.7}
    assert (await send(client, "set_room", climate_id=CLIMATE, room=room))["success"]
    listing = (await send(client, "list"))["result"]
    assert listing["rooms"][CLIMATE]["emitter"] == "floor"
    bad = await send(client, "set_room", climate_id=CLIMATE, room={**room, "emitter": "stufa"})
    assert not bad["success"]


async def test_estimate_reports_missing_outdoor_sensor(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    hass.states.async_set(CLIMATE, "heat", {**ATTRS, "current_temperature": 18.0})
    result = (await send(client, "estimate", climate_id=CLIMATE, target=21.0))
    assert result["success"]
    assert result["result"]["minutes"] is None
    assert result["result"]["reason"] == "outdoor"
    assert result["result"]["configured"] is False


async def test_set_outdoor_then_estimate_gives_minutes(hass, hass_storage, freezer, hass_ws_client):
    client = await hass_ws_client(hass)
    await setup(hass, hass_storage, freezer)
    hass.states.async_set(CLIMATE, "heat", {**ATTRS, "current_temperature": 18.0})
    hass.states.async_set("sensor.esterno", "5")
    assert (await send(client, "set_outdoor", entity_id="sensor.esterno"))["success"]
    result = (await send(client, "estimate", climate_id=CLIMATE, target=21.0))["result"]
    assert result["outdoor"] == 5.0
    assert result["minutes"] is not None and result["minutes"] > 0
