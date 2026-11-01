import json
from pathlib import Path

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


CARD_URL = f"/{DOMAIN}/thermo-scheduler-card.js"
# la versione nell'URL fa ricaricare la card dopo ogni aggiornamento, senza cache vecchie
CARD_VERSION = json.loads((Path(__file__).parent / "manifest.json").read_text(encoding="utf-8"))["version"]
CARD_JS_URL = f"{CARD_URL}?v={CARD_VERSION}"


async def _register_card(hass: HomeAssistant) -> None:
    """Serve il bundle della card e lo carica nel frontend (una sola volta per avvio)."""
    if hass.data.get(f"{DOMAIN}_card") or getattr(hass, "http", None) is None:
        return
    if "frontend" not in hass.config.components:
        return
    from homeassistant.components.frontend import add_extra_js_url
    from homeassistant.components.http import StaticPathConfig

    hass.data[f"{DOMAIN}_card"] = True
    path = Path(__file__).parent / "www" / "thermo-scheduler-card.js"
    await hass.http.async_register_static_paths([StaticPathConfig(CARD_URL, str(path), False)])
    add_extra_js_url(hass, CARD_JS_URL)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    storage = Storage(hass)
    await storage.async_load()
    manager = Manager(hass, storage)
    entry.runtime_data = manager
    await manager.async_start()
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    _register_services(hass)
    async_register_commands(hass)
    await _register_card(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    await entry.runtime_data.async_stop()
    for name in SERVICES:
        hass.services.async_remove(DOMAIN, name)
    return unloaded
