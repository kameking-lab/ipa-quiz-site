import type { ExamCode } from "@/lib/questions/types";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_ESSAY_QUESTIONS } from "@/data/questions/essay";
import { AP_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/ap";
import { ST_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/st";
import { FE_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/fe";
import { DB_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/db";
import { NW_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/nw";
import { SC_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/sc";
import { ES_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/es";
import { PM_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/pm";
import { SA_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/sa";
import { AU_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/au";
import { SM_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/sm";
import type { AfternoonQuestion } from "@/lib/afternoon/types";

const ALL_AFTERNOON: AfternoonQuestion[] = [
  ...AP_AFTERNOON_QUESTIONS,
  ...ST_AFTERNOON_QUESTIONS,
  ...FE_AFTERNOON_QUESTIONS,
  ...DB_AFTERNOON_QUESTIONS,
  ...NW_AFTERNOON_QUESTIONS,
  ...SC_AFTERNOON_QUESTIONS,
  ...ES_AFTERNOON_QUESTIONS,
  ...PM_AFTERNOON_QUESTIONS,
  ...SA_AFTERNOON_QUESTIONS,
  ...AU_AFTERNOON_QUESTIONS,
  ...SM_AFTERNOON_QUESTIONS,
];

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
