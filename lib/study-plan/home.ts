import { calculatePace, dayNumber, type AnswerAttempt, type PacePlan } from "./pace";

export interface PaceOffer { shownOn?: string; dismissedOn?: string }
export function deadlineWarning(plan: PacePlan, today: string) {
  const deadline = plan.registration?.deadline;
  if (plan.registered || !deadline) return null;
  const remaining = dayNumber(deadline)! - dayNumber(today)!;
  return remaining >= 0 && remaining <= 14 ? { remaining, urgency: remaining <= 1 ? "urgent" : remaining <= 7 ? "soon" : "notice" } : null;
}
export function shouldShowPaceOffer(plan: PacePlan, attempts: readonly AnswerAttempt[], today: string, paid: boolean, offer: PaceOffer) {
  const pace = calculatePace(plan, attempts, today);
  return !paid && pace.judgment === "behind" && (pace.requiredQuestionsPerDay ?? 0) > 10 &&
    offer.shownOn !== today && (!offer.dismissedOn || dayNumber(today)! - dayNumber(offer.dismissedOn)! >= 7);
}
/** Counts answers, not passive page time. Mirrored legacy/action attempts count once. */
export function answersToday(attempts: readonly AnswerAttempt[], today: string, ids?: ReadonlySet<string>) {
  const start = Date.parse(`${today}T00:00:00+09:00`);
  return new Set(attempts.filter(a => a.at >= start && a.at < start + 86_400_000 && (!ids || ids.has(a.id)))
    .map(a => `${a.id}:${Math.floor(a.at / 1000)}`)).size;
}
/** Freeze the day's target before today's answers so returning cannot shrink it. */
export function todayQuestionGoal(plan: PacePlan, attempts: readonly AnswerAttempt[], today: string) {
  const start = Date.parse(`${today}T00:00:00+09:00`);
  const pace = calculatePace(plan, attempts.filter(a => a.at < start), today);
  return Math.max(1, pace.requiredQuestionsPerDay ?? 10);
}
