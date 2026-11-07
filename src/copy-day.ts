import type { Block } from "./api";

/**
 * Copia le fasce di `from` sui giorni `targets`, sostituendo quelle già presenti.
 * Funzione pura: restituisce un nuovo elenco, senza modificare l'originale.
 * Le fasce copiate sono indipendenti dal giorno di origine (modificarle non tocca `from`).
 */
export function copyDay(blocks: Block[], from: number, targets: number[]): Block[] {
  const dest = [...new Set(targets)].filter((d) => d !== from && d >= 0 && d <= 6).sort((a, b) => a - b);
  if (!dest.length) return blocks;
  const source = blocks.filter((b) => b.days.includes(from));
  const kept = blocks
    .map((b) => ({ ...b, days: b.days.filter((d) => !dest.includes(d)) }))
    .filter((b) => b.days.length > 0);
  const copies = source.map((b) => ({ ...b, days: [...dest] }));
  return [...kept, ...copies];
}
