import { dayNumber, type AnswerAttempt, type PacePlan } from "./pace";
import { estimateFromPreviousSession, type ExamScheduleSession } from "./schedule";

type Countdown = { date: string; days: number; basisYear?: number };
type RegistrationCountdown = Countdown & { kind: "start" | "deadline" };

function daysUntil(date: string, today: string) {
  const day = dayNumber(date);
  const current = dayNumber(today);
  return day === null || current === null ? -1 : day - current;
}

function countdown(date: string | null | undefined, today: string, basisYear?: number): Countdown | null {
  if (!date) return null;
  const days = daysUntil(date, today);
  return days < 0 ? null : { date, days, basisYear };
}

function registrationCountdown(
  start: string | null | undefined, deadline: string | null | undefined, today: string, basisYear?: number,
): RegistrationCountdown | null {
  if (deadline && daysUntil(deadline, today) < 0) return null;
  const opening = countdown(start, today, basisYear);
  if (opening && opening.days > 0) return { ...opening, kind: "start" };
  const closing = countdown(deadline, today, basisYear);
  return closing && { ...closing, kind: "deadline" };
}

export function deadlineWarning(plan: PacePlan, today: string) {
  if (plan.registered) return null;
  const application = registrationCountdown(plan.registration?.start, plan.registration?.deadline, today);
  if (application?.kind !== "deadline" || application.days > 14) return null;
  const remaining = application.days;
  return { remaining, urgency: remaining <= 1 ? "urgent" : remaining <= 7 ? "soon" : "notice" };
}

export function homeCountdowns(plan: PacePlan, today: string, sessions: readonly ExamScheduleSession[] = []) {
  const none = { exam: null, registration: null };
  if (plan.result) return none;
  const session = sessions.find(item => item.id === plan.sessionId);
  const uncertainExam = session && session.scheduleStatus !== "ondemand" && (
    session.scheduleStatus !== "official" || !session.examDate ||
    session.datePrecision === "month" || session.datePrecision === "unknown"
  );
  const uncertainApplication = session
    ? session.scheduleStatus !== "official" || session.applicationEstimated
    : plan.registration?.estimated;
  const estimate = session && (uncertainExam || uncertainApplication) ? estimateFromPreviousSession(session, sessions) : null;
  const singleExamDay = session?.scheduleStatus === "official" && !session.examPhaseWindows?.length &&
    (!session.examDateEnd || session.examDateEnd === session.examDate) ? session.examDate : null;
  const plannedDate = plan.examDate ?? singleExamDay;
  const exam = uncertainExam
    ? countdown(estimate?.examDate, today, estimate?.basisYear)
    : countdown(!session && plan.registration?.estimated ? null : plannedDate, today);
  if (plan.registered || session?.scheduleStatus === "ondemand") return { exam, registration: null };
  const registration = uncertainApplication
    ? registrationCountdown(estimate?.applicationStart, estimate?.applicationDeadline, today, estimate?.basisYear)
    : registrationCountdown(session ? session.applicationStart : plan.registration?.start,
      session ? session.applicationDeadline : plan.registration?.deadline, today);
  return { exam, registration };
}

/** Counts answers, not passive page time. Mirrored legacy/action attempts count once. */
export function answersToday(attempts: readonly AnswerAttempt[], today: string, ids?: ReadonlySet<string>) {
  const start = Date.parse(`${today}T00:00:00+09:00`);
  return new Set(attempts.filter(a => a.at >= start && a.at < start + 86_400_000 && (!ids || ids.has(a.id)))
    .map(a => `${a.id}:${Math.floor(a.at / 1000)}`)).size;
}
