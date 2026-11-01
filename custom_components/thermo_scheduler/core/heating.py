"""Tempo necessario per raggiungere una temperatura target.

Modello semplice a un solo termine: la velocità di riscaldamento (°C/h) è
    rate = P − L · (T_interna − T_esterna)
dove P è la potenza di riscaldamento e L le dispersioni, entrambe scalate
con il volume della stanza. Il valore iniziale (prior) dipende da impianto,
caldaia e classe energetica; poi un fattore di calibrazione, ricavato dallo
storico dei cicli reali, lo corregge (mediana del rapporto osservato/previsto).

Nessuna dipendenza da Home Assistant: funzioni pure, facili da testare.
"""
from __future__ import annotations

from dataclasses import dataclass
from statistics import median

EMITTERS = ("radiators", "floor")
BOILERS = ("gas", "heat_pump")
ENERGY_CLASSES = ("A", "B", "C", "D", "E", "F", "G")

REFERENCE_VOLUME = 54.0  # 20 m² × 2,7 m: la stanza di riferimento dei prior
MIN_RATE = 0.05  # °C/h sotto i quali il calcolo non ha senso
MIN_EPISODE_MINUTES = 3
CALIBRATION_BOUNDS = (0.25, 4.0)

# °C/h di riscaldamento a volume di riferimento, a parità di T interna ed esterna
POWER_PRIOR = {
    ("radiators", "gas"): 1.5,
    ("radiators", "heat_pump"): 1.1,
    ("floor", "gas"): 0.9,
    ("floor", "heat_pump"): 0.7,
}
# dispersioni in °C/h per ogni °C di differenza, a volume di riferimento
LOSS_PRIOR = {"A": 0.010, "B": 0.015, "C": 0.020, "D": 0.028, "E": 0.036, "F": 0.046, "G": 0.060}


@dataclass(frozen=True)
class House:
    """Impianto, caldaia e classe energetica: valgono per tutta la casa."""

    emitter: str = "radiators"
    boiler: str = "gas"
    energy_class: str = "D"

    def __post_init__(self) -> None:
        if self.emitter not in EMITTERS or self.boiler not in BOILERS or self.energy_class not in ENERGY_CLASSES:
            raise ValueError("impianto, caldaia o classe energetica non validi")


@dataclass(frozen=True)
class Room:
    """Superficie e altezza della stanza del termostato."""

    area_m2: float = 20.0
    height_m: float = 2.7

    def __post_init__(self) -> None:
        if not (5 <= self.area_m2 <= 500) or not (2 <= self.height_m <= 6):
            raise ValueError("superficie o altezza fuori dai limiti")

    @property
    def volume(self) -> float:
        return self.area_m2 * self.height_m


@dataclass(frozen=True)
class Episode:
    """Un ciclo di riscaldamento completato: da start_in a end_in in `minutes` minuti."""

    start_in: float
    end_in: float
    outdoor: float
    minutes: float


def rate_prior(house: House, room: Room, t_in: float, t_out: float) -> float:
    """Velocità di riscaldamento prevista in °C/h, senza calibrazione."""
    scale = REFERENCE_VOLUME / room.volume
    power = POWER_PRIOR[(house.emitter, house.boiler)] * scale
    loss = LOSS_PRIOR[house.energy_class] * scale
    return power - loss * (t_in - t_out)


def calibration(house: House, room: Room, episodes: list[Episode]) -> tuple[float, int]:
    """Fattore correttivo (mediana osservato/previsto) e numero di cicli usati."""
    ratios = []
    for ep in episodes:
        if ep.minutes < MIN_EPISODE_MINUTES or ep.end_in <= ep.start_in:
            continue
        mean_in = (ep.start_in + ep.end_in) / 2
        predicted = rate_prior(house, room, mean_in, ep.outdoor)
        if predicted <= MIN_RATE:
            continue
        observed = (ep.end_in - ep.start_in) * 60 / ep.minutes
        ratios.append(observed / predicted)
    if not ratios:
        return 1.0, 0
    low, high = CALIBRATION_BOUNDS
    return min(max(median(ratios), low), high), len(ratios)


def minutes_to_target(
    house: House, room: Room, t_in: float, target: float, t_out: float, factor: float = 1.0
) -> float | None:
    """Minuti per passare da t_in a target, integrando la velocità lungo il percorso.

    None se la casa non può raggiungere il target (dispersioni più alte della potenza)
    o se servirebbe più di un giorno.
    """
    if target <= t_in:
        return 0.0
    step = 0.1
    temp = t_in
    minutes = 0.0
    while temp < target - 1e-9:
        rate = rate_prior(house, room, temp, t_out) * factor
        if rate <= MIN_RATE:
            return None
        nxt = min(target, temp + step)
        minutes += (nxt - temp) / rate * 60
        temp = nxt
        if minutes > 24 * 60:
            return None
    return minutes
