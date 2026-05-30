import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  evaluateAchievementsAfterAnswer,
  evaluateAchievementsAfterMock,
  evaluateAchievementsAfterStreak,
  getUnlocked,
  isUnlocked,
} from "@/lib/gamification/achievements";
import { getGold, getXp } from "@/lib/gamification/economy";
import type { MockExamResult } from "@/lib/mock-exam/storage";

// Achievements, XP and gold all persist to localStorage (jsdom). Reset so each
// test starts from a clean unlocked-set / ledger.
beforeEach(() => {
  window.localStorage.clear();
});
afterEach(() => {
  window.localStorage.clear();
});

function ids(unlocked: { id: string }[]): string[] {
  return unlocked.map((u) => u.id);
}

function mockResult(overrides: Partial<MockExamResult> = {}): MockExamResult {
  return {
    id: "m1",
    exam: "ap",
    startedAt: 0,
    finishedAt: 0,
    totalQuestions: 80,
    answered: 80,
    correct: 50,
    scorePct: 60,
    passed: true,
    timeUsedSec: 100,
    byCategory: {},
    ...overrides,
  };
}

describe("evaluateAchievementsAfterAnswer", () => {
  it("unlocks study milestones at their exact thresholds", () => {
    expect(ids(evaluateAchievementsAfterAnswer(1, 1, 0))).toContain("study-first");
    window.localStorage.clear();
    const at10 = ids(evaluateAchievementsAfterAnswer(10, 5, 0));
    expect(at10).toEqual(expect.arrayContaining(["study-first", "study-10"]));
    expect(at10).not.toContain("study-50");
  });

  it("gates accuracy achievements behind a minimum answered count", () => {
    // 90% accuracy but only 5 answered → no accuracy badge yet.
    const few = ids(evaluateAchievementsAfterAnswer(5, 5, 0));
    expect(few).not.toContain("acc-50");
    window.localStorage.clear();
    // 50% over 10 answered → acc-50 unlocks.
    const enough = ids(evaluateAchievementsAfterAnswer(10, 5, 0));
    expect(enough).toContain("acc-50");
  });

  it("unlocks consecutive-correct streak badges", () => {
    const r = ids(evaluateAchievementsAfterAnswer(20, 20, 10));
    expect(r).toContain("no-wrong-10");
    expect(r).not.toContain("no-wrong-20");
  });

  it("is idempotent: re-evaluating the same state unlocks nothing new", () => {
    evaluateAchievementsAfterAnswer(100, 90, 0);
    const second = evaluateAchievementsAfterAnswer(100, 90, 0);
    expect(second).toEqual([]);
  });

  it("awards the achievement's XP and gold on unlock", () => {
    evaluateAchievementsAfterAnswer(1, 1, 0); // study-first: xp 20, gold 10
    expect(getXp().total).toBe(20);
    expect(getGold().balance).toBe(10);
    expect(isUnlocked("study-first")).toBe(true);
  });
});

describe("evaluateAchievementsAfterStreak", () => {
  it("unlocks all streak badges at or below the current streak", () => {
    const r = ids(evaluateAchievementsAfterStreak(7));
    expect(r).toEqual(expect.arrayContaining(["streak-2", "streak-3", "streak-7"]));
    expect(r).not.toContain("streak-14");
  });

  it("unlocks nothing for a 1-day streak", () => {
    expect(evaluateAchievementsAfterStreak(1)).toEqual([]);
  });
});

describe("evaluateAchievementsAfterMock", () => {
  it("always unlocks mock-first on a completed mock", () => {
    expect(ids(evaluateAchievementsAfterMock(mockResult()))).toContain("mock-first");
  });

  it("unlocks score badges and pass badge by result", () => {
    const r = ids(
      evaluateAchievementsAfterMock(mockResult({ scorePct: 90, passed: true })),
    );
    expect(r).toEqual(
      expect.arrayContaining(["mock-80", "mock-90", "mock-pass-first"]),
    );
  });

  it("requires more than one category for mock-perfect-cat", () => {
    // Single category, all good → still no perfect-cat (needs >1 category).
    const single = ids(
      evaluateAchievementsAfterMock(
        mockResult({ byCategory: { A: { total: 10, correct: 8 } } }),
      ),
    );
    expect(single).not.toContain("mock-perfect-cat");
    window.localStorage.clear();
    // Two categories both >=70% → perfect-cat unlocks.
    const multi = ids(
      evaluateAchievementsAfterMock(
        mockResult({
          byCategory: {
            A: { total: 10, correct: 8 },
            B: { total: 10, correct: 7 },
          },
        }),
      ),
    );
    expect(multi).toContain("mock-perfect-cat");
  });

  it("does not unlock perfect-cat when any category is below 70%", () => {
    const r = ids(
      evaluateAchievementsAfterMock(
        mockResult({
          byCategory: {
            A: { total: 10, correct: 9 },
            B: { total: 10, correct: 6 }, // 60% < 70%
          },
        }),
      ),
    );
    expect(r).not.toContain("mock-perfect-cat");
  });

  it("unlocks mock-pass-3 only after three consecutive passes", () => {
    expect(ids(evaluateAchievementsAfterMock(mockResult({ passed: true })))).not.toContain(
      "mock-pass-3",
    );
    expect(ids(evaluateAchievementsAfterMock(mockResult({ passed: true })))).not.toContain(
      "mock-pass-3",
    );
    expect(ids(evaluateAchievementsAfterMock(mockResult({ passed: true })))).toContain(
      "mock-pass-3",
    );
  });

  it("resets the consecutive-pass counter on a failed mock", () => {
    evaluateAchievementsAfterMock(mockResult({ passed: true }));
    evaluateAchievementsAfterMock(mockResult({ passed: false }));
    // After a fail, two more passes is only 2 consecutive → no mock-pass-3.
    evaluateAchievementsAfterMock(mockResult({ passed: true }));
    expect(ids(evaluateAchievementsAfterMock(mockResult({ passed: true })))).not.toContain(
      "mock-pass-3",
    );
  });
});

describe("getUnlocked", () => {
  it("accumulates the unlocked set across evaluations", () => {
    evaluateAchievementsAfterAnswer(1, 1, 0);
    evaluateAchievementsAfterStreak(2);
    const all = getUnlocked().map((u) => u.id);
    expect(all).toEqual(expect.arrayContaining(["study-first", "streak-2"]));
  });
});
