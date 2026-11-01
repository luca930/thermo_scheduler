"""Persistenza (Store di HA) e (de)serializzazione dei dataclass del core."""
from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, time

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN
from .core.conditions import Action, Check, Condition
from .core.resolve import Override
from .core.schedule import Block, Profile

STORAGE_VERSION = 1


@dataclass
class Assignment:
    profile_id: str
    condition_ids: tuple[str, ...] = ()
    enabled: bool = True


@dataclass
class StoreData:
    profiles: dict[str, Profile] = field(default_factory=dict)
    conditions: dict[str, Condition] = field(default_factory=dict)
    assignments: dict[str, Assignment] = field(default_factory=dict)
    overrides: dict[str, Override] = field(default_factory=dict)
    saved_modes: dict[str, str] = field(default_factory=dict)


def profile_from_raw(raw: dict) -> Profile:
    blocks = tuple(
        Block(frozenset(b["days"]), time.fromisoformat(b["start"]), b["temperature"], b.get("hvac_mode"))
        for b in raw["blocks"]
    )
    return Profile(raw["id"], raw["name"], blocks)


def profile_to_raw(profile: Profile) -> dict:
    return {
        "id": profile.id,
        "name": profile.name,
        "blocks": [
            {
                "days": sorted(b.days),
                "start": b.start.strftime("%H:%M"),
                "temperature": b.temperature,
                "hvac_mode": b.hvac_mode,
            }
            for b in profile.blocks
        ],
    }


def condition_from_raw(raw: dict) -> Condition:
    checks = tuple(Check(**c) for c in raw["checks"])
    return Condition(raw["id"], raw["name"], checks, raw["match"], raw["delay"], Action(**raw["action"]))


def condition_to_raw(condition: Condition) -> dict:
    return {
        "id": condition.id,
        "name": condition.name,
        "checks": [asdict(c) for c in condition.checks],
        "match": condition.match,
        "delay": condition.delay,
        "action": asdict(condition.action),
    }


def from_raw(raw: dict) -> StoreData:
    return StoreData(
        profiles={k: profile_from_raw(v) for k, v in raw.get("profiles", {}).items()},
        conditions={k: condition_from_raw(v) for k, v in raw.get("conditions", {}).items()},
        assignments={
            k: Assignment(v["profile_id"], tuple(v.get("condition_ids", ())), v.get("enabled", True))
            for k, v in raw.get("assignments", {}).items()
        },
        overrides={
            k: Override(datetime.fromisoformat(v["until"]), v.get("temperature"), v.get("hvac_mode"))
            for k, v in raw.get("overrides", {}).items()
        },
        saved_modes=dict(raw.get("saved_modes", {})),
    )


def to_raw(data: StoreData) -> dict:
    return {
        "profiles": {k: profile_to_raw(v) for k, v in data.profiles.items()},
        "conditions": {k: condition_to_raw(v) for k, v in data.conditions.items()},
        "assignments": {
            k: {"profile_id": v.profile_id, "condition_ids": list(v.condition_ids), "enabled": v.enabled}
            for k, v in data.assignments.items()
        },
        "overrides": {
            k: {"until": v.until.isoformat(), "temperature": v.temperature, "hvac_mode": v.hvac_mode}
            for k, v in data.overrides.items()
        },
        "saved_modes": dict(data.saved_modes),
    }


class Storage:
    def __init__(self, hass: HomeAssistant) -> None:
        self._store = Store(hass, STORAGE_VERSION, DOMAIN)
        self.data = StoreData()

    async def async_load(self) -> StoreData:
        self.data = from_raw(await self._store.async_load() or {})
        return self.data

    async def async_save(self) -> None:
        await self._store.async_save(to_raw(self.data))
