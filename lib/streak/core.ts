export const STREAK_MILESTONES = [3, 7, 14, 30, 100] as const;
export type StreakMilestone = (typeof STREAK_MILESTONES)[number];

export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  todayCompleted: boolean;
  milestonesReached: StreakMilestone[];
}

export const EMPTY_STREAK: StreakState = {
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: null,
  todayCompleted: false,
  milestonesReached: [],
};

export function jstDateString(d: Date = new Date()): string {
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function diffInJstDays(a: string, b: string): number {
  const aDate = Date.parse(`${a}T00:00:00Z`);
  const bDate = Date.parse(`${b}T00:00:00Z`);
  return Math.round((bDate - aDate) / (24 * 60 * 60 * 1000));
}

export function applyStudyDay(state: StreakState, today: string = jstDateString()): StreakState {
  if (state.lastStudyDate === today) {
    return { ...state, todayCompleted: true };
  }

  let nextStreak: number;
  if (!state.lastStudyDate) {
    nextStreak = 1;
  } else {
    const diff = diffInJstDays(state.lastStudyDate, today);
    nextStreak = diff === 1 ? state.currentStreak + 1 : 1;
  }

  const nextLongest = Math.max(state.longestStreak, nextStreak);
  const hit = STREAK_MILESTONES.filter(
    (m) => nextStreak >= m && !state.milestonesReached.includes(m),
  );

  return {
    currentStreak: nextStreak,
    longestStreak: nextLongest,
    lastStudyDate: today,
    todayCompleted: true,
    milestonesReached: [...state.milestonesReached, ...hit].sort((a, b) => a - b),
  };
}

export function decayIfLapsed(state: StreakState, today: string = jstDateString()): StreakState {
  if (!state.lastStudyDate) return state;
  const diff = diffInJstDays(state.lastStudyDate, today);
  if (diff === 0) return { ...state, todayCompleted: true };
  if (diff === 1) return { ...state, todayCompleted: false };
  return { ...state, currentStreak: 0, todayCompleted: false };
}

export function nextMilestone(current: number): StreakMilestone | null {
  return STREAK_MILESTONES.find((m) => m > current) ?? null;
}

export function justReachedMilestone(
  before: StreakState,
  after: StreakState,
): StreakMilestone | null {
  const newly = after.milestonesReached.filter(
    (m) => !before.milestonesReached.includes(m),
  );
  if (newly.length === 0) return null;
  return newly[newly.length - 1];
}
