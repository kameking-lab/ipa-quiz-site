import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import type { ExamCode, Question } from "./types";

export function getAllQuestions(): Question[] {
  return ALL_QUESTIONS;
}

export function getQuestionsByExam(exam: ExamCode): Question[] {
  return QUESTIONS_BY_EXAM[exam] ?? [];
}

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

export function getAvailableYears(exam?: ExamCode): number[] {
  const source = exam ? getQuestionsByExam(exam) : ALL_QUESTIONS;
  return [...new Set(source.map((q) => q.year))].sort((a, b) => b - a);
}

export function getAvailableCategories(exam?: ExamCode): string[] {
  const source = exam ? getQuestionsByExam(exam) : ALL_QUESTIONS;
  return [...new Set(source.map((q) => q.category))].sort();
}

export function getAvailableTopicTags(exam?: ExamCode): string[] {
  const source = exam ? getQuestionsByExam(exam) : ALL_QUESTIONS;
  return [...new Set(source.flatMap((q) => q.topicTags))].sort();
}
