import type { HistoryEntry } from "@/lib/storage/history";
import { dateForEntry, generateDayRange, rebuildHeatmapFromHistory } from "@/lib/motivation/heatmap";
import { applyStudyDay, decayIfLapsed, EMPTY_STREAK, jstDateString } from "@/lib/streak/core";
import { EXAM_LABELS } from "@/lib/utils";
import { MINUTES_PER_QUESTION } from "@/lib/study-plan/constants";

const examKeys = Object.keys(EXAM_LABELS).sort((a, b) => b.length - a.length);
export function recordExam(id: string): string | null {
  const automotive = /^jidosha-20\d{2}-(?:first|second)-(.+)-q\d+$/.exec(id);
  if (automotive && Object.hasOwn(EXAM_LABELS, `jidosha-${automotive[1]}`)) return `jidosha-${automotive[1]}`;
  return examKeys.find(key => id.startsWith(`${key}-`)) ?? null;
}

/** Legacy history has no elapsed time. Use the existing three-minute standard;
 * rapid consecutive submissions never add learning points. Replace this adapter
 * with the kp-1 action ledger when the branches are integrated. */
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

export function buildMeRecords(history: HistoryEntry[], savedDays: Record<string, number>, now = new Date(), metadata: Readonly<Record<string, string>> = {}) {
  const today = jstDateString(now);
  const entries = history.filter(entry => Number.isFinite(entry.at) && entry.at >= 0 && entry.at <= now.getTime());
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
  const minutes = studyMinutesFromHistory(entries) + Math.max(0, total - entries.length) * MINUTES_PER_QUESTION;
  let streak = { ...EMPTY_STREAK };
  for (const date of dates) streak = applyStudyDay(streak, date);
  const records = new Map<string, StudyRecord>();
  for (const entry of entries) {
    const date = dateForEntry(entry.at), exam = metadata[entry.id] ?? recordExam(entry.id);
    const key = JSON.stringify([date, exam]);
    const record = records.get(key) ?? { date, exam, entries: [], correct: 0 };
    record.entries.push(entry); record.correct += Number(entry.correct); records.set(key, record);
  }
  return {
    total, minutes, averageQuestions: days ? total / days : 0, averageMinutes: days ? minutes / days : 0,
    streak: decayIfLapsed(streak, today).currentStreak,
    calendar: generateDayRange(84, now).map(date => ({ date, count: byDate[date] ?? 0 })),
    records: [...records.values()].sort((a, b) => b.date.localeCompare(a.date) || (a.exam ?? "").localeCompare(b.exam ?? "")),
  };
}
