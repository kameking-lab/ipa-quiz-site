import { describe, it, expect } from "vitest";
import {
  MAX_LEVEL,
  totalXpForLevel,
  levelFromXp,
  xpProgress,
} from "@/lib/gamification/xp";

describe("totalXpForLevel", () => {
  it("anchors the quadratic curve at known points", () => {
    expect(totalXpForLevel(1)).toBe(0);
    expect(totalXpForLevel(0)).toBe(0); // clamped below 1
    expect(totalXpForLevel(2)).toBe(100);
    expect(totalXpForLevel(3)).toBe(300);
    expect(totalXpForLevel(5)).toBe(1000);
  });

  it("matches the formula at the MAX_LEVEL boundary", () => {
    // The >= MAX_LEVEL branch must agree with the raw formula 50*(L-1)*L.
    expect(totalXpForLevel(MAX_LEVEL)).toBe(50 * (MAX_LEVEL - 1) * MAX_LEVEL);
    expect(totalXpForLevel(MAX_LEVEL)).toBe(495_000);
  });

  it("is strictly increasing across every level", () => {
    for (let l = 1; l < MAX_LEVEL; l++) {
      expect(totalXpForLevel(l + 1)).toBeGreaterThan(totalXpForLevel(l));
    }
  });
});

describe("levelFromXp", () => {
  it("floors non-positive XP to level 1", () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(-50)).toBe(1);
  });

  it("returns the highest level whose threshold is met", () => {
    expect(levelFromXp(99)).toBe(1); // just below level 2's 100
    expect(levelFromXp(100)).toBe(2); // exactly level 2
    expect(levelFromXp(299)).toBe(2); // just below level 3's 300
    expect(levelFromXp(300)).toBe(3);
  });

  it("caps at MAX_LEVEL no matter how much XP is supplied", () => {
    expect(levelFromXp(495_000)).toBe(MAX_LEVEL);
    expect(levelFromXp(10_000_000)).toBe(MAX_LEVEL);
  });

  it("is a faithful inverse of totalXpForLevel at every threshold", () => {
    for (let l = 1; l <= MAX_LEVEL; l++) {
      expect(levelFromXp(totalXpForLevel(l))).toBe(l);
    }
  });
});

describe("xpProgress", () => {
  it("reports zero progress exactly on a level boundary", () => {
    const p = xpProgress(100); // start of level 2
    expect(p.level).toBe(2);
    expect(p.xpIntoLevel).toBe(0);
    expect(p.xpForNextLevel).toBe(totalXpForLevel(3) - totalXpForLevel(2));
    expect(p.progress).toBe(0);
    expect(p.isMax).toBe(false);
  });

  it("reports a fractional progress mid-level in 0..1", () => {
    const base = totalXpForLevel(2); // 100
    const span = totalXpForLevel(3) - base; // 200
    const p = xpProgress(base + span / 2); // halfway through level 2
    expect(p.level).toBe(2);
    expect(p.progress).toBeCloseTo(0.5, 5);
    expect(p.progress).toBeGreaterThan(0);
    expect(p.progress).toBeLessThan(1);
  });

  it("saturates at the max level", () => {
    const p = xpProgress(totalXpForLevel(MAX_LEVEL) + 9999);
    expect(p.level).toBe(MAX_LEVEL);
    expect(p.isMax).toBe(true);
    expect(p.progress).toBe(1);
    expect(p.xpForNextLevel).toBe(0);
  });
});
