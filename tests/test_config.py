from custom_components.thermo_scheduler.const import DOMAIN
from tests.test_manager import setup, stored


async def test_options_flow_saves_house_settings(hass, hass_storage, freezer):
    await setup(hass, hass_storage, freezer)
    entry = hass.config_entries.async_entries(DOMAIN)[0]
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] == "form"
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"emitter": "floor", "boiler": "heat_pump", "energy_class": "B"}
    )
    assert result["type"] == "create_entry"
    assert entry.options["emitter"] == "floor"
    assert entry.options["energy_class"] == "B"


async def test_legacy_outdoor_sensor_moves_to_options(hass, hass_storage, freezer):
    data = stored()
    data["data"]["outdoor_entity"] = "sensor.esterno"
    await setup(hass, hass_storage, freezer, data=data)
    entry = hass.config_entries.async_entries(DOMAIN)[0]
    assert entry.options["outdoor_entity"] == "sensor.esterno"
    assert hass_storage[DOMAIN]["data"].get("outdoor_entity") is None
