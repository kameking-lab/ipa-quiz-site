import { dateCountdown, registrationTiming, sessionCountdownDates } from "./countdown";
import type { AnswerAttempt, PacePlan } from "./pace";
import type { ExamScheduleSession } from "./schedule";

export function deadlineWarning(plan: PacePlan, today: string) {
  if (plan.registered) return null;
  const application = registrationTiming(plan.registration?.start, plan.registration?.deadline, today).countdown;
  if (application?.kind !== "deadline" || application.days > 14) return null;
  const remaining = application.days;
  return { remaining, urgency: remaining <= 1 ? "urgent" : remaining <= 7 ? "soon" : "notice" };
}

export function homeCountdowns(plan: PacePlan, today: string, sessions: readonly ExamScheduleSession[] = []) {
  const none = { exam: null, registration: null };
  if (plan.result) return none;
  const session = sessions.find(item => item.id === plan.sessionId);
  const dates = session && sessionCountdownDates(session, sessions);
  const plannedDate = !session && plan.registration?.estimated ? null : plan.examDate;
  const exam = dateCountdown(dates?.uncertainExam ? dates.examDate : plannedDate ?? dates?.examDate,
    today, dates?.examBasisYear);
  if (plan.registered || session?.scheduleStatus === "ondemand") return { exam, registration: null };
  const registration = dates || !plan.registration?.estimated
    ? registrationTiming(dates ? dates.applicationStart : plan.registration?.start,
      dates ? dates.applicationDeadline : plan.registration?.deadline, today, dates?.applicationBasisYear).countdown
    : null;
  return { exam, registration };
}

/** Counts answers, not passive page time. Mirrored legacy/action attempts count once. */
export function answersToday(attempts: readonly AnswerAttempt[], today: string, ids?: ReadonlySet<string>) {
  const start = Date.parse(`${today}T00:00:00+09:00`);
  return new Set(attempts.filter(a => a.at >= start && a.at < start + 86_400_000 && (!ids || ids.has(a.id)))
    .map(a => `${a.id}:${Math.floor(a.at / 1000)}`)).size;
}
