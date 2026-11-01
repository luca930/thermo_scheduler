from datetime import datetime, time
from zoneinfo import ZoneInfo

from custom_components.thermo_scheduler.core.conditions import Action, Condition
from custom_components.thermo_scheduler.core.resolve import Override, resolve
from custom_components.thermo_scheduler.core.schedule import Block, Profile

ROME = ZoneInfo("Europe/Rome")
WEEKDAYS = frozenset({0, 1, 2, 3, 4})
WEEKEND = frozenset({5, 6})

PROFILE = Profile(
    id="p1",
    name="Casa",
    blocks=(
        Block(WEEKDAYS, time(6, 30), 21.0),
        Block(WEEKDAYS, time(22, 0), 17.0),
        Block(WEEKEND, time(8, 0), 20.0),
        Block(WEEKEND, time(23, 0), 17.0),
    ),
)
NOW = datetime(2026, 11, 4, 7, 0, tzinfo=ROME)
NIGHT = datetime(2026, 11, 4, 22, 0, tzinfo=ROME)


def blocking(action):
    return Condition("c1", "Finestra", (), "all", 0, action)


def test_scheduled():
    target = resolve(PROFILE, NOW, None, None)
    assert (target.state, target.temperature, target.until) == ("scheduled", 21.0, NIGHT)


def test_valid_override_wins():
    override = Override(until=NIGHT, temperature=23.0, hvac_mode=None)
    target = resolve(PROFILE, NOW, override, blocking(Action("off")))
    assert (target.state, target.temperature, target.until) == ("override", 23.0, NIGHT)


def test_expired_override_ignored():
    override = Override(until=datetime(2026, 11, 4, 6, 59, tzinfo=ROME), temperature=23.0, hvac_mode=None)
    assert resolve(PROFILE, NOW, override, None).state == "scheduled"


def test_condition_off():
    target = resolve(PROFILE, NOW, None, blocking(Action("off")))
    assert (target.state, target.hvac_mode, target.temperature) == ("blocked", "off", None)


def test_condition_min_setpoint():
    target = resolve(PROFILE, NOW, None, blocking(Action("min_setpoint", 12.0)))
    assert (target.state, target.temperature) == ("blocked", 12.0)


def test_no_blocks_returns_none():
    assert resolve(Profile("e", "Vuota", ()), NOW, None, None) is None
