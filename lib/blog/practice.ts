import practiceMap from "@/data/blog/practice-map.json";
import { getQuestionById } from "@/lib/questions/load";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { Question } from "@/lib/questions/types";
import { requiredSelectionCount } from "@/lib/questions/answers";

export interface BlogPracticeMapping { questionId: string; reason: string }
export const BLOG_PRACTICE_MAP: Readonly<Record<string, BlogPracticeMapping>> = practiceMap;

/** Explicit editorial selection. A missing/withdrawn question never falls back to an unrelated one. */
export function getBlogPractice(slug: string) {
  const mapping = BLOG_PRACTICE_MAP[slug];
  const question = mapping && getQuestionById(mapping.questionId);
  if (!question || question.type !== "multiple-choice" || typeof question.answer !== "string" || requiredSelectionCount(question) !== 1 || !question.choices || !isPracticeReadyQuestion(question)) return null;
  return { question, reason: mapping.reason, continueHref: blogPracticeHref(question) };
}

export function blogPracticeHref(question: Question): string {
  return `/quiz?${new URLSearchParams({ mode: "topic", exam: question.exam, session: question.session, category: question.category })}`;
}
