import voluptuous as vol
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN
from .manager import Manager
from .storage import Storage
from .websocket_api import async_register_commands

PLATFORMS = ["sensor"]
ENTITY = {vol.Required("entity_id"): cv.entity_ids}
SERVICES = {
    "set_profile": vol.Schema({**ENTITY, vol.Required("profile_id"): cv.string}),
    "clear_override": vol.Schema(ENTITY),
    "enable": vol.Schema(ENTITY),
    "disable": vol.Schema(ENTITY),
}


def _register_services(hass: HomeAssistant) -> None:
    async def handle(call: ServiceCall) -> None:
        manager = hass.config_entries.async_entries(DOMAIN)[0].runtime_data
        try:
            for climate_id in call.data["entity_id"]:
                if call.service == "set_profile":
                    await manager.async_set_profile(climate_id, call.data["profile_id"])
                elif call.service == "clear_override":
                    await manager.async_clear_override(climate_id)
                else:
                    await manager.async_set_enabled(climate_id, call.service == "enable")
        except ValueError as err:
            raise ServiceValidationError(str(err)) from err

    for name, schema in SERVICES.items():
        hass.services.async_register(DOMAIN, name, handle, schema)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    storage = Storage(hass)
    await storage.async_load()
    manager = Manager(hass, storage)
    entry.runtime_data = manager
    await manager.async_start()
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    _register_services(hass)
    async_register_commands(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    await entry.runtime_data.async_stop()
    for name in SERVICES:
        hass.services.async_remove(DOMAIN, name)
    return unloaded
