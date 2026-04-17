import type { ExamCode, Question } from "@/lib/questions/types";
import { AP_QUESTIONS } from "./ap";

export const QUESTIONS_BY_EXAM: Partial<Record<ExamCode, Question[]>> = {
  ap: AP_QUESTIONS,
};

export const ALL_QUESTIONS: Question[] = Object.values(QUESTIONS_BY_EXAM)
  .flat()
  .filter((q): q is Question => Boolean(q));
