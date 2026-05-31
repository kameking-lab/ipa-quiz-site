import type { HistoryEntry } from "@/lib/storage/history";
import type { ExamCode } from "@/lib/questions/types";

export interface CategoryStat {
  category: string;
  attempts: number;
  correct: number;
  accuracy: number;
}

export interface ExamProgress {
  exam: ExamCode;
  attempts: number;
  correct: number;
  accuracy: number;
  uniqueAnswered: number;
}

/**
 * Aggregate accuracy by category.
 * questionLookup maps question ID → category, since the entry only has the ID.
 */
export function aggregateByCategory(
  entries: HistoryEntry[],
  questionLookup: Map<string, { category: string }>,
): CategoryStat[] {
  const map = new Map<string, { attempts: number; correct: number }>();
  for (const entry of entries) {
    const meta = questionLookup.get(entry.id);
    if (!meta) continue;
    const cur = map.get(meta.category) ?? { attempts: 0, correct: 0 };
    cur.attempts += 1;
    if (entry.correct) cur.correct += 1;
    map.set(meta.category, cur);
  }
  return [...map.entries()]
    .map(([category, v]) => ({
      category,
      attempts: v.attempts,
      correct: v.correct,
      accuracy: v.attempts ? v.correct / v.attempts : 0,
    }))
    .sort((a, b) => b.attempts - a.attempts);
}

export function aggregateByExam(
  entries: HistoryEntry[],
  questionLookup: Map<string, { exam: ExamCode }>,
): ExamProgress[] {
  const map = new Map<ExamCode, { attempts: number; correct: number; ids: Set<string> }>();
  for (const entry of entries) {
    const meta = questionLookup.get(entry.id);
    if (!meta) continue;
    const cur = map.get(meta.exam) ?? { attempts: 0, correct: 0, ids: new Set() };
    cur.attempts += 1;
    if (entry.correct) cur.correct += 1;
    cur.ids.add(entry.id);
    map.set(meta.exam, cur);
  }
  return [...map.entries()]
    .map(([exam, v]) => ({
      exam,
      attempts: v.attempts,
      correct: v.correct,
      accuracy: v.attempts ? v.correct / v.attempts : 0,
      uniqueAnswered: v.ids.size,
    }))
    .sort((a, b) => b.attempts - a.attempts);
}

/**
 * Estimate pass probability with a simple logistic model around current accuracy.
 * IPA passing line is roughly 60% — we anchor 0.6 = 50% probability.
 */
export function estimatePassProbability(currentAccuracy: number, attempts: number): number {
  if (attempts < 10) return Math.max(0, currentAccuracy * 0.4);
  const x = (currentAccuracy - 0.6) * 12;
  const sigmoid = 1 / (1 + Math.exp(-x));
  const confidence = Math.min(1, attempts / 200);
  return sigmoid * confidence + sigmoid * 0.5 * (1 - confidence);
}

/**
 * Estimate how many additional questions are needed to reach the target accuracy.
 * Optimistic: assumes future accuracy = currentAccuracy + steady improvement.
 */
export function estimateRequiredPractice(
  currentAccuracy: number,
  uniqueAnswered: number,
  targetAccuracy = 0.7,
  examPoolSize = 800,
): { questionsNeeded: number; hoursNeeded: number } {
  if (currentAccuracy >= targetAccuracy) {
    const remaining = Math.max(0, examPoolSize - uniqueAnswered);
    return {
      questionsNeeded: Math.min(100, remaining),
      hoursNeeded: Math.min(100, remaining) * 0.05,
    };
  }
  const gap = targetAccuracy - currentAccuracy;
  const questionsPerPercent = 50;
  const questionsNeeded = Math.ceil(gap * 100 * questionsPerPercent);
  const hoursNeeded = questionsNeeded * 0.05;
  return { questionsNeeded, hoursNeeded };
}

export function daysUntil(targetIso: string, now = Date.now()): number {
  const targetDay = Date.parse(`${targetIso.slice(0, 10)}T00:00:00Z`);
  if (!Number.isFinite(targetDay)) return 0;
  // Count whole calendar days in JST so the countdown flips at JST midnight.
  // Parsing a date-only string with `new Date()` yields UTC midnight, which made
  // the count one too high between JST 00:00 and 09:00 (e.g. exam-day morning showed
  // "あと1日" instead of "本日が試験日"). Normalize "today" to its JST date first.
  const todayJst = new Date(now + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const todayDay = Date.parse(`${todayJst}T00:00:00Z`);
  return Math.max(0, Math.round((targetDay - todayDay) / 86_400_000));
}

/**
 * Distribute remaining questions evenly over the days until the exam.
 * Floor of 5 questions/day, ceil at 80.
 */
export function dailyTargetQuestions(remaining: number, daysLeft: number): number {
  if (daysLeft <= 0) return remaining;
  const raw = Math.ceil(remaining / daysLeft);
  return Math.max(5, Math.min(80, raw));
}
