"""API websocket usata dalla card Lovelace."""
from __future__ import annotations

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN
from .core.heating import Room
from .storage import (
    Assignment,
    condition_from_raw,
    profile_from_raw,
    to_raw,
)

BLOCK = vol.Schema(
    {
        vol.Required("days"): [vol.All(int, vol.Range(min=0, max=6))],
        vol.Required("start"): vol.Match(r"^([01]\d|2[0-3]):[0-5]\d$"),
        vol.Required("temperature"): vol.Coerce(float),
        vol.Optional("hvac_mode"): vol.Any(None, str),
    }
)
PROFILE = vol.Schema(
    {vol.Required("id"): str, vol.Required("name"): str, vol.Required("blocks"): [BLOCK]}
)
CHECK = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
        vol.Required("op"): vol.In(["=", "!=", ">", "<"]),
        vol.Required("value"): str,
    }
)
ACTION = vol.Schema(
    {
        vol.Required("kind"): vol.In(["off", "min_setpoint"]),
        vol.Optional("temperature"): vol.Any(None, vol.Coerce(float)),
    }
)
CONDITION = vol.Schema(
    {
        vol.Required("id"): str,
        vol.Required("name"): str,
        vol.Required("checks"): [CHECK],
        vol.Required("match"): vol.In(["all", "any"]),
        vol.Required("delay"): vol.All(int, vol.Range(min=0)),
        vol.Required("action"): ACTION,
    }
)


ROOM = vol.Schema({vol.Required("area_m2"): vol.Coerce(float), vol.Required("height_m"): vol.Coerce(float)})


def _manager(hass: HomeAssistant):
    return hass.config_entries.async_entries(DOMAIN)[0].runtime_data


def _command(name: str, schema: dict | None = None):
    def wrap(func):
        func = websocket_api.async_response(func)
        func = websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/{name}", **(schema or {})})(func)
        return websocket_api.require_admin(func)

    return wrap


@_command("list")
async def ws_list(hass, connection, msg):
    connection.send_result(msg["id"], to_raw(_manager(hass).storage.data))


@_command("save_profile", {vol.Required("profile"): PROFILE})
async def ws_save_profile(hass, connection, msg):
    manager = _manager(hass)
    profile = profile_from_raw(msg["profile"])
    manager.storage.data.profiles[profile.id] = profile
    await manager.storage.async_save()
    await manager.async_refresh()
    connection.send_result(msg["id"])


@_command("delete_profile", {vol.Required("profile_id"): str})
async def ws_delete_profile(hass, connection, msg):
    manager = _manager(hass)
    data = manager.storage.data
    if any(a.profile_id == msg["profile_id"] for a in data.assignments.values()):
        connection.send_error(msg["id"], "in_use", "Programmazione ancora assegnata")
        return
    data.profiles.pop(msg["profile_id"], None)
    await manager.storage.async_save()
    connection.send_result(msg["id"])


@_command("save_condition", {vol.Required("condition"): CONDITION})
async def ws_save_condition(hass, connection, msg):
    manager = _manager(hass)
    condition = condition_from_raw(msg["condition"])
    manager.storage.data.conditions[condition.id] = condition
    await manager.storage.async_save()
    await manager.async_refresh()
    connection.send_result(msg["id"])


@_command("delete_condition", {vol.Required("condition_id"): str})
async def ws_delete_condition(hass, connection, msg):
    manager = _manager(hass)
    data = manager.storage.data
    if any(msg["condition_id"] in a.condition_ids for a in data.assignments.values()):
        connection.send_error(msg["id"], "in_use", "Condizione ancora assegnata")
        return
    data.conditions.pop(msg["condition_id"], None)
    await manager.storage.async_save()
    connection.send_result(msg["id"])


@_command(
    "assign",
    {
        vol.Required("climate_id"): cv.entity_id,
        vol.Required("profile_id"): str,
        vol.Optional("condition_ids"): [str],
        vol.Optional("enabled"): bool,
    },
)
async def ws_assign(hass, connection, msg):
    manager = _manager(hass)
    data = manager.storage.data
    climate_id = msg["climate_id"]
    condition_ids = msg.get("condition_ids")
    if not climate_id.startswith("climate.") or hass.states.get(climate_id) is None:
        connection.send_error(msg["id"], "not_found", f"Climate sconosciuto: {climate_id}")
        return
    if msg["profile_id"] not in data.profiles or any(c not in data.conditions for c in condition_ids or ()):
        connection.send_error(msg["id"], "not_found", "Programmazione o condizione sconosciuta")
        return
    current = data.assignments.get(climate_id)
    data.assignments[climate_id] = Assignment(
        msg["profile_id"],
        tuple(condition_ids) if condition_ids is not None else (current.condition_ids if current else ()),
        msg.get("enabled", current.enabled if current else True),
    )
    await manager.storage.async_save()
    await manager.async_refresh()
    connection.send_result(msg["id"])


@_command("unassign", {vol.Required("climate_id"): cv.entity_id})
async def ws_unassign(hass, connection, msg):
    await _manager(hass).async_unassign(msg["climate_id"])
    connection.send_result(msg["id"])


@_command("clear_override", {vol.Required("climate_id"): cv.entity_id})
async def ws_clear_override(hass, connection, msg):
    await _manager(hass).async_clear_override(msg["climate_id"])
    connection.send_result(msg["id"])


@_command("set_room", {vol.Required("climate_id"): cv.entity_id, vol.Required("room"): ROOM})
async def ws_set_room(hass, connection, msg):
    manager = _manager(hass)
    try:
        room = Room(**msg["room"])
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_room", str(err))
        return
    manager.storage.data.rooms[msg["climate_id"]] = room
    await manager.storage.async_save()
    await manager.async_refresh(msg["climate_id"])
    connection.send_result(msg["id"])


@_command("set_preheat", {vol.Required("climate_id"): cv.entity_id, vol.Required("enabled"): bool})
async def ws_set_preheat(hass, connection, msg):
    manager = _manager(hass)
    preheat = manager.storage.data.preheat
    (preheat.add if msg["enabled"] else preheat.discard)(msg["climate_id"])
    await manager.storage.async_save()
    await manager.async_refresh(msg["climate_id"])
    connection.send_result(msg["id"])


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/estimate", vol.Required("climate_id"): cv.entity_id, vol.Required("target"): vol.Coerce(float)}
)
@websocket_api.async_response
async def ws_estimate(hass, connection, msg):
    # lettura: non richiede amministratore, così la card funziona per tutti gli utenti
    connection.send_result(msg["id"], _manager(hass).estimate(msg["climate_id"], msg["target"]))


def async_register_commands(hass: HomeAssistant) -> None:
    for handler in (
        ws_list,
        ws_save_profile,
        ws_delete_profile,
        ws_save_condition,
        ws_delete_condition,
        ws_assign,
        ws_unassign,
        ws_clear_override,
        ws_set_room,
        ws_estimate,
        ws_set_preheat,
    ):
        websocket_api.async_register_command(hass, handler)
