import type { SCpm2Question, SCEssayAnswer, EssayIndustryId } from "./types";
import { SC_PM2_QUESTIONS } from "@/data/essays/sc";

export type SCEssayExamCode = "sc";
export const SC_ESSAY_EXAM_CODES: SCEssayExamCode[] = ["sc"];

export function getSCpm2Questions(): SCpm2Question[] {
  return SC_PM2_QUESTIONS;
}

export function findSCpm2Question(id: string): SCpm2Question | undefined {
  return SC_PM2_QUESTIONS.find((q) => q.id === id);
}

export function getSCpm2QuestionByYearSeason(
  year: number,
  season: "spring" | "autumn",
  qNumber: number
): SCpm2Question | undefined {
  return SC_PM2_QUESTIONS.find(
    (q) => q.year === year && q.season === season && q.qNumber === qNumber
  );
}

export function getIndustryEssay(
  question: SCpm2Question,
  industryId: EssayIndustryId
): SCEssayAnswer | undefined {
  return question.industries.find((e) => e.industryId === industryId);
}

/** "2024-spring" → { year: 2024, season: "spring" } */
export function parseYearSeason(
  yearSeason: string
): { year: number; season: "spring" | "autumn" } | null {
  const match = yearSeason.match(/^(\d{4})-(spring|autumn)$/);
  if (!match) return null;
  return { year: parseInt(match[1], 10), season: match[2] as "spring" | "autumn" };
}

/** question id → URL segment parts */
export function questionToUrlParts(q: SCpm2Question) {
  return {
    exam: "sc" as SCEssayExamCode,
    yearSeason: `${q.year}-${q.season}`,
    section: "pm2",
    qnum: `q${q.qNumber}`,
  };
}
