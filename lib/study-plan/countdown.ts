import { dayNumber, type ExamDateSource, type PacePlan } from "./pace";
import { estimateFromPreviousSession, type ExamScheduleSession } from "./schedule";

type Countdown = { date: string; days: number; basisYear?: number };
type RegistrationCountdown = Countdown & { kind: "start" | "deadline" };

export function dateCountdown(date: string | null | undefined, today: string, basisYear?: number): Countdown | null {
  const day = date ? dayNumber(date) : null;
  const current = dayNumber(today);
  if (!date || day === null || current === null || day < current) return null;
  return { date, days: day - current, basisYear };
}

export function registrationTiming(
  start: string | null | undefined, deadline: string | null | undefined, today: string, basisYear?: number,
): { state: "before" | "open" | "closed" | "unknown"; countdown: RegistrationCountdown | null } {
  if (deadline && dayNumber(deadline) !== null && deadline < today) return { state: "closed", countdown: null };
  const opening = dateCountdown(start, today, basisYear);
  if (opening && opening.days > 0) return { state: "before", countdown: { ...opening, kind: "start" } };
  const closing = dateCountdown(deadline, today, basisYear);
  const open = opening?.days === 0 || (closing && start && dayNumber(start) !== null && start <= today);
  return { state: open ? "open" : "unknown", countdown: closing && { ...closing, kind: "deadline" } };
}

export function hasSingleExamDay(session: ExamScheduleSession) {
  return !!session.examDate && session.datePrecision !== "month" && session.datePrecision !== "unknown" &&
    !session.examPhaseWindows?.length && (!session.examDateEnd || session.examDateEnd === session.examDate);
}

export function isOfficialSession(session: ExamScheduleSession) {
  return session.scheduleStatus === "official" && !session.unannounced && !!session.sourceUrl;
}

export function isProvisionalExamDate(source: ExamDateSource | undefined) {
  return source === "tentative" || source === "estimated";
}

export function withConfirmedExamDay(plan: PacePlan, today: string, session?: ExamScheduleSession): PacePlan {
  if (plan.result || (plan.examDate && !isProvisionalExamDate(plan.examDateSource)) ||
    !session || session.id !== plan.sessionId || !isOfficialSession(session) || !hasSingleExamDay(session)) return plan;
  const examDate = session.examDate;
  if (!examDate || dayNumber(examDate) === null || (!plan.examDate && !dateCountdown(examDate, today))) return plan;
  return { ...plan, examDate, examDateSource: "official" };
}

export function sessionCountdownDates(session: ExamScheduleSession, sessions: readonly ExamScheduleSession[]) {
  const official = isOfficialSession(session);
  const uncertainExam = session.scheduleStatus !== "ondemand" && (!official || !session.examDate ||
    session.datePrecision === "month" || session.datePrecision === "unknown");
  const uncertainApplication = !official || session.applicationEstimated;
  const estimate = uncertainExam || uncertainApplication ? estimateFromPreviousSession(session, sessions) : null;
  return {
    examDate: uncertainExam ? estimate?.examDate : official && hasSingleExamDay(session) ? session.examDate : null,
    examBasisYear: uncertainExam && estimate?.examDate ? estimate.basisYear : undefined,
    applicationStart: uncertainApplication ? estimate?.applicationStart : session.applicationStart,
    applicationDeadline: uncertainApplication ? estimate?.applicationDeadline : session.applicationDeadline,
    applicationBasisYear: uncertainApplication && (estimate?.applicationStart || estimate?.applicationDeadline) ? estimate.basisYear : undefined,
  };
}

export function planCountdownDates(plan: PacePlan, session?: ExamScheduleSession, sessions: readonly ExamScheduleSession[] = []) {
  const dates = session && sessionCountdownDates(session, sessions);
  const registration = plan.registration?.estimated ? undefined : plan.registration;
  const application = session?.scheduleStatus === "ondemand" ? undefined : dates ?? {
    applicationStart: registration?.start, applicationDeadline: registration?.deadline, applicationBasisYear: undefined,
  };
  let examDateSource = plan.examDateSource;
  if (!plan.examDate && dates?.examDate) examDateSource = dates.examBasisYear === undefined ? "official" : "estimated";
  return {
    examDate: plan.examDate ?? dates?.examDate,
    examBasisYear: plan.examDate ? undefined : dates?.examBasisYear,
    examDateSource,
    applicationStart: application?.applicationStart,
    applicationDeadline: application?.applicationDeadline,
    applicationBasisYear: application?.applicationBasisYear,
  };
}
