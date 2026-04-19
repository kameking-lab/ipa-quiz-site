export {
  STREAK_MILESTONES,
  type StreakMilestone,
  type StreakState,
  EMPTY_STREAK,
  jstDateString,
  applyStudyDay,
  decayIfLapsed,
  nextMilestone,
  justReachedMilestone,
} from "./core";

export { readStreak, recordStudyToday, resetStreak } from "./storage";
