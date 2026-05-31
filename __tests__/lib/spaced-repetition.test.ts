import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  applyGrade,
  getCards,
  getDueCards,
  gradeFromCorrect,
  orderByPriority,
  recordReview,
  resetSrs,
  summarize,
  type SrsCard,
} from "@/lib/learning/spaced-repetition";

const DAY_MS = 86_400_000;

beforeEach(() => {
  window.localStorage.clear();
});
afterEach(() => {
  window.localStorage.clear();
});

function card(overrides: Partial<SrsCard> = {}): SrsCard {
  return {
    id: "q1",
    ef: 2.5,
    reps: 0,
    intervalDays: 0,
    dueAt: 0,
    lastReviewedAt: 0,
    ...overrides,
  };
}

describe("applyGrade (SM-2)", () => {
  const now = 1_700_000_000_000;

  it("schedules the first two correct reviews at 1 then 6 days", () => {
    const first = applyGrade(card(), 5, now);
    expect(first.reps).toBe(1);
    expect(first.intervalDays).toBe(1);
    expect(first.dueAt).toBe(now + 1 * DAY_MS);

    const second = applyGrade(first, 5, now);
    expect(second.reps).toBe(2);
    expect(second.intervalDays).toBe(6);
    expect(second.dueAt).toBe(now + 6 * DAY_MS);
  });

  it("multiplies the interval by the ease factor from the third review on", () => {
    const third = applyGrade(card({ reps: 2, intervalDays: 6, ef: 2.5 }), 4, now);
    expect(third.reps).toBe(3);
    expect(third.intervalDays).toBe(Math.round(6 * 2.5)); // 15
  });

  it("raises EF on a perfect grade and floors it at 1.3", () => {
    const up = applyGrade(card({ ef: 2.5 }), 5, now);
    expect(up.ef).toBeGreaterThan(2.5);
    // Repeated low (but passing) grades drive EF down to the 1.3 floor.
    let c = card({ ef: 1.3 });
    for (let i = 0; i < 5; i++) c = applyGrade(c, 3, now);
    expect(c.ef).toBeGreaterThanOrEqual(1.3);
  });

  it("resets reps and shortens the interval to 1 day on a failing grade", () => {
    const lapsed = applyGrade(card({ reps: 5, intervalDays: 30 }), 1, now);
    expect(lapsed.reps).toBe(0);
    expect(lapsed.intervalDays).toBe(1);
    expect(lapsed.dueAt).toBe(now + 1 * DAY_MS);
  });
});

describe("gradeFromCorrect", () => {
  it("maps correctness (with optional accuracy hint) to SM-2 grades", () => {
    expect(gradeFromCorrect(true)).toBe(4);
    expect(gradeFromCorrect(true, 0.9)).toBe(5);
    expect(gradeFromCorrect(false)).toBe(2);
    expect(gradeFromCorrect(false, 0.2)).toBe(0);
  });
});

describe("recordReview / getCards / getDueCards", () => {
  it("persists a reviewed card", () => {
    recordReview("q1", true);
    const cards = getCards();
    expect(cards).toHaveLength(1);
    expect(cards[0].id).toBe("q1");
    expect(cards[0].reps).toBe(1);
  });

  it("treats only cards whose dueAt has passed as due", () => {
    recordReview("q1", true); // dueAt = now + 1 day → not due yet
    expect(getDueCards(Date.now())).toHaveLength(0);
    expect(getDueCards(Date.now() + 2 * DAY_MS)).toHaveLength(1);
  });
});

describe("orderByPriority", () => {
  it("orders the most overdue seen cards first, unseen cards at the present", () => {
    // Build state directly via recordReview, then assert ordering by dueAt.
    recordReview("seen-soon", true); // dueAt ~ now + 1 day
    const ids = ["unseen", "seen-soon"];
    const ordered = orderByPriority(ids, Date.now());
    // seen-soon (dueAt in the future) vs unseen (key = now): unseen sorts first.
    expect(ordered).toContain("seen-soon");
    expect(ordered).toContain("unseen");
    expect(ordered[0]).toBe("unseen");
  });
});

describe("summarize", () => {
  it("reports an empty summary with the default ease factor", () => {
    const s = summarize(Date.now());
    expect(s.total).toBe(0);
    expect(s.averageEf).toBe(2.5);
  });
});

// read() falls back to a module-level empty state on the "no stored key" path.
// If that object is shared by reference, recordReview's in-place mutation
// (state.cards[id] = ...) corrupts it, and resetSrs() then writes the corrupted
// copy back — leaving cards behind after a reset.
describe("shared-empty footgun (reset regression)", () => {
  it("resetSrs truly clears even when the first review happened on absent storage", () => {
    window.localStorage.clear(); // brand-new user: SRS key does not exist
    recordReview("q1", true); // empty-path write
    expect(getCards()).toHaveLength(1);

    resetSrs();
    // Buggy version writes the corrupted shared empty back → q1 survives.
    expect(getCards()).toEqual([]);
  });
});
