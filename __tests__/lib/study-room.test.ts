import { describe, expect, it, vi } from "vitest";
vi.mock("@/lib/home/study-room-mascots.generated.json", async importOriginal => {
  const original = (await importOriginal<{ default: { exams: Record<string, unknown> } }>()).default;
  return { default: { ...original, away: {
    exams: Object.fromEntries(Object.keys(original.exams).map(exam => [exam, { src: `/away-${exam}.webp`, label: "ボール遊び" }])), fields: {}, examFields: {},
  }, vacant: "/vacant.webp" } };
});
import { measuredRoom, qualificationMascot, roomMascots, roomStage } from "@/lib/home/study-room";

describe("measured study room", () => {
  it("keeps zero and accurately reports illustrations omitted from large aggregates", () => {
    expect(measuredRoom({ count: 0, exams: [] })).toMatchObject({ seats: [], hidden: 0 });
    const room = measuredRoom({ count: 1_000_000, exams: [{ exam: "ip", count: 1_000_000 }] });
    expect(room.seats).toHaveLength(12);
    expect(room.hidden).toBe(999_988);
  });
  it("changes stages at the specified boundaries", () => {
    expect([0, 5, 6, 12, 13, 24, 25, 48, 49].map(roomStage)).toEqual([0, 0, 1, 1, 2, 2, 3, 3, 4]);
  });
});

describe("visit mascots", () => {
  it("keeps roughly 80/15/5 states, at most one away and rooms with none, with varied directions", () => {
    let breaks = 0;
    let away = 0;
    let noAway = 0;
    let mirrored = 0;
    const slotBreaks = Array(12).fill(0);
    for (let seed = 0; seed < 5000; seed++) {
      const room = roomMascots(seed);
      expect(room).toHaveLength(12);
      const count = room.filter(slot => slot.state === "break").length;
      expect([1, 2]).toContain(count);
      breaks += count;
      const awayCount = room.filter(slot => slot.state === "away").length;
      expect(awayCount).toBeLessThanOrEqual(1);
      away += awayCount;
      if (!awayCount) noAway++;
      mirrored += room.filter(slot => slot.mirrored).length;
      room.forEach((slot, i) => { if (slot.state === "break") slotBreaks[i]++; });
    }
    expect(breaks / 60000).toBeGreaterThan(0.14);
    expect(breaks / 60000).toBeLessThan(0.16);
    expect(away / 60000).toBeGreaterThan(0.045);
    expect(away / 60000).toBeLessThan(0.055);
    expect(1 - (breaks + away) / 60000).toBeGreaterThan(0.79);
    expect(1 - (breaks + away) / 60000).toBeLessThan(0.81);
    expect(noAway).toBeGreaterThan(1800);
    expect(mirrored / 60000).toBeGreaterThan(0.48);
    expect(mirrored / 60000).toBeLessThan(0.52);
    for (const count of slotBreaks) expect(count / 5000).toBeGreaterThan(0.13);
  });
  it("keeps slot state and direction for the visit and resolves the actual qualification", () => {
    const room = roomMascots(42);
    expect(roomMascots(42)).toEqual(room);
    expect(roomMascots(43)).not.toEqual(room);
    for (const [exam, asset] of [["ip", "ip"], ["ap", "ap"], ["fp3", "fp3"], ["takken", "takken"], ["civil2", "civil2"], ["yakuzaishi", "pharmacy"]]) {
      for (const slot of room) {
        const mascot = qualificationMascot(exam, slot);
        if (slot.state === "away") expect(mascot.src).toBe(`/away-${exam}.webp`);
        else expect(mascot.src.endsWith(`/${asset}-${slot.state}.webp`)).toBe(true);
        expect(mascot.state).toBe(slot.state);
        expect(mascot.mirrored).toBe(slot.mirrored);
      }
    }
    const seated = room.find(slot => slot.state !== "away")!;
    expect(qualificationMascot("unknown", seated)).toBe(seated);
  });
});
