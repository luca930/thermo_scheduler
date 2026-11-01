from datetime import datetime, time
from zoneinfo import ZoneInfo

import pytest

from custom_components.thermo_scheduler.core.heating import (
    Episode,
    House,
    Room,
    calibration,
    minutes_to_target,
    rate_prior,
)
from custom_components.thermo_scheduler.core.schedule import Block, Profile, next_block


def test_floor_is_slower_than_radiators():
    radiators = rate_prior(House("radiators", "gas"), Room(), 18, 5)
    floor = rate_prior(House("floor", "gas"), Room(), 18, 5)
    assert floor < radiators


def test_bigger_room_heats_slower():
    small = rate_prior(House(), Room(area_m2=15), 18, 5)
    big = rate_prior(House(), Room(area_m2=60), 18, 5)
    assert big < small


def test_worse_energy_class_loses_more_heat():
    good = rate_prior(House(energy_class="A"), Room(), 20, 0)
    bad = rate_prior(House(energy_class="G"), Room(), 20, 0)
    assert bad < good


def test_colder_outside_means_slower_heating():
    assert rate_prior(House(), Room(), 18, 15) > rate_prior(House(), Room(), 18, -5)


def test_no_time_needed_if_already_at_target():
    assert minutes_to_target(House(), Room(), 21, 20, 5) == 0.0


def test_more_degrees_take_longer():
    short = minutes_to_target(House(), Room(), 18, 19, 5)
    long = minutes_to_target(House(), Room(), 18, 21, 5)
    assert short is not None and long is not None and long > short


def test_unreachable_target_returns_none():
    house = House(emitter="floor", boiler="heat_pump", energy_class="G")
    assert minutes_to_target(house, Room(area_m2=200), 15, 25, -10) is None


def test_calibration_without_history_is_neutral():
    assert calibration(House(), Room(), []) == (1.0, 0)


def test_calibration_follows_observed_speed():
    house, room = House(), Room()
    predicted = rate_prior(house, room, 19, 5)
    # ciclo reale due volte più veloce del previsto
    minutes = 60 * 1.0 / (2 * predicted)
    episodes = [Episode(18.0, 19.0, 5.0, minutes)] * 5
    factor, used = calibration(house, room, episodes)
    assert used == 5
    assert factor == pytest.approx(2.0, rel=0.05)


def test_short_episodes_are_ignored():
    factor, used = calibration(House(), Room(), [Episode(18.0, 18.2, 5.0, 1.0)])
    assert (factor, used) == (1.0, 0)


def test_invalid_house_and_room_are_rejected():
    with pytest.raises(ValueError):
        House(emitter="stufa")
    with pytest.raises(ValueError):
        Room(area_m2=1)


def test_next_block_is_the_first_future_block():
    rome = ZoneInfo("Europe/Rome")
    profile = Profile("p", "Casa", (Block(frozenset({0}), time(6, 30), 21.0), Block(frozenset({0}), time(22, 0), 17.0)))
    start, block = next_block(profile, datetime(2026, 11, 2, 5, 0, tzinfo=rome))  # lunedì 2 novembre
    assert (start.hour, start.minute, block.temperature) == (6, 30, 21.0)
