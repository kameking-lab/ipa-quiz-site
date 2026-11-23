import { dateCountdown, registrationTiming, sessionCountdownDates } from "./countdown";
import { dayNumber, type AnswerAttempt, type PacePlan } from "./pace";
import type { ExamScheduleSession } from "./schedule";

type CalendarDate = { kind: "start" | "deadline" | "exam"; date: string; basisYear?: number };

export type HomeCalendar = {
  primary: CalendarDate & { days: number };
  secondary: CalendarDate | { kind: "registered" } | null;
};

export function homeCalendar(plan: PacePlan, today: string, sessions: readonly ExamScheduleSession[] = []): HomeCalendar | null {
  if (plan.result || (plan.examDate && plan.examDate < today)) return null;
  const session = sessions.find(item => item.id === plan.sessionId);
  const dates = session && sessionCountdownDates(session, sessions);
  const examDate = plan.examDate ?? dates?.examDate;
  if (examDate && dayNumber(examDate) !== null && examDate < today) return null;
  const exam = dateCountdown(examDate, today, plan.examDate ? undefined : dates?.examBasisYear);
  const examTarget = exam && { ...exam, kind: "exam" as const };

  const savedRegistration = plan.registration?.estimated ? null : plan.registration;
  const start = dates ? dates.applicationStart : savedRegistration?.start;
  const deadline = dates ? dates.applicationDeadline : savedRegistration?.deadline;
  const basisYear = dates?.applicationBasisYear;
  const hasRegistration = session?.scheduleStatus !== "ondemand";
  const deadlineDate: CalendarDate | null = hasRegistration && deadline && dayNumber(deadline) !== null
    ? { kind: "deadline", date: deadline, basisYear }
    : null;
  const registration = hasRegistration && !plan.registered
    ? registrationTiming(start, deadline, today, basisYear).countdown
    : null;

  if (examTarget?.days === 0 || !registration) {
    return examTarget ? { primary: examTarget, secondary: plan.registered ? { kind: "registered" } : deadlineDate } : null;
  }
  return { primary: registration, secondary: examTarget ?? (registration.kind === "start" ? deadlineDate : null) };
}

/** Counts answers, not passive page time. Mirrored legacy/action attempts count once. */
export function answersToday(attempts: readonly AnswerAttempt[], today: string, ids?: ReadonlySet<string>) {
  const start = Date.parse(`${today}T00:00:00+09:00`);
  return new Set(attempts.filter(a => a.at >= start && a.at < start + 86_400_000 && (!ids || ids.has(a.id)))
    .map(a => `${a.id}:${Math.floor(a.at / 1000)}`)).size;
}
