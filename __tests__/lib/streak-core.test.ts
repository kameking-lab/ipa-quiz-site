import { describe, it, expect } from "vitest";
import {
  EMPTY_STREAK,
  STREAK_MILESTONES,
  jstDateString,
  applyStudyDay,
  decayIfLapsed,
  nextMilestone,
  justReachedMilestone,
  type StreakState,
} from "@/lib/streak/core";

describe("jstDateString", () => {
  it("rolls a UTC instant forward into the JST calendar day", () => {
    // 16:00Z == 01:00 JST the next day
    expect(jstDateString(new Date("2024-01-01T16:00:00Z"))).toBe("2024-01-02");
    // 14:59Z == 23:59 JST same day
    expect(jstDateString(new Date("2024-01-01T14:59:00Z"))).toBe("2024-01-01");
    // exactly 15:00Z == 00:00 JST next day
    expect(jstDateString(new Date("2024-01-01T15:00:00Z"))).toBe("2024-01-02");
  });
});

describe("applyStudyDay", () => {
  it("starts a streak at 1 from the empty state", () => {
    const next = applyStudyDay(EMPTY_STREAK, "2024-04-01");
    expect(next.currentStreak).toBe(1);
    expect(next.longestStreak).toBe(1);
    expect(next.lastStudyDate).toBe("2024-04-01");
    expect(next.todayCompleted).toBe(true);
  });

  it("is idempotent on the same day (no double-count)", () => {
    const day1 = applyStudyDay(EMPTY_STREAK, "2024-04-01");
    const again = applyStudyDay(day1, "2024-04-01");
    expect(again.currentStreak).toBe(1);
    expect(again.todayCompleted).toBe(true);
  });

  it("increments on a consecutive JST day", () => {
    const day1 = applyStudyDay(EMPTY_STREAK, "2024-04-01");
    const day2 = applyStudyDay(day1, "2024-04-02");
    expect(day2.currentStreak).toBe(2);
    expect(day2.longestStreak).toBe(2);
  });

  it("resets to 1 after a gap and preserves the longest streak", () => {
    let s = applyStudyDay(EMPTY_STREAK, "2024-04-01");
    s = applyStudyDay(s, "2024-04-02");
    s = applyStudyDay(s, "2024-04-03"); // streak 3
    const afterGap = applyStudyDay(s, "2024-04-10"); // 7-day gap
    expect(afterGap.currentStreak).toBe(1);
    expect(afterGap.longestStreak).toBe(3);
  });

  it("records each milestone once as the streak crosses it", () => {
    let s: StreakState = EMPTY_STREAK;
    for (let day = 1; day <= 3; day++) {
      s = applyStudyDay(s, `2024-04-0${day}`);
    }
    expect(s.currentStreak).toBe(3);
    expect(s.milestonesReached).toContain(3);
    expect(s.milestonesReached).not.toContain(7);
    // milestones stay sorted and de-duplicated across further days
    s = applyStudyDay(s, "2024-04-04");
    expect(s.milestonesReached).toEqual([3]);
  });

  it("does not re-add an already-reached milestone after a reset+reclimb", () => {
    let s: StreakState = EMPTY_STREAK;
    for (let day = 1; day <= 3; day++) s = applyStudyDay(s, `2024-04-0${day}`);
    const afterGap = applyStudyDay(s, "2024-05-01"); // reset to 1
    expect(afterGap.milestonesReached).toEqual([3]); // unchanged, no duplicate
  });
});

describe("decayIfLapsed", () => {
  it("leaves an untouched empty state alone", () => {
    expect(decayIfLapsed(EMPTY_STREAK, "2024-04-01")).toEqual(EMPTY_STREAK);
  });

  it("marks today completed when last study is today", () => {
    const s = applyStudyDay(EMPTY_STREAK, "2024-04-01");
    const decayed = decayIfLapsed({ ...s, todayCompleted: false }, "2024-04-01");
    expect(decayed.todayCompleted).toBe(true);
    expect(decayed.currentStreak).toBe(1);
  });

  it("keeps the streak but clears todayCompleted one day later", () => {
    const s = applyStudyDay(EMPTY_STREAK, "2024-04-01");
    const decayed = decayIfLapsed(s, "2024-04-02");
    expect(decayed.currentStreak).toBe(1);
    expect(decayed.todayCompleted).toBe(false);
  });

  it("zeroes the current streak once two or more days lapse", () => {
    let s = applyStudyDay(EMPTY_STREAK, "2024-04-01");
    s = applyStudyDay(s, "2024-04-02"); // streak 2
    const decayed = decayIfLapsed(s, "2024-04-04");
    expect(decayed.currentStreak).toBe(0);
    expect(decayed.todayCompleted).toBe(false);
  });
});

describe("nextMilestone", () => {
  it("returns the first milestone strictly greater than the current streak", () => {
    expect(nextMilestone(0)).toBe(3);
    expect(nextMilestone(3)).toBe(7);
    expect(nextMilestone(99)).toBe(100);
  });

  it("returns null once the top milestone is reached", () => {
    expect(nextMilestone(STREAK_MILESTONES[STREAK_MILESTONES.length - 1])).toBeNull();
  });
});

describe("justReachedMilestone", () => {
  it("returns the newest milestone gained between two states", () => {
    const before: StreakState = { ...EMPTY_STREAK, milestonesReached: [3] };
    const after: StreakState = { ...EMPTY_STREAK, milestonesReached: [3, 7] };
    expect(justReachedMilestone(before, after)).toBe(7);
  });

  it("returns null when no milestone changed", () => {
    const same: StreakState = { ...EMPTY_STREAK, milestonesReached: [3] };
    expect(justReachedMilestone(same, same)).toBeNull();
  });
});
