"""Configurazione dell'integrazione: dati della casa e sonda della temperatura esterna."""
from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import selector

from .const import DOMAIN
from .core.heating import BOILERS, EMITTERS, ENERGY_CLASSES


def house_schema(options: dict[str, Any]) -> vol.Schema:
    return vol.Schema(
        {
            vol.Required("emitter", default=options.get("emitter", "radiators")): vol.In(EMITTERS),
            vol.Required("boiler", default=options.get("boiler", "gas")): vol.In(BOILERS),
            vol.Required("energy_class", default=options.get("energy_class", "D")): vol.In(ENERGY_CLASSES),
            vol.Optional("outdoor_entity"): selector.EntitySelector(selector.EntitySelectorConfig(domain="sensor")),
        }
    )


class ThermoSchedulerConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(title="Thermo Scheduler", data={})
        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: config_entries.ConfigEntry):
        return ThermoSchedulerOptionsFlow()


class ThermoSchedulerOptionsFlow(config_entries.OptionsFlow):
    async def async_step_init(self, user_input=None):
        if user_input is not None:
            # la sonda opzionale: se tolta dal form non deve restare nelle opzioni
            options = {k: v for k, v in user_input.items() if v is not None}
            return self.async_create_entry(title="", data=options)
        options = dict(self.config_entry.options)
        return self.async_show_form(step_id="init", data_schema=house_schema(options))
