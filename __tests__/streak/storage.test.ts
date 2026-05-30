import { describe, it, expect, beforeEach } from "vitest";
import {
  readStreak,
  recordStudyToday,
  resetStreak,
} from "@/lib/streak/storage";
import { jstDateString, EMPTY_STREAK } from "@/lib/streak/core";

/**
 * Characterization tests for the streak persistence layer. The streak math
 * (applyStudyDay / decayIfLapsed / justReachedMilestone) is already pinned in
 * streak/core tests; here we fix the storage-specific contract that core does
 * NOT cover: the read() validation/coercion of an untrusted LocalStorage blob,
 * the read→apply→write round-trip of recordStudyToday, the reached-milestone
 * wiring, and resetStreak clearing the record. These are the gates protecting
 * the gamification streak counter from corrupt persistence.
 */

const STREAK_LS_KEY = "ipa-quiz:streak:v1";

// today / yesterday / two-days-ago as JST date strings, deterministic relative
// to now (subtracting whole days commutes with the fixed +9h JST offset).
const today = jstDateString();
const yesterday = jstDateString(new Date(Date.now() - 24 * 60 * 60 * 1000));
const twoDaysAgo = jstDateString(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000));

function seed(raw: string): void {
  window.localStorage.setItem(STREAK_LS_KEY, raw);
}

function stored(): unknown {
  const raw = window.localStorage.getItem(STREAK_LS_KEY);
  return raw ? JSON.parse(raw) : null;
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("streak/storage readStreak", () => {
  it("returns an empty streak when nothing is persisted", () => {
    const s = readStreak();
    expect(s.currentStreak).toBe(0);
    expect(s.longestStreak).toBe(0);
    expect(s.lastStudyDate).toBeNull();
    expect(s.milestonesReached).toEqual([]);
  });

  it("fails soft to an empty streak on corrupt JSON", () => {
    seed("{not-json");
    const s = readStreak();
    expect(s.currentStreak).toBe(0);
    expect(s.lastStudyDate).toBeNull();
  });

  it("coerces malformed fields to safe defaults", () => {
    seed(
      JSON.stringify({
        currentStreak: "5", // non-number -> 0
        longestStreak: null, // non-finite -> 0
        lastStudyDate: 12345, // non-string -> null
        todayCompleted: 1, // truthy -> true
        milestonesReached: "nope", // non-array -> []
      }),
    );
    const s = readStreak();
    expect(s.currentStreak).toBe(0);
    expect(s.longestStreak).toBe(0);
    expect(s.lastStudyDate).toBeNull();
    expect(s.todayCompleted).toBe(true);
    expect(s.milestonesReached).toEqual([]);
  });

  it("filters non-number entries out of milestonesReached", () => {
    seed(
      JSON.stringify({
        currentStreak: 7,
        longestStreak: 7,
        lastStudyDate: today,
        todayCompleted: true,
        milestonesReached: [3, "7", null, 7],
      }),
    );
    const s = readStreak();
    expect(s.milestonesReached).toEqual([3, 7]);
  });

  it("marks todayCompleted=false when the last study day was yesterday (decay)", () => {
    seed(
      JSON.stringify({
        currentStreak: 4,
        longestStreak: 4,
        lastStudyDate: yesterday,
        todayCompleted: true,
        milestonesReached: [3],
      }),
    );
    const s = readStreak();
    // decayIfLapsed: 1-day gap keeps the streak but resets today's completion.
    expect(s.currentStreak).toBe(4);
    expect(s.todayCompleted).toBe(false);
  });

  it("decays a lapsed streak (>=2 day gap) to zero", () => {
    seed(
      JSON.stringify({
        currentStreak: 9,
        longestStreak: 9,
        lastStudyDate: twoDaysAgo,
        todayCompleted: true,
        milestonesReached: [3, 7],
      }),
    );
    const s = readStreak();
    expect(s.currentStreak).toBe(0);
    expect(s.todayCompleted).toBe(false);
    // longest is preserved through decay.
    expect(s.longestStreak).toBe(9);
  });
});

describe("streak/storage recordStudyToday", () => {
  it("starts a streak at 1 and persists it on first study", () => {
    const { state, reachedMilestone } = recordStudyToday();
    expect(state.currentStreak).toBe(1);
    expect(state.lastStudyDate).toBe(today);
    expect(state.todayCompleted).toBe(true);
    expect(reachedMilestone).toBeNull();
    // persisted, not just returned.
    const persisted = stored() as { currentStreak: number };
    expect(persisted.currentStreak).toBe(1);
  });

  it("is idempotent within the same day (no double-count)", () => {
    recordStudyToday();
    const { state } = recordStudyToday();
    expect(state.currentStreak).toBe(1);
    expect(state.todayCompleted).toBe(true);
  });

  it("extends a consecutive-day streak and reports a reached milestone", () => {
    // Yesterday the user was on a 2-day streak; studying today makes it 3.
    seed(
      JSON.stringify({
        currentStreak: 2,
        longestStreak: 2,
        lastStudyDate: yesterday,
        todayCompleted: true,
        milestonesReached: [],
      }),
    );
    const { state, reachedMilestone } = recordStudyToday();
    expect(state.currentStreak).toBe(3);
    expect(state.longestStreak).toBe(3);
    expect(reachedMilestone).toBe(3);
    expect(state.milestonesReached).toContain(3);
  });

  it("does not re-fire a milestone already reached", () => {
    seed(
      JSON.stringify({
        currentStreak: 3,
        longestStreak: 3,
        lastStudyDate: yesterday,
        todayCompleted: true,
        milestonesReached: [3],
      }),
    );
    const { state, reachedMilestone } = recordStudyToday();
    expect(state.currentStreak).toBe(4);
    expect(reachedMilestone).toBeNull();
  });

  it("restarts the streak at 1 after a lapse", () => {
    seed(
      JSON.stringify({
        currentStreak: 9,
        longestStreak: 9,
        lastStudyDate: twoDaysAgo,
        todayCompleted: true,
        milestonesReached: [3, 7],
      }),
    );
    const { state } = recordStudyToday();
    expect(state.currentStreak).toBe(1);
    // longest survives the restart.
    expect(state.longestStreak).toBe(9);
  });
});

describe("streak/storage resetStreak", () => {
  it("clears the persisted streak back to empty", () => {
    recordStudyToday();
    resetStreak();
    expect(stored()).toEqual(EMPTY_STREAK);
    const s = readStreak();
    expect(s.currentStreak).toBe(0);
    expect(s.lastStudyDate).toBeNull();
  });
});
