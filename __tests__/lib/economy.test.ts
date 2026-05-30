import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  addGold,
  addXp,
  getGold,
  getXp,
  levelForXp,
  spendGold,
  xpToNext,
} from "@/lib/gamification/economy";

// economy.ts persists to localStorage (jsdom). Reset between tests so each
// case starts from the empty state.
beforeEach(() => {
  window.localStorage.clear();
});
afterEach(() => {
  window.localStorage.clear();
});

describe("levelForXp", () => {
  it("returns level 1 at zero / sub-threshold XP", () => {
    expect(levelForXp(0)).toBe(1);
    expect(levelForXp(99)).toBe(1);
  });

  it("steps up exactly at each threshold boundary", () => {
    expect(levelForXp(100)).toBe(2); // first threshold
    expect(levelForXp(299)).toBe(2);
    expect(levelForXp(300)).toBe(3);
    expect(levelForXp(1000)).toBe(5);
  });

  it("is monotonic non-decreasing across the XP range", () => {
    let prev = 0;
    for (let xp = 0; xp <= 30000; xp += 250) {
      const lv = levelForXp(xp);
      expect(lv).toBeGreaterThanOrEqual(prev);
      prev = lv;
    }
  });

  it("caps at the top level for very large XP", () => {
    // 16 thresholds → max level 16.
    expect(levelForXp(28000)).toBe(16);
    expect(levelForXp(1_000_000)).toBe(16);
  });
});

describe("xpToNext", () => {
  it("reports progress within the current level band", () => {
    // level 2 band is [100, 300): halfway at 200.
    const p = xpToNext(200);
    expect(p.current).toBe(100);
    expect(p.next).toBe(300);
    expect(p.pct).toBeCloseTo(0.5, 5);
  });

  it("clamps pct into [0, 1] and is 0 at a band start", () => {
    const start = xpToNext(100);
    expect(start.pct).toBe(0);
    const p = xpToNext(299);
    expect(p.pct).toBeGreaterThan(0);
    expect(p.pct).toBeLessThanOrEqual(1);
  });

  it("synthesizes a band past the max level without dividing by zero", () => {
    const p = xpToNext(28000);
    expect(p.current).toBe(28000);
    expect(p.next).toBeGreaterThan(p.current);
    expect(Number.isFinite(p.pct)).toBe(true);
  });
});

describe("addXp", () => {
  it("accumulates XP and recomputes the level", () => {
    const a = addXp(150);
    expect(a.total).toBe(150);
    expect(a.level).toBe(2);
    const b = addXp(150);
    expect(b.total).toBe(300);
    expect(b.level).toBe(3);
  });

  it("ignores non-positive amounts (no-op, no level change)", () => {
    addXp(150);
    const same = addXp(0);
    expect(same.total).toBe(150);
    const stillSame = addXp(-50);
    expect(stillSame.total).toBe(150);
  });

  it("persists across reads", () => {
    addXp(500);
    expect(getXp().total).toBe(500);
    expect(getXp().level).toBe(levelForXp(500));
  });
});

describe("addGold / spendGold", () => {
  it("tracks balance, earned, and spent independently", () => {
    addGold(100);
    let g = getGold();
    expect(g.balance).toBe(100);
    expect(g.earned).toBe(100);
    expect(g.spent).toBe(0);

    const ok = spendGold(30);
    expect(ok).toBe(true);
    g = getGold();
    expect(g.balance).toBe(70);
    expect(g.earned).toBe(100); // earned never decreases
    expect(g.spent).toBe(30);
  });

  it("rejects a spend that exceeds the balance and leaves state untouched", () => {
    addGold(50);
    const ok = spendGold(100);
    expect(ok).toBe(false);
    const g = getGold();
    expect(g.balance).toBe(50);
    expect(g.spent).toBe(0);
  });

  it("allows spending the exact balance down to zero", () => {
    addGold(40);
    expect(spendGold(40)).toBe(true);
    expect(getGold().balance).toBe(0);
  });

  it("ignores non-positive gold additions", () => {
    addGold(0);
    addGold(-10);
    expect(getGold().balance).toBe(0);
  });
});
