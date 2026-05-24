import type { ExamCode } from "@/lib/questions/types";
import type { HistoryEntry } from "@/lib/storage/history";

/** Minimal question metadata needed for analytics (avoids bundling full Question data). */
export interface QuestionMeta {
  id: string;
  category: string;
  exam: ExamCode;
}

export interface CategoryStat {
  category: string;
  answered: number;
  correct: number;
  accuracy: number;
}

export interface ExamPassProbability {
  exam: ExamCode;
  answered: number;
  accuracy: number;
  passProbability: number;
  questionsToPassZone: number;
  /**
   * True once at least PROB_MIN_SAMPLE answers have been recorded for the
   * exam. Below the threshold, consumers should hide the percentage and
   * surface a "計測中" placeholder instead — see UX review v2 #3: n=1
   * answer producing a 61% estimate is misleading either way.
   */
  enoughSample: boolean;
  /** How many more answers are needed to cross PROB_MIN_SAMPLE. 0 once met. */
  answersUntilSample: number;
}

const PASS_ACCURACY = 0.6;
const PASS_SAMPLE = 60;

/** Below this many answers, the predicted pass rate is hidden behind a
 * "計測中" placeholder so a tiny sample doesn't read as a real estimate. */
export const PROB_MIN_SAMPLE = 10;

export function computeCategoryStats(
  entries: HistoryEntry[],
  questions: QuestionMeta[],
  examFilter?: ExamCode,
): CategoryStat[] {
  const qById = new Map(questions.map((q) => [q.id, q]));
  const acc = new Map<string, { answered: number; correct: number }>();

  for (const e of entries) {
    const q = qById.get(e.id);
    if (!q) continue;
    if (examFilter && q.exam !== examFilter) continue;
    const cur = acc.get(q.category) ?? { answered: 0, correct: 0 };
    cur.answered += 1;
    if (e.correct) cur.correct += 1;
    acc.set(q.category, cur);
  }

  return [...acc.entries()]
    .map(([category, v]) => ({
      category,
      answered: v.answered,
      correct: v.correct,
      accuracy: v.answered ? v.correct / v.answered : 0,
    }))
    .sort((a, b) => b.answered - a.answered);
}

export function topWeakCategories(stats: CategoryStat[], n = 3, minAnswered = 3): CategoryStat[] {
  return [...stats]
    .filter((s) => s.answered >= minAnswered)
    .sort((a, b) => a.accuracy - b.accuracy || b.answered - a.answered)
    .slice(0, n);
}

export function topStrongCategories(stats: CategoryStat[], n = 3, minAnswered = 3): CategoryStat[] {
  return [...stats]
    .filter((s) => s.answered >= minAnswered)
    .sort((a, b) => b.accuracy - a.accuracy || b.answered - a.answered)
    .slice(0, n);
}

export function computeExamProbabilities(
  entries: HistoryEntry[],
  questions: QuestionMeta[],
): ExamPassProbability[] {
  const qById = new Map(questions.map((q) => [q.id, q]));
  const acc = new Map<ExamCode, { answered: number; correct: number }>();
  for (const e of entries) {
    const q = qById.get(e.id);
    if (!q) continue;
    const cur = acc.get(q.exam) ?? { answered: 0, correct: 0 };
    cur.answered += 1;
    if (e.correct) cur.correct += 1;
    acc.set(q.exam, cur);
  }

  const exams: ExamCode[] = [
    "ip", "sg", "fe", "ap",
    "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au",
  ];
  return exams.map((exam) => {
    const v = acc.get(exam) ?? { answered: 0, correct: 0 };
    const accuracy = v.answered ? v.correct / v.answered : 0;
    const sampleConfidence = Math.min(1, v.answered / PASS_SAMPLE);
    const accBonus = Math.max(0, accuracy - PASS_ACCURACY);
    const passProbability = Math.round(
      Math.max(0, Math.min(95, accuracy * 60 + accBonus * 80 * sampleConfidence + sampleConfidence * 15)),
    );
    const questionsToPassZone = v.answered >= PASS_SAMPLE
      ? 0
      : PASS_SAMPLE - v.answered;
    return {
      exam,
      answered: v.answered,
      accuracy,
      passProbability,
      questionsToPassZone,
      enoughSample: v.answered >= PROB_MIN_SAMPLE,
      answersUntilSample: Math.max(0, PROB_MIN_SAMPLE - v.answered),
    };
  });
}

export function estimateStudyMinutes(totalEntries: number): number {
  return Math.round(totalEntries * 1.25);
}

export function daysUntilNextExam(now: Date = new Date()): { date: Date; days: number; label: string } {
  const year = now.getUTCFullYear();
  const candidates: Array<{ date: Date; label: string }> = [];
  candidates.push({ date: new Date(Date.UTC(year, 3, 21)), label: `${year}年 春期` });
  candidates.push({ date: new Date(Date.UTC(year, 9, 14)), label: `${year}年 秋期` });
  candidates.push({ date: new Date(Date.UTC(year + 1, 3, 21)), label: `${year + 1}年 春期` });

  const future = candidates.filter((c) => c.date.getTime() > now.getTime());
  const nearest = future[0];
  const days = Math.ceil((nearest.date.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
  return { date: nearest.date, days, label: nearest.label };
}

export function radarSlots(stats: CategoryStat[], slots = 10): CategoryStat[] {
  const sorted = [...stats].sort((a, b) => b.answered - a.answered).slice(0, slots);
  if (sorted.length >= slots) return sorted;
  const filler: CategoryStat[] = Array.from({ length: slots - sorted.length }).map((_, i) => ({
    category: `（未回答 ${i + 1}）`,
    answered: 0,
    correct: 0,
    accuracy: 0,
  }));
  return [...sorted, ...filler];
}
