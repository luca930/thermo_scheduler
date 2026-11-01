import pytest

from custom_components.thermo_scheduler.core.heating import (
    Episode,
    Room,
    calibration,
    minutes_to_target,
    rate_prior,
)


def test_floor_is_slower_than_radiators():
    radiators = rate_prior(Room("radiators", "gas"), 18, 5)
    floor = rate_prior(Room("floor", "gas"), 18, 5)
    assert floor < radiators


def test_bigger_room_heats_slower():
    small = rate_prior(Room(area_m2=15), 18, 5)
    big = rate_prior(Room(area_m2=60), 18, 5)
    assert big < small


def test_worse_energy_class_loses_more_heat():
    good = rate_prior(Room(energy_class="A"), 20, 0)
    bad = rate_prior(Room(energy_class="G"), 20, 0)
    assert bad < good


def test_colder_outside_means_slower_heating():
    room = Room()
    assert rate_prior(room, 18, 15) > rate_prior(room, 18, -5)


def test_no_time_needed_if_already_at_target():
    assert minutes_to_target(Room(), 21, 20, 5) == 0.0


def test_more_degrees_take_longer():
    room = Room()
    short = minutes_to_target(room, 18, 19, 5)
    long = minutes_to_target(room, 18, 21, 5)
    assert short is not None and long is not None and long > short


def test_unreachable_target_returns_none():
    room = Room(emitter="floor", boiler="heat_pump", energy_class="G", area_m2=200)
    assert minutes_to_target(room, 15, 25, -10) is None


def test_calibration_without_history_is_neutral():
    assert calibration(Room(), []) == (1.0, 0)


def test_calibration_follows_observed_speed():
    room = Room()
    predicted = rate_prior(room, 19, 5)
    # ciclo reale due volte più veloce del previsto
    minutes = 60 * 1.0 / (2 * predicted)
    episodes = [Episode(18.0, 19.0, 5.0, minutes)] * 5
    factor, used = calibration(room, episodes)
    assert used == 5
    assert factor == pytest.approx(2.0, rel=0.05)


def test_short_episodes_are_ignored():
    factor, used = calibration(Room(), [Episode(18.0, 18.2, 5.0, 1.0)])
    assert (factor, used) == (1.0, 0)


def test_invalid_room_is_rejected():
    with pytest.raises(ValueError):
        Room(emitter="stufa")
    with pytest.raises(ValueError):
        Room(area_m2=1)
