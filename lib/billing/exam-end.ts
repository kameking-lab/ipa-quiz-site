import { dayNumber, type PacePlan } from "@/lib/study-plan/pace";
import type { ExamScheduleSession } from "@/lib/study-plan/schedule";
import { jstDateString } from "@/lib/streak/core";

export function nextJstDate(date: string): string {
  return new Date(Date.parse(`${date}T00:00:00Z`) + 86_400_000).toISOString().slice(0, 10);
}

export function examDateBeforeEnd(endAt: number): string {
  return jstDateString(new Date(endAt * 1000 - 86_400_000));
}

export const examDateLabel = (date: string) => `${Number(date.slice(5, 7))}月${Number(date.slice(8, 10))}日`;

export function examEndCanBeBooked(endAt: number, now: Date) {
  return Number.isSafeInteger(endAt) && endAt * 1000 > now.getTime() + 31 * 60_000;
}

export function firstCheckoutExamDate(now: Date) {
  const today = jstDateString(now);
  const midnight = Date.parse(`${nextJstDate(today)}T00:00:00+09:00`) / 1000;
  return examEndCanBeBooked(midnight, now) ? today : nextJstDate(today);
}

export function examEndTimestamp(date: string, now: Date): number | null {
  if (dayNumber(date) === null || date < firstCheckoutExamDate(now)) return null;
  return Date.parse(`${nextJstDate(date)}T00:00:00+09:00`) / 1000;
}

export function memberExamEndTimestamp(date: string, now: Date): number | null {
  if (dayNumber(date) === null || date < jstDateString(now) || date >= "9999-12-31") return null;
  return Date.parse(`${nextJstDate(date)}T00:00:00+09:00`) / 1000;
}

export type ExamDatePlan = Pick<PacePlan, "exam" | "examDate" | "result"> & Partial<Pick<PacePlan, "updatedAt">>;
export function datedPlan(plans: readonly ExamDatePlan[], today: string, exam?: string | null) {
  const upcoming = plans.filter(plan => !plan.result && plan.examDate && plan.examDate >= today);
  return upcoming.find(plan => plan.exam === exam) ?? upcoming[0];
}

export function publishedExamSessions(sessions: readonly ExamScheduleSession[], today: string, exam?: string) {
  const finalStage = exam === "denko1" || exam === "denko2";
  const skillsLabel = /技能試験|(?:^|[・\s])技能(?:[（(・\s]|$)/u;
  return sessions.flatMap(session => {
    if (session.scheduleStatus !== "official" || !session.sourceUrl) return [];
    if (finalStage && !skillsLabel.test(session.label)) {
      const sourceUrl = session.sourceUrl;
      return (session.examPhaseWindows ?? []).flatMap((phase, i) => /技能/u.test(phase.label) && phase.start === phase.end && phase.start >= today
        ? [{ key: `${session.qualificationId}:${session.id}:phase-${i}`, date: phase.start, label: `${session.label} · ${phase.label}`, sourceUrl }]
        : []);
    }
    if (!session.examDate || session.examDate < today || session.examDateEnd && session.examDateEnd !== session.examDate) return [];
    const label = session.label.replace(/\s*[（(・]?\s*試験地指定日(?:[：:\s]|$).*$/u, "").trim();
    return [{ key: `${session.qualificationId}:${session.id}`, date: session.examDate, label: label || session.label, sourceUrl: session.sourceUrl }];
  }).sort((a, b) => a.date.localeCompare(b.date));
}

export function defaultPublishedExamDate(choices: ReturnType<typeof publishedExamSessions>) {
  const first = choices[0];
  return first && !choices.some(choice => choice.label === first.label && choice.date !== first.date) ? first : undefined;
}
