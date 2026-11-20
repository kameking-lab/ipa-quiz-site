import { join } from "node:path";
import { ALL_QUESTIONS } from "@/data/questions";
import { getAdditionalPaperSourcePaths } from "@/data/questions/additional-papers";
import { getAllQuestionsLazy, getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { checkQuestionSources, questionSourceRegistrations } from "./question-quality-sources";
import { checkAnswerNotations, checkQuestionQuality, publicImageExists, type QualityIssue } from "./question-quality";

export async function collectPublishedQualityIssues(root: string, exams: readonly string[], imageExists = publicImageExists(join(root, "public"))) {
  const selected = new Set(exams);
  const staticQuestions = ALL_QUESTIONS.filter(q => selected.size === 0 || selected.has(q.exam));
  const lazyQuestions = selected.size === 0 ? await getAllQuestionsLazy() : (await Promise.all(
    getRegisteredExamCodes().filter(exam => selected.has(exam)).map(getQuestionsForExam),
  )).flat();
  const questions = new Set([...staticQuestions, ...lazyQuestions]);
  const ids = new Set([...questions].map(q => q.id));
  const issues: QualityIssue[] = [];
  for (const q of questions) issues.push(...checkQuestionQuality(q, imageExists));
  issues.push(...checkAnswerNotations(questions));
  issues.push(...checkQuestionSources(root, ids, selected.size === 0 ? questionSourceRegistrations(root) : [], getAdditionalPaperSourcePaths(), selected.size === 0));
  const unique = new Map(issues.map(issue => [JSON.stringify([issue.rule, issue.id, issue.fingerprint]), issue]));
  return { count: ids.size, issues: [...unique.values()] };
}
