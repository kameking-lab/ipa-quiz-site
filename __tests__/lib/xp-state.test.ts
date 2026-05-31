import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LS_KEYS } from "@/lib/storage/keys";
import {
  readXp,
  awardXp,
  resetXp,
  XP_REWARDS,
  levelFromXp,
  type XpState,
} from "@/lib/gamification/xp";

// xp-curve.test.ts covers the pure leveling math (totalXpForLevel / levelFromXp /
// xpProgress). The stateful localStorage layer — readXp's JST day rollover, awardXp's
// accumulation + level-up detection, resetXp — is otherwise uncovered. The clock is
// faked so the "earned today" daily reset is deterministic: 2024-06-15T03:00:00Z is
// 2024-06-15 12:00 JST → JST date "2024-06-15".
const FIXED_NOW = new Date("2024-06-15T03:00:00Z");
const TODAY_JST = "2024-06-15";

function store(state: Partial<XpState>): void {
  window.localStorage.setItem(LS_KEYS.xpState, JSON.stringify(state));
}

beforeEach(() => {
  window.localStorage.clear();
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(FIXED_NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("readXp", () => {
  it("is empty when nothing is stored", () => {
    expect(readXp()).toEqual({ total: 0, earnedToday: 0, lastEarnedDate: null });
  });

  it("returns today's earned total when the stored date is the current JST day", () => {
    store({ total: 500, earnedToday: 40, lastEarnedDate: TODAY_JST });
    expect(readXp()).toEqual({ total: 500, earnedToday: 40, lastEarnedDate: TODAY_JST });
  });

  it("keeps the lifetime total but zeroes today's tally on a new JST day", () => {
    store({ total: 500, earnedToday: 40, lastEarnedDate: "2024-06-14" });
    expect(readXp()).toEqual({ total: 500, earnedToday: 0, lastEarnedDate: null });
  });

  it("clamps a negative or non-finite stored total to zero", () => {
    store({ total: -5, earnedToday: 3, lastEarnedDate: TODAY_JST });
    expect(readXp().total).toBe(0);
    store({ total: Number.NaN as unknown as number, earnedToday: 0, lastEarnedDate: TODAY_JST });
    expect(readXp().total).toBe(0);
  });

  it("fails soft to empty on corrupt storage", () => {
    window.localStorage.setItem(LS_KEYS.xpState, "{broken");
    expect(readXp()).toEqual({ total: 0, earnedToday: 0, lastEarnedDate: null });
  });
});

describe("awardXp", () => {
  it("accumulates the lifetime total and persists it", () => {
    awardXp(30);
    const result = awardXp(20);
    expect(result.total).toBe(50);
    expect(readXp().total).toBe(50);
    expect(readXp().lastEarnedDate).toBe(TODAY_JST);
  });

  it("reports a level-up when the award crosses a threshold", () => {
    const result = awardXp(100); // level 2 starts at 100 total XP
    expect(result.levelBefore).toBe(1);
    expect(result.levelAfter).toBe(2);
    expect(result.leveledUp).toBe(true);
    expect(levelFromXp(result.total)).toBe(2);
  });

  it("does not flag a level-up for a small award within the same level", () => {
    store({ total: 100, earnedToday: 0, lastEarnedDate: TODAY_JST });
    const result = awardXp(10);
    expect(result.leveledUp).toBe(false);
    expect(result.levelAfter).toBe(result.levelBefore);
  });

  it("resets the daily tally across a JST day but grows the lifetime total", () => {
    store({ total: 200, earnedToday: 80, lastEarnedDate: "2024-06-14" });
    const result = awardXp(10);
    expect(result.total).toBe(210); // lifetime total carries forward
    expect(readXp().earnedToday).toBe(10); // today's tally restarts, not 90
  });

  it("floors fractional awards and ignores negatives", () => {
    expect(awardXp(7.9).awarded).toBe(7);
    expect(awardXp(-100).awarded).toBe(0);
    expect(readXp().total).toBe(7); // negative award left the total unchanged
  });
});

describe("resetXp", () => {
  it("clears all stored XP back to empty", () => {
    awardXp(120);
    resetXp();
    expect(readXp()).toEqual({ total: 0, earnedToday: 0, lastEarnedDate: null });
  });
});

describe("XP_REWARDS", () => {
  it("exposes positive integer rewards for every action", () => {
    for (const value of Object.values(XP_REWARDS)) {
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThan(0);
    }
  });
});
