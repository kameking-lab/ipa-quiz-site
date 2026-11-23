import "server-only";
import { canonicalExamCode } from "./exam-aliases";
import { getQuestionCorpus } from "./corpus-files";
import type { ExamCode, Question } from "./types";

export async function getQuestionsForExam(exam: ExamCode): Promise<Question[]> {
  return getQuestionCorpus().lazyExam(canonicalExamCode(exam));
}
let allQuestions: Question[] | undefined;
export async function getAllQuestionsLazy(): Promise<Question[]> {
  const corpus = getQuestionCorpus();
  allQuestions ??= corpus.lazyCodes().flatMap(corpus.lazyExam);
  return [...allQuestions];
}
export function getRegisteredExamCodes(): ExamCode[] {
  return getQuestionCorpus().lazyCodes();
}
export async function getQuestionCountsByExam(): Promise<Partial<Record<ExamCode, number>>> {
  const corpus = getQuestionCorpus();
  return Object.fromEntries(corpus.lazyCodes().map(exam => [exam, corpus.lazyCount(exam)]));
}
