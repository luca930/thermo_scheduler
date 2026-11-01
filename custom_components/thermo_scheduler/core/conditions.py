"""Valutazione delle condizioni di blocco (nessuna dipendenza da HA)."""
from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass
from typing import Literal

UNKNOWN_STATES = ("unavailable", "unknown")


@dataclass(frozen=True)
class Check:
    entity_id: str
    op: Literal["=", "!=", ">", "<"]
    value: str


@dataclass(frozen=True)
class Action:
    kind: Literal["off", "min_setpoint"]
    temperature: float | None = None


@dataclass(frozen=True)
class Condition:
    id: str
    name: str
    checks: tuple[Check, ...]
    match: Literal["all", "any"]
    delay: int
    action: Action


def _check(check: Check, states: Mapping[str, str]) -> bool:
    state = states.get(check.entity_id)
    if state is None or state in UNKNOWN_STATES:
        return False
    if check.op == "=":
        return state == check.value
    if check.op == "!=":
        return state != check.value
    try:
        left, right = float(state), float(check.value)
    except ValueError:
        return False
    return left > right if check.op == ">" else left < right


def evaluate(condition: Condition, states: Mapping[str, str]) -> bool:
    if not condition.checks:
        return False
    results = (_check(check, states) for check in condition.checks)
    return all(results) if condition.match == "all" else any(results)
