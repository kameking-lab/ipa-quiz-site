import type { ExamCode } from "@/lib/questions/types";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_ESSAY_QUESTIONS } from "@/data/questions/essay";
import { getAfternoonQuestions } from "@/lib/afternoon/load";

// Count the same admitted collection served by the afternoon routes, not legacy barrels.
const AFTERNOON_EXAMS: ExamCode[] = [
  "ap", "st", "fe", "db", "nw", "sc", "es", "pm", "sa", "au", "sm",
];
const ALL_AFTERNOON = AFTERNOON_EXAMS.flatMap(getAfternoonQuestions);

export interface ExamContentRow {
  exam: ExamCode;
  morning: number;
  afternoon: number;
  essay: number;
  total: number;
}

export interface ContentCounts {
  morning: number;
  afternoon: number;
  essay: number;
  total: number;
  publishedExams: number;
  byExam: ExamContentRow[];
}

export function getContentCounts(): ContentCounts {
  const examCodes = new Set<ExamCode>();
  for (const q of ALL_QUESTIONS) examCodes.add(q.exam);
  for (const q of ALL_AFTERNOON) examCodes.add(q.exam);
  for (const q of ALL_ESSAY_QUESTIONS) examCodes.add(q.exam as ExamCode);

  const byExam: ExamContentRow[] = Array.from(examCodes).map((code) => {
    const morning = (QUESTIONS_BY_EXAM[code]?.length ?? 0);
    const afternoon = ALL_AFTERNOON.filter((q) => q.exam === code).length;
    const essay = ALL_ESSAY_QUESTIONS.filter((q) => q.exam === code).length;
    return {
      exam: code,
      morning,
      afternoon,
      essay,
      total: morning + afternoon + essay,
    };
  }).sort((a, b) => b.total - a.total);

  const morning = ALL_QUESTIONS.length;
  const afternoon = ALL_AFTERNOON.length;
  const essay = ALL_ESSAY_QUESTIONS.length;

  return {
    morning,
    afternoon,
    essay,
    total: morning + afternoon + essay,
    publishedExams: byExam.filter((r) => r.total > 0).length,
    byExam,
  };
}
