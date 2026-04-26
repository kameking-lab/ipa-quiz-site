import type { EssayQuestion } from "./types";
import { ALL_ESSAY_QUESTIONS } from "@/data/questions/essay";

export type EssayExamCode = EssayQuestion["exam"];

export const ESSAY_EXAM_CODES: EssayExamCode[] = ["st", "sa", "pm", "sm", "au"];

export function getEssayQuestionsByExam(exam: EssayExamCode): EssayQuestion[] {
  return ALL_ESSAY_QUESTIONS.filter((q) => q.exam === exam).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.season !== b.season) return a.season.localeCompare(b.season);
    return a.qNumber - b.qNumber;
  });
}

export function findEssayQuestion(id: string): EssayQuestion | undefined {
  return ALL_ESSAY_QUESTIONS.find((q) => q.id === id);
}

export function getAllEssayQuestions(): EssayQuestion[] {
  return [...ALL_ESSAY_QUESTIONS];
}
