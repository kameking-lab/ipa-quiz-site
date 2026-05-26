import { QUESTIONS_BY_EXAM } from "@/data/questions";
import type { ExamCode } from "@/lib/questions/types";

/**
 * Single source of truth for per-exam question counts (致命傷④).
 *
 * These are the raw per-exam module lengths — the same value the exam cards
 * have always shown as "{count}問収録". Centralizing the computation here means
 * the home grid, exam hubs, and any future consumer read one map instead of
 * each recomputing `QUESTIONS_BY_EXAM[e].length`.
 */
export const EXAM_QUESTION_COUNTS: Partial<Record<ExamCode, number>> =
  Object.fromEntries(
    (Object.entries(QUESTIONS_BY_EXAM) as Array<
      [ExamCode, { length: number } | undefined]
    >).map(([code, qs]) => [code, qs?.length ?? 0]),
  ) as Partial<Record<ExamCode, number>>;

/** Question count for a single exam (0 if the exam has no loaded questions). */
export function getExamQuestionCount(exam: ExamCode): number {
  return EXAM_QUESTION_COUNTS[exam] ?? 0;
}
