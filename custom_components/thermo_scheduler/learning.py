"""Raccoglie i cicli di riscaldamento completati dagli stati dei climate.

Un ciclo inizia quando il termostato è in riscaldamento e la stanza è almeno
MIN_RISE sotto il target; finisce quando raggiunge il target. Se il target cambia,
il climate si spegne o non ci sono più dati, il ciclo viene scartato.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime

from homeassistant.util import dt as dt_util

from .core.heating import MIN_EPISODE_MINUTES, Episode

MIN_RISE = 0.5  # °C che la stanza deve salire perché il ciclo conti
REACHED = 0.2  # °C sotto il target che bastano per considerarlo raggiunto
TARGET_TOLERANCE = 0.5  # °C di variazione del target che fanno scartare il ciclo


@dataclass
class _Open:
    started_at: datetime
    start_in: float
    target: float
    outdoor: list[float] = field(default_factory=list)


class HeatingLearner:
    def __init__(self) -> None:
        self._open: dict[str, _Open] = {}

    def observe(
        self,
        climate_id: str,
        hvac: str,
        t_in: float | None,
        target: float | None,
        t_out: float | None,
    ) -> Episode | None:
        """Aggiorna lo stato di un climate; restituisce il ciclo se appena completato."""
        if t_in is None or target is None or t_out is None:
            self._open.pop(climate_id, None)
            return None
        open_ = self._open.get(climate_id)
        if open_ is None:
            if hvac == "heat" and t_in <= target - MIN_RISE:
                self._open[climate_id] = _Open(dt_util.utcnow(), t_in, target, [t_out])
            return None
        if hvac != "heat" or abs(target - open_.target) > TARGET_TOLERANCE:
            del self._open[climate_id]
            return None
        open_.outdoor.append(t_out)
        if t_in < open_.target - REACHED:
            return None
        del self._open[climate_id]
        minutes = (dt_util.utcnow() - open_.started_at).total_seconds() / 60
        if minutes < MIN_EPISODE_MINUTES or t_in - open_.start_in < MIN_RISE:
            return None
        outdoor = sum(open_.outdoor) / len(open_.outdoor)
        return Episode(round(open_.start_in, 2), round(t_in, 2), round(outdoor, 2), round(minutes, 1))
