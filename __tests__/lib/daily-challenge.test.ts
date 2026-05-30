import { describe, it, expect, beforeEach } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";
import {
  jstChallengeDate,
  seededRandom,
  pickDeterministic,
  dateSeed,
  DAILY_CHALLENGE_SIZE,
  ensureChallengeForToday,
  completeChallenge,
  readDailyChallenge,
  type DailyChallengeRecord,
} from "@/lib/gamification/daily-challenge";

function seed(rec: Partial<DailyChallengeRecord>): void {
  window.localStorage.setItem(LS_KEYS.dailyChallenge, JSON.stringify(rec));
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("jstChallengeDate", () => {
  it("maps a UTC instant into the JST calendar day", () => {
    expect(jstChallengeDate(new Date("2024-04-01T16:00:00Z"))).toBe("2024-04-02");
    expect(jstChallengeDate(new Date("2024-04-01T14:59:00Z"))).toBe("2024-04-01");
  });
});

describe("deterministic picking", () => {
  it("seededRandom is reproducible for the same seed", () => {
    const a = seededRandom(123);
    const b = seededRandom(123);
    const seqA = [a(), a(), a()];
    const seqB = [b(), b(), b()];
    expect(seqA).toEqual(seqB);
    for (const v of seqA) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("pickDeterministic returns the same n distinct items for the same seed", () => {
    const items = Array.from({ length: 20 }, (_, i) => `q${i}`);
    const first = pickDeterministic(items, 5, 999);
    const second = pickDeterministic(items, 5, 999);
    expect(first).toHaveLength(5);
    expect(first).toEqual(second);
    expect(new Set(first).size).toBe(5);
    for (const id of first) expect(items).toContain(id);
  });

  it("pickDeterministic varies by seed", () => {
    const items = Array.from({ length: 20 }, (_, i) => `q${i}`);
    expect(pickDeterministic(items, 5, 1)).not.toEqual(pickDeterministic(items, 5, 2));
  });
});

describe("dateSeed", () => {
  // dateSeed is the FNV-1a 32-bit hash that maps a JST date string to the
  // numeric seed feeding pickDeterministic in app/challenge/page.tsx. Its
  // contract: deterministic per date, well-distributed across dates, and a
  // valid unsigned 32-bit integer. Golden values pin the FNV basis/prime/mask
  // so a change to any of them is caught.
  it("is deterministic for the same date string", () => {
    expect(dateSeed("2024-04-10")).toBe(dateSeed("2024-04-10"));
  });

  it("produces the canonical FNV-1a 32-bit hash (golden values)", () => {
    // Pins basis (2166136261), prime (16777619) and the >>> 0 unsigned mask.
    expect(dateSeed("2024-04-10")).toBe(2222371158);
    expect(dateSeed("2024-04-11")).toBe(2239148777);
  });

  it("returns the FNV offset basis for an empty string (loop never runs)", () => {
    expect(dateSeed("")).toBe(2166136261);
  });

  it("returns an unsigned 32-bit integer", () => {
    for (const d of ["2024-01-01", "2024-12-31", "2025-06-15", ""]) {
      const v = dateSeed(d);
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(2 ** 32);
    }
  });

  it("yields distinct seeds for adjacent days so the daily pick rotates", () => {
    expect(dateSeed("2024-04-10")).not.toBe(dateSeed("2024-04-11"));
  });
});

describe("DAILY_CHALLENGE_SIZE", () => {
  it("drives the per-day pick count (stable for a date, varies across dates)", () => {
    const pool = Array.from({ length: 30 }, (_, i) => `q${i}`);
    const picksDay1 = pickDeterministic(pool, DAILY_CHALLENGE_SIZE, dateSeed("2024-04-10"));
    const picksDay1Again = pickDeterministic(pool, DAILY_CHALLENGE_SIZE, dateSeed("2024-04-10"));
    const picksDay2 = pickDeterministic(pool, DAILY_CHALLENGE_SIZE, dateSeed("2024-04-11"));
    expect(picksDay1).toHaveLength(DAILY_CHALLENGE_SIZE);
    expect(picksDay1).toEqual(picksDay1Again);
    expect(picksDay1).not.toEqual(picksDay2);
  });
});

describe("ensureChallengeForToday", () => {
  it("creates a pending record for a fresh day", () => {
    const rec = ensureChallengeForToday(["a", "b", "c"], "2024-04-10");
    expect(rec.date).toBe("2024-04-10");
    expect(rec.questionIds).toEqual(["a", "b", "c"]);
    expect(rec.answers).toEqual(["pending", "pending", "pending"]);
    expect(rec.completedAt).toBeNull();
    expect(rec.perfect).toBe(false);
  });

  it("returns the existing record when same day and same size", () => {
    ensureChallengeForToday(["a", "b", "c"], "2024-04-10");
    const again = ensureChallengeForToday(["x", "y", "z"], "2024-04-10");
    // unchanged: keeps the originally stored ids
    expect(again.questionIds).toEqual(["a", "b", "c"]);
  });
});

describe("completeChallenge", () => {
  it("counts correct answers and flags a perfect run on the first day", () => {
    const result = completeChallenge(["correct", "correct", "correct"], "2024-04-10");
    expect(result.correctCount).toBe(3);
    expect(result.total).toBe(3);
    expect(result.perfect).toBe(true);
    expect(result.consecutiveDays).toBe(1);
    expect(result.perfectStreak).toBe(1);
    expect(result.alreadyCompleted).toBe(false);
  });

  it("extends consecutive and perfect streaks on the next JST day", () => {
    seed({
      date: "2024-04-09",
      lastCompletedDate: "2024-04-09",
      consecutiveDays: 2,
      perfectStreak: 1,
      completedAt: 111,
    });
    const result = completeChallenge(["correct", "correct"], "2024-04-10");
    expect(result.consecutiveDays).toBe(3);
    expect(result.perfectStreak).toBe(2);
  });

  it("resets the consecutive streak to 1 after a gap", () => {
    seed({
      date: "2024-04-06",
      lastCompletedDate: "2024-04-06",
      consecutiveDays: 5,
      perfectStreak: 5,
      completedAt: 111,
    });
    const result = completeChallenge(["correct", "incorrect"], "2024-04-10");
    expect(result.consecutiveDays).toBe(1);
  });

  it("zeroes the perfect streak when the run is imperfect", () => {
    seed({
      date: "2024-04-09",
      lastCompletedDate: "2024-04-09",
      consecutiveDays: 2,
      perfectStreak: 3,
      completedAt: 111,
    });
    const result = completeChallenge(["correct", "incorrect"], "2024-04-10");
    expect(result.perfect).toBe(false);
    expect(result.perfectStreak).toBe(0);
    expect(result.consecutiveDays).toBe(3); // day count still extends
  });

  it("is idempotent once today's challenge is already completed", () => {
    seed({
      date: "2024-04-10",
      lastCompletedDate: "2024-04-10",
      consecutiveDays: 4,
      perfectStreak: 4,
      perfect: true,
      completedAt: 222,
    });
    const result = completeChallenge(["incorrect", "incorrect"], "2024-04-10");
    expect(result.alreadyCompleted).toBe(true);
    // existing streaks are preserved, not overwritten by the new attempt
    expect(result.consecutiveDays).toBe(4);
    expect(result.perfectStreak).toBe(4);
    expect(result.perfect).toBe(true);
    // and the stored record is untouched
    expect(readDailyChallenge().completedAt).toBe(222);
  });
});
