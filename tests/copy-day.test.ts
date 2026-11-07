import { describe, expect, it } from "vitest";
import { copyDay } from "../src/copy-day";

const b = (days: number[], start: string, temperature = 20) => ({ days, start, temperature, hvac_mode: null });

describe("copyDay", () => {
  it("copies the slots of a day onto the targets, replacing existing ones", () => {
    const blocks = [b([0], "06:30", 21), b([0], "22:00", 17), b([1], "08:00", 19), b([2, 3], "09:00", 18)];
    const out = copyDay(blocks, 0, [1, 2]);
    const day = (d: number) => out.filter((x) => x.days.includes(d)).map((x) => [x.start, x.temperature]).sort();
    expect(day(1)).toEqual([["06:30", 21], ["22:00", 17]]);
    expect(day(2)).toEqual([["06:30", 21], ["22:00", 17]]);
    expect(day(0)).toEqual([["06:30", 21], ["22:00", 17]]);
    expect(day(3)).toEqual([["09:00", 18]]); // giorno non toccato
  });

  it("keeps the source day intact when it shares a block with a target", () => {
    const out = copyDay([b([0, 1, 2], "07:00", 20)], 0, [1]);
    const day = (d: number) => out.filter((x) => x.days.includes(d)).map((x) => x.start);
    expect(day(0)).toEqual(["07:00"]);
    expect(day(1)).toEqual(["07:00"]);
    expect(day(2)).toEqual(["07:00"]);
  });

  it("does not mutate the input and ignores the source/invalid targets", () => {
    const blocks = [b([0], "06:30")];
    const snapshot = structuredClone(blocks);
    expect(copyDay(blocks, 0, [0, 9, -1])).toBe(blocks);
    copyDay(blocks, 0, [3]);
    expect(blocks).toEqual(snapshot);
  });
});
