"""Voci del registro di Home Assistant per le azioni di Thermo Scheduler."""
from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.logbook import (
    LOGBOOK_ENTRY_ENTITY_ID,
    LOGBOOK_ENTRY_MESSAGE,
    LOGBOOK_ENTRY_NAME,
    LazyEventPartialState,
)
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN


@callback
def async_describe_events(
    hass: HomeAssistant,
    async_describe_event: Callable[[str, str, Callable[[LazyEventPartialState], dict[str, Any]]], None],
) -> None:
    """Descrive gli eventi di log emessi dal manager."""

    @callback
    def describe(event: LazyEventPartialState) -> dict[str, Any]:
        data = event.data
        return {
            LOGBOOK_ENTRY_NAME: data.get("name"),
            LOGBOOK_ENTRY_MESSAGE: data.get("message"),
            LOGBOOK_ENTRY_ENTITY_ID: data.get("entity_id"),
        }

    async_describe_event(DOMAIN, f"{DOMAIN}_log", describe)
