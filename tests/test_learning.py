import pytest

from datetime import datetime, timedelta, timezone

from custom_components.thermo_scheduler import learning
from custom_components.thermo_scheduler.learning import HeatingLearner

T0 = datetime(2026, 11, 1, 6, 0, tzinfo=timezone.utc)


def _clock(monkeypatch, now):
    monkeypatch.setattr(learning.dt_util, "utcnow", lambda: now)


def test_completed_cycle_is_recorded(monkeypatch):
    learner = HeatingLearner()
    _clock(monkeypatch, T0)
    assert learner.observe("climate.a", "heat", 18.0, 21.0, 5.0) is None
    _clock(monkeypatch, T0 + timedelta(minutes=40))
    assert learner.observe("climate.a", "heat", 19.5, 21.0, 6.0) is None
    _clock(monkeypatch, T0 + timedelta(minutes=60))
    episode = learner.observe("climate.a", "heat", 20.9, 21.0, 6.0)
    assert episode is not None
    assert (episode.start_in, episode.end_in, episode.minutes) == (18.0, 20.9, 60.0)
    assert episode.outdoor == pytest.approx(5.67, abs=0.01)  # media di 5, 6 e 6


def test_target_change_discards_cycle(monkeypatch):
    learner = HeatingLearner()
    _clock(monkeypatch, T0)
    learner.observe("climate.a", "heat", 18.0, 21.0, 5.0)
    _clock(monkeypatch, T0 + timedelta(minutes=30))
    assert learner.observe("climate.a", "heat", 19.0, 23.0, 5.0) is None
    _clock(monkeypatch, T0 + timedelta(minutes=60))
    assert learner.observe("climate.a", "heat", 23.0, 23.0, 5.0) is None


def test_turning_off_discards_cycle(monkeypatch):
    learner = HeatingLearner()
    _clock(monkeypatch, T0)
    learner.observe("climate.a", "heat", 18.0, 21.0, 5.0)
    _clock(monkeypatch, T0 + timedelta(minutes=30))
    assert learner.observe("climate.a", "off", 19.0, 21.0, 5.0) is None


def test_short_cycle_is_ignored(monkeypatch):
    learner = HeatingLearner()
    _clock(monkeypatch, T0)
    learner.observe("climate.a", "heat", 20.0, 21.0, 5.0)
    _clock(monkeypatch, T0 + timedelta(minutes=1))
    assert learner.observe("climate.a", "heat", 21.0, 21.0, 5.0) is None


def test_missing_outdoor_temperature_aborts(monkeypatch):
    learner = HeatingLearner()
    _clock(monkeypatch, T0)
    learner.observe("climate.a", "heat", 18.0, 21.0, 5.0)
    assert learner.observe("climate.a", "heat", 19.0, 21.0, None) is None
