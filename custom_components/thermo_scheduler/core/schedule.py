"""Calcolo delle fasce di una programmazione settimanale (nessuna dipendenza da HA)."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, time, timedelta, timezone


@dataclass(frozen=True)
class Block:
    days: frozenset[int]  # 0 = lunedì … 6 = domenica
    start: time
    temperature: float
    hvac_mode: str | None = None


@dataclass(frozen=True)
class Profile:
    id: str
    name: str
    blocks: tuple[Block, ...]


def _occurrences(profile: Profile, now: datetime) -> list[tuple[datetime, Block]]:
    """Inizi dei blocchi da 7 giorni prima a 7 giorni dopo `now`, in ordine."""
    out = []
    for offset in range(-7, 8):
        day = now.date() + timedelta(days=offset)
        for block in profile.blocks:
            if day.weekday() in block.days:
                naive = datetime.combine(day, block.start, tzinfo=now.tzinfo)
                # ponytail: il giro via UTC sposta le ore inesistenti (salto ora legale) in avanti
                out.append((naive.astimezone(timezone.utc).astimezone(now.tzinfo), block))
    out.sort(key=lambda item: item[0])
    return out


def current_block(profile: Profile, now: datetime) -> tuple[Block, datetime] | None:
    past = [(start, block) for start, block in _occurrences(profile, now) if start <= now]
    if not past:
        return None
    start, block = past[-1]
    return block, start


def next_change(profile: Profile, now: datetime) -> datetime | None:
    return next((start for start, _ in _occurrences(profile, now) if start > now), None)
