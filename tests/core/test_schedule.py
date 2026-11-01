from datetime import datetime, time
from zoneinfo import ZoneInfo

from custom_components.thermo_scheduler.core.schedule import (
    Block,
    Profile,
    current_block,
    next_change,
)

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


def at(y, m, d, hh, mm):
    return datetime(y, m, d, hh, mm, tzinfo=ROME)


def test_current_block_weekday():
    now = at(2026, 11, 4, 7, 0)
    block, start = current_block(PROFILE, now)
    assert block.temperature == 21.0
    assert start == at(2026, 11, 4, 6, 30)
    assert next_change(PROFILE, now) == at(2026, 11, 4, 22, 0)


def test_last_block_wraps_to_next_day():
    now = at(2026, 11, 4, 23, 0)
    block, _ = current_block(PROFILE, now)
    assert block.temperature == 17.0
    assert next_change(PROFILE, now) == at(2026, 11, 5, 6, 30)


def test_before_first_block_uses_previous_day():
    now = at(2026, 11, 2, 5, 0)
    block, start = current_block(PROFILE, now)
    assert block.temperature == 17.0
    assert start == at(2026, 11, 1, 23, 0)


def test_empty_profile():
    empty = Profile(id="e", name="Vuota", blocks=())
    now = at(2026, 11, 4, 7, 0)
    assert current_block(empty, now) is None
    assert next_change(empty, now) is None


def test_dst_no_exception():
    profile = Profile(id="d", name="DST", blocks=(Block(frozenset({6}), time(2, 30), 19.0),))
    now = at(2027, 3, 27, 12, 0)
    nxt = next_change(profile, now)
    assert nxt.tzinfo is not None
    assert nxt > now
