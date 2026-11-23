import "server-only";
import { EXAM_CODE_ALIASES } from "./exam-aliases";
import { getQuestionCorpus } from "./corpus-files";
import type { ExamCode, Question } from "./types";

// next build aliases the source registry here; development, scripts and tests
// still import the original registry. The writer verifies their full equality.
const corpus = getQuestionCorpus();
export const QUESTIONS_BY_EXAM: Partial<Record<ExamCode, Question[]>> = {};
for (const exam of corpus.staticCodes()) {
  Object.defineProperty(QUESTIONS_BY_EXAM, exam, {
    enumerable: true,
    get: () => corpus.staticExam(exam),
  });
}
for (const [alias, canonical] of Object.entries(EXAM_CODE_ALIASES)) {
  Object.defineProperty(QUESTIONS_BY_EXAM, alias, {
    enumerable: false,
    get: () => QUESTIONS_BY_EXAM[canonical],
  });
}
export const ALL_QUESTIONS: Question[] = Object.values(QUESTIONS_BY_EXAM).flat();
