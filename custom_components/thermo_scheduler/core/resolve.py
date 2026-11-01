"""Precedenza: override valido > condizione attiva > programmazione."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Literal

from .conditions import Condition
from .schedule import Profile, current_block, next_change


@dataclass(frozen=True)
class Override:
    until: datetime
    temperature: float | None
    hvac_mode: str | None


@dataclass(frozen=True)
class Target:
    state: Literal["scheduled", "override", "blocked"]
    temperature: float | None
    hvac_mode: str | None
    until: datetime | None
    preheating: bool = False  # già anticipata la fascia successiva


def resolve(
    profile: Profile, now: datetime, override: Override | None, active: Condition | None
) -> Target | None:
    if override is not None and override.until > now:
        return Target("override", override.temperature, override.hvac_mode, override.until)
    if active is not None:
        action = active.action
        if action.kind == "off":
            return Target("blocked", None, "off", None)
        return Target("blocked", action.temperature, None, None)
    found = current_block(profile, now)
    if found is None:
        return None
    block, _ = found
    return Target("scheduled", block.temperature, block.hvac_mode, next_change(profile, now))
