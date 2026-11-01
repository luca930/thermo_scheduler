from custom_components.thermo_scheduler.core.conditions import (
    Action,
    Check,
    Condition,
    evaluate,
)

WINDOW = "binary_sensor.finestra"


def cond(checks, match="all"):
    return Condition("c1", "Finestra", tuple(checks), match, 120, Action("off"))


def test_equal_on():
    assert evaluate(cond([Check(WINDOW, "=", "on")]), {WINDOW: "on"})


def test_unavailable_is_false():
    for state in ("unavailable", "unknown"):
        assert not evaluate(cond([Check(WINDOW, "=", "on")]), {WINDOW: state})
        assert not evaluate(cond([Check(WINDOW, "!=", "on")]), {WINDOW: state})


def test_numeric_greater():
    check = Check("sensor.t", ">", "25")
    assert evaluate(cond([check]), {"sensor.t": "26.5"})
    assert not evaluate(cond([check]), {"sensor.t": "abc"})


def test_match_all_vs_any():
    checks = [Check(WINDOW, "=", "on"), Check("sensor.t", ">", "25")]
    states = {WINDOW: "on", "sensor.t": "20"}
    assert not evaluate(cond(checks, "all"), states)
    assert evaluate(cond(checks, "any"), states)


def test_empty_checks_false():
    assert not evaluate(cond([]), {})


def test_missing_entity_is_false():
    assert not evaluate(cond([Check(WINDOW, "=", "on")]), {})
