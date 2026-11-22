import { dayNumber, EVERY_DAY, type AnswerAttempt, type PacePlan } from "@/lib/study-plan/pace";

export const DEFAULT_STUDY_REMINDER_TIME = "20:00";
export const FIRST_STUDY_REMINDER_ID = 12000;
const NOTIFICATION_LIMIT = 64;
const MS_PER_DAY = 86_400_000;
const STUDY_HORIZON_DAYS = 14;
const REMINDER_KIND = "study-plan";

export interface StudyReminderPlan {
  id: string;
  examDate: string;
  startDate: string;
  weekdays: readonly number[];
  remaining: number;
}

export interface StudyReminderSetting {
  id: string;
  time: string;
  plan: StudyReminderPlan | null;
}

export interface StudyReminderNotification {
  id: number;
  title: string;
  body: string;
  schedule: { at: Date; repeats: false };
  extra: { kind: typeof REMINDER_KIND; planId: string };
}

export function isStudyReminderTime(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function localDay(now: Date) {
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / MS_PER_DAY;
}

export function canRemindForPlan(plan: Pick<PacePlan, "examDate" | "result">, now = new Date()) {
  const exam = plan.examDate && dayNumber(plan.examDate);
  return typeof exam === "number" && exam >= localDay(now) && !plan.result;
}

export function studyReminderPlan(plan: PacePlan, latest: ReadonlyMap<string, AnswerAttempt>, now: Date): StudyReminderPlan | null {
  if (!plan.examDate || !canRemindForPlan(plan, now)) return null;
  const remaining = [...new Set(plan.range.questionIds)].filter(id => latest.get(id)?.correct !== true).length;
  return { id: plan.id, examDate: plan.examDate, startDate: plan.startDate, weekdays: plan.studyWeekdays ?? EVERY_DAY, remaining };
}

function weekday(day: number) {
  return new Date(day * MS_PER_DAY).getUTCDay();
}

function studyDaysUntil(start: number, end: number, weekdays: readonly number[]) {
  const days = Math.max(0, end - start);
  let count = Math.floor(days / 7) * weekdays.length;
  for (let offset = 0; offset < days % 7; offset++) {
    if (weekdays.includes(weekday(start + offset))) count++;
  }
  return count;
}

/** Use the device's local clock, including across daylight-saving changes. */
export function studyReminderNotifications(settings: readonly StudyReminderSetting[], now: Date, otherPending = 0): StudyReminderNotification[] {
  const today = localDay(now);
  const until = new Date(now);
  until.setDate(until.getDate() + STUDY_HORIZON_DAYS);
  const candidates: Omit<StudyReminderNotification, "id">[] = [];
  for (const { plan, time } of settings) {
    if (!plan || !isStudyReminderTime(time)) continue;
    const exam = dayNumber(plan.examDate);
    const start = dayNumber(plan.startDate);
    if (exam === null || start === null || exam <= today) continue;
    const [hour, minute] = time.split(":").map(Number);
    const todayAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
    const days = studyDaysUntil(Math.max(start, today + (todayAt <= now ? 1 : 0)), exam, plan.weekdays);
    const target = days > 0 ? Math.ceil(plan.remaining / days) : 0;
    for (let day = today; day <= today + STUDY_HORIZON_DAYS && day < exam; day++) {
      const date = new Date(day * MS_PER_DAY);
      const at = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour, minute);
      if (at <= now || at > until) continue;
      const extra = { kind: REMINDER_KIND, planId: plan.id } as const;
      const schedule = { at, repeats: false } as const;
      const untilExam = exam - day;
      if (untilExam === 7 || untilExam === 1) {
        candidates.push({ title: "過去問AIの学習計画", body: untilExam === 7 ? "試験まであと7日。" : "明日は試験です。", schedule, extra });
      }
      if (day < start || !plan.weekdays.includes(weekday(day))) continue;
      const body = target > 0 ? `今日の目安 ${target}問。チワワが待ってます` : "チワワが待ってます。学習計画を確認しましょう";
      candidates.push({ title: "過去問AIの学習計画", body, schedule, extra });
    }
  }
  // Leave one slot for the existing daily review notification, even if it is currently off.
  const available = Math.max(0, NOTIFICATION_LIMIT - Math.max(1, otherPending));
  return candidates.sort((a, b) => a.schedule.at.getTime() - b.schedule.at.getTime())
    .slice(0, available).map((item, index) => ({ id: FIRST_STUDY_REMINDER_ID + index, ...item }));
}

export function isStudyReminderId(id: number) {
  return Number.isInteger(id) && id >= FIRST_STUDY_REMINDER_ID && id < FIRST_STUDY_REMINDER_ID + NOTIFICATION_LIMIT - 1;
}

export function studyReminderTap(actionId: string, notification: { id: number; extra?: unknown }) {
  const extra = notification.extra;
  if (actionId !== "tap" || !isStudyReminderId(notification.id) || !extra || typeof extra !== "object" ||
    !("kind" in extra) || extra.kind !== REMINDER_KIND || !("planId" in extra) || typeof extra.planId !== "string" || !extra.planId) return null;
  return { planId: extra.planId, path: `/quiz/today?${new URLSearchParams({ plan: extra.planId })}` };
}
