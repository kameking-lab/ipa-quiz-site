import { describe, it, expect, beforeEach } from "vitest";
import {
  recordMockExam,
  getMockExamHistory,
  getMockExamHistoryByExam,
  type MockExamResult,
} from "@/lib/mock-exam/storage";

function makeResult(overrides: Partial<MockExamResult> = {}): MockExamResult {
  return {
    id: `m-${Math.random().toString(36).slice(2, 8)}`,
    exam: "ap",
    startedAt: 1_000,
    finishedAt: 2_000,
    totalQuestions: 80,
    answered: 80,
    correct: 60,
    scorePct: 75,
    passed: true,
    timeUsedSec: 9000,
    byCategory: {},
    ...overrides,
  };
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("recordMockExam / getMockExamHistory", () => {
  it("returns empty history for a brand-new user", () => {
    expect(getMockExamHistory()).toEqual([]);
  });

  it("appends results in insertion order", () => {
    recordMockExam(makeResult({ id: "a" }));
    recordMockExam(makeResult({ id: "b" }));
    expect(getMockExamHistory().map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("caps stored history at 50 keeping the most recent", () => {
    for (let i = 0; i < 55; i++) recordMockExam(makeResult({ id: `r${i}` }));
    const hist = getMockExamHistory();
    expect(hist).toHaveLength(50);
    expect(hist[0].id).toBe("r5");
    expect(hist[49].id).toBe("r54");
  });

  it("filters by exam code", () => {
    recordMockExam(makeResult({ id: "ap1", exam: "ap" }));
    recordMockExam(makeResult({ id: "fe1", exam: "fe" }));
    expect(getMockExamHistoryByExam("fe").map((r) => r.id)).toEqual(["fe1"]);
    expect(getMockExamHistoryByExam("ap").map((r) => r.id)).toEqual(["ap1"]);
  });
});

// read() returns a module-level empty object on the "no stored key" path.
// If that object is shared by reference, recordMockExam's data.history.push()
// corrupts it permanently — so a later read on absent storage would leak the
// pushed result. Exercise the corruption path with localStorage.clear().
describe("shared-empty footgun (absent-storage purity)", () => {
  it("does not leak a recorded result into a later empty read", () => {
    recordMockExam(makeResult({ id: "leak" })); // empty-path write
    window.localStorage.clear(); // key absent again
    // Buggy version returns the corrupted shared empty containing "leak".
    expect(getMockExamHistory()).toEqual([]);
  });
});
