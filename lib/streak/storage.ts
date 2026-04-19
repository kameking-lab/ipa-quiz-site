import {
  applyStudyDay,
  decayIfLapsed,
  EMPTY_STREAK,
  jstDateString,
  justReachedMilestone,
  type StreakMilestone,
  type StreakState,
} from "./core";

const STREAK_LS_KEY = "ipa-quiz:streak:v1";

function read(): StreakState {
  if (typeof window === "undefined") return EMPTY_STREAK;
  try {
    const raw = window.localStorage.getItem(STREAK_LS_KEY);
    if (!raw) return EMPTY_STREAK;
    const parsed = JSON.parse(raw) as Partial<StreakState>;
    return {
      currentStreak: Number.isFinite(parsed.currentStreak) ? (parsed.currentStreak as number) : 0,
      longestStreak: Number.isFinite(parsed.longestStreak) ? (parsed.longestStreak as number) : 0,
      lastStudyDate: typeof parsed.lastStudyDate === "string" ? parsed.lastStudyDate : null,
      todayCompleted: !!parsed.todayCompleted,
      milestonesReached: Array.isArray(parsed.milestonesReached)
        ? (parsed.milestonesReached.filter(
            (m) => typeof m === "number",
          ) as StreakMilestone[])
        : [],
    };
  } catch {
    return EMPTY_STREAK;
  }
}

function write(state: StreakState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STREAK_LS_KEY, JSON.stringify(state));
  } catch {
    // quota / disabled
  }
}

export function readStreak(): StreakState {
  return decayIfLapsed(read());
}

export function recordStudyToday(): {
  state: StreakState;
  reachedMilestone: StreakMilestone | null;
} {
  const before = decayIfLapsed(read());
  const after = applyStudyDay(before, jstDateString());
  write(after);
  return { state: after, reachedMilestone: justReachedMilestone(before, after) };
}

export function resetStreak(): void {
  write(EMPTY_STREAK);
}
