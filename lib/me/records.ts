import type { HistoryEntry } from "@/lib/storage/history";
import { dateForEntry, generateDayRange, rebuildHeatmapFromHistory } from "@/lib/motivation/heatmap";
import { applyStudyDay, decayIfLapsed, EMPTY_STREAK, jstDateString } from "@/lib/streak/core";
import { EXAM_LABELS } from "@/lib/utils";
import { MINUTES_PER_QUESTION } from "@/lib/study-plan/constants";
import { dailyLearningPoints, type LearningAction } from "@/lib/study-plan/activity";

const examKeys = Object.keys(EXAM_LABELS).sort((a, b) => b.length - a.length);
export function recordExam(id: string): string | null {
  const automotive = /^jidosha-20\d{2}-(?:first|second)-(.+)-q\d+$/.exec(id);
  if (automotive && Object.hasOwn(EXAM_LABELS, `jidosha-${automotive[1]}`)) return `jidosha-${automotive[1]}`;
  return examKeys.find(key => id.startsWith(`${key}-`)) ?? null;
}

/** Legacy history has no elapsed time. Use the existing three-minute standard;
 * rapid consecutive submissions never add learning points. */
export function studyMinutesFromHistory(entries: readonly HistoryEntry[]): number {
  let previous = -Infinity, minutes = 0;
  for (const entry of [...entries].sort((a, b) => a.at - b.at)) {
    if (!Number.isFinite(entry.at)) continue;
    if (entry.at - previous >= 5000) minutes += MINUTES_PER_QUESTION;
    previous = entry.at;
  }
  return minutes;
}

export interface StudyRecord {
  date: string;
  exam: string | null;
  entries: HistoryEntry[];
  correct: number;
}

/** Existing date-based planner fallback until kp's meter is integrated. A plan
 * without a dated question schedule does not invent a pace verdict. */
export function plannedPaceBehind(plans: unknown, entries: HistoryEntry[], exam: string, now: Date, metadata: Readonly<Record<string, string>> = {}): boolean | undefined {
  if (!Array.isArray(plans)) return undefined;
  const today = jstDateString(now);
  const candidates = plans.filter((plan: unknown): plan is { createdAt: string; input: { exam: string }; daily: unknown[] } => {
    if (!plan || typeof plan !== "object" || !("createdAt" in plan) || typeof plan.createdAt !== "string" || !("daily" in plan) || !Array.isArray(plan.daily) || !("input" in plan)) return false;
    return !!plan.input && typeof plan.input === "object" && "exam" in plan.input && plan.input.exam === exam && Number.isFinite(Date.parse(plan.createdAt));
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const plan = candidates[0];
  if (!plan) return undefined;
  let expected = 0;
  for (const day of plan.daily) {
    if (!day || typeof day !== "object" || !("date" in day) || typeof day.date !== "string" || day.date > today || !("tasks" in day) || !Array.isArray(day.tasks)) continue;
    for (const task of day.tasks) if (task && typeof task === "object" && "kind" in task && ["questions", "review", "mock"].includes(String(task.kind)) && "estimatedMinutes" in task && typeof task.estimatedMinutes === "number" && Number.isFinite(task.estimatedMinutes)) expected += Math.max(0, task.estimatedMinutes);
  }
  if (expected === 0) return undefined;
  const started = Date.parse(plan.createdAt);
  const actual = studyMinutesFromHistory(entries.filter(entry => entry.at >= started && entry.at <= now.getTime() && (metadata[entry.id] ?? recordExam(entry.id)) === exam));
  return actual < expected * 0.95;
}

export function buildMeRecords(history: HistoryEntry[], savedDays: Record<string, number>, now = new Date(), metadata: Readonly<Record<string, string>> = {}, actions: readonly LearningAction[] = []) {
  const today = jstDateString(now);
  const entries = history.filter(entry => Number.isFinite(entry.at) && entry.at >= 0 && entry.at <= now.getTime());
  const activity = actions.filter(action => action.at >= 0 && action.at <= now.getTime());
  const points = dailyLearningPoints(activity);
  // The player writes the same answer to both stores. Match within its JST day
  // and keep the original selected choice when the detailed history survives.
  const answerKey = (id: string, at: number, correct: boolean) => JSON.stringify([dateForEntry(at), id, correct]);
  const mirrors = new Map<string, number>();
  for (const entry of entries) {
    const key = answerKey(entry.id, entry.at, entry.correct);
    mirrors.set(key, (mirrors.get(key) ?? 0) + 1);
  }
  const actionExams: Record<string, string> = {};
  for (const action of activity) {
    if (action.kind !== "answer" || typeof action.correct !== "boolean") continue;
    actionExams[action.questionId] = action.exam;
    const key = answerKey(action.questionId, action.at, action.correct);
    const remaining = mirrors.get(key) ?? 0;
    if (remaining) mirrors.set(key, remaining - 1);
    else entries.push({ id: action.questionId, at: action.at, correct: action.correct, selected: "" });
  }
  const legacy = entries.filter(entry => {
    const key = answerKey(entry.id, entry.at, entry.correct);
    const remaining = mirrors.get(key) ?? 0;
    if (!remaining) return false;
    mirrors.set(key, remaining - 1);
    return true;
  });
  const byDate = rebuildHeatmapFromHistory(entries);
  // History retains only 2,000 answers. Never rebuild the persisted lifetime
  // heatmap here: doing so would discard older study days and shrink totals.
  for (const [date, count] of Object.entries(savedDays)) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date) && date <= today && Number.isSafeInteger(count) && count > 0)
      byDate[date] = Math.max(byDate[date] ?? 0, count);
  }
  const dates = Object.keys(byDate).filter(date => byDate[date] > 0).sort();
  const total = dates.reduce((sum, date) => sum + byDate[date], 0);
  const days = dates.length;
  const minutes = points.reduce((sum, day) => sum + day.minutes, 0) +
    studyMinutesFromHistory(legacy) + Math.max(0, total - entries.length) * MINUTES_PER_QUESTION;
  const learningDays = new Set([...dates, ...points.map(day => day.date)]).size;
  let streak = { ...EMPTY_STREAK };
  for (const date of dates) streak = applyStudyDay(streak, date);
  const records = new Map<string, StudyRecord>();
  for (const entry of entries) {
    const date = dateForEntry(entry.at), exam = metadata[entry.id] ?? actionExams[entry.id] ?? recordExam(entry.id);
    const key = JSON.stringify([date, exam]);
    const record = records.get(key) ?? { date, exam, entries: [], correct: 0 };
    record.entries.push(entry); record.correct += Number(entry.correct); records.set(key, record);
  }
  return {
    total, minutes, averageQuestions: days ? total / days : 0, averageMinutes: learningDays ? minutes / learningDays : 0,
    streak: decayIfLapsed(streak, today).currentStreak,
    calendar: generateDayRange(84, now).map(date => ({ date, count: byDate[date] ?? 0 })),
    records: [...records.values()].sort((a, b) => b.date.localeCompare(a.date) || (a.exam ?? "").localeCompare(b.exam ?? "")),
  };
}
