from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .manager import Manager
from .storage import Storage


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    storage = Storage(hass)
    await storage.async_load()
    manager = Manager(hass, storage)
    entry.runtime_data = manager
    await manager.async_start()
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    await entry.runtime_data.async_stop()
    return True
