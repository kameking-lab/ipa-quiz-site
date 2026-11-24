import { dateCountdown, planCountdownDates, registrationTiming } from "./countdown";
import { dayNumber, type AnswerAttempt, type ExamDateSource, type PacePlan } from "./pace";
import type { ExamScheduleSession } from "./schedule";

type CalendarDate = { date: string; basisYear?: number };
type ExamCountdown = CalendarDate & { kind: "exam"; days: number; examDateSource?: ExamDateSource };

export type HomeCalendar = {
  primary: ExamCountdown | (CalendarDate & { kind: "start" | "deadline"; days: number });
  secondary: ExamCountdown | (CalendarDate & { kind: "deadline" }) | { kind: "registered" } | null;
};

export function homeCalendar(plan: PacePlan, today: string, sessions: readonly ExamScheduleSession[] = []): HomeCalendar | null {
  if (plan.result || (plan.examDate && plan.examDate < today)) return null;
  const session = sessions.find(item => item.id === plan.sessionId);
  const { examDate, examBasisYear, examDateSource,
    applicationStart: start, applicationDeadline: deadline, applicationBasisYear: basisYear } = planCountdownDates(plan, session, sessions);
  if (examDate && dayNumber(examDate) !== null && examDate < today) return null;
  const exam = dateCountdown(examDate, today, examBasisYear);
  const examTarget = exam && { ...exam, kind: "exam" as const, examDateSource };

  const closing = dateCountdown(deadline, today, basisYear);
  const deadlineDate = closing && { kind: "deadline" as const, date: closing.date, basisYear };
  const registration = !plan.registered
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
