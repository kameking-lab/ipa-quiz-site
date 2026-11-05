import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";
import { addXp, getXp } from "@/lib/gamification/economy";
import { awardXp, readXp, levelFromXp } from "@/lib/gamification/xp";
beforeEach(() => { localStorage.clear(); vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-05T03:00:00Z")); });
afterEach(() => vi.useRealTimers());
it("alternates achievement and ordinary awards without losing daily counts or legacy metadata", () => {
  localStorage.setItem(LS_KEYS.xpState, JSON.stringify({ total: 28000, level: 16, updatedAt: 1, legacy: "keep" }));
  expect(getXp().level).toBe(levelFromXp(28000));
  addXp(20); awardXp(10); addXp(30);
  expect(readXp()).toMatchObject({ total: 28060, earnedToday: 60, lastEarnedDate: "2026-11-05" });
  expect(getXp().level).toBe(levelFromXp(28060));
  expect(JSON.parse(localStorage.getItem(LS_KEYS.xpState)!)).toMatchObject({ legacy: "keep", earnedToday: 60 });
  vi.setSystemTime(new Date("2026-11-06T03:00:00Z")); addXp(15);
  expect(readXp()).toMatchObject({ total: 28075, earnedToday: 15 });
});
