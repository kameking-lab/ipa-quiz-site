import type { SCpm2Question, SCEssayAnswer, EssayIndustryId } from "./types";
import { ESSAY_INDUSTRY_LABELS } from "./types";
import { SC_PM2_QUESTIONS } from "@/data/essays/sc";
import { getAfternoonQuestions } from "@/lib/afternoon/load";
import type {
  AfternoonQuestion,
  IndustryVariant,
} from "@/lib/afternoon/types";

/**
 * 業種別合格答案を提供する試験区分。
 *
 * - "sc": 専用データ（`data/essays/sc/`）から提供
 * - その他: `data/questions/afternoon/{exam}/*-industries.ts` の
 *   `industryVariants` をアダプタで変換して提供
 *
 * NW/DB/ES は 2026/05 時点で PM2 が論述形式ではなく技術記述問題のみのため、
 * 業種別合格答案コンテンツの対象外。将来 IPA 試験形式変更により論述問題が
 * 導入された場合は、本枠組みでの再評価が可能。
 */
export type EssayExamCode = "sc" | "st" | "sa" | "pm" | "sm" | "au";

export const ESSAY_EXAM_CODES: EssayExamCode[] = [
  "sc",
  "st",
  "sa",
  "pm",
  "sm",
  "au",
];

export function isEssayExamCode(value: string): value is EssayExamCode {
  return (ESSAY_EXAM_CODES as string[]).includes(value);
}

function industryVariantToEssayAnswer(v: IndustryVariant): SCEssayAnswer {
  return {
    industryId: v.industryId as EssayIndustryId,
    industryName: v.industryName,
    intro: v.essayA,
    body: v.essayI,
    conclusion: v.essayU,
  };
}

function afternoonToEssayQuestion(q: AfternoonQuestion): SCpm2Question | null {
  if (q.type !== "essay") return null;
  if (!q.industryVariants || q.industryVariants.length === 0) return null;
  if (q.season !== "spring" && q.season !== "autumn") return null;
  return {
    id: q.id,
    year: q.year,
    season: q.season,
    qNumber: q.qNumber,
    theme: q.title,
    context: q.context,
    pdfUrl: q.pdfUrl,
    license: q.license,
    industries: q.industryVariants.map(industryVariantToEssayAnswer),
  };
}

export function getEssayQuestionsByExam(exam: EssayExamCode): SCpm2Question[] {
  if (exam === "sc") return SC_PM2_QUESTIONS;
  return getAfternoonQuestions(exam)
    .map(afternoonToEssayQuestion)
    .filter((q): q is SCpm2Question => q !== null)
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (a.season !== b.season) return a.season === "autumn" ? -1 : 1;
      return a.qNumber - b.qNumber;
    });
}

export function getSCpm2Questions(): SCpm2Question[] {
  return getEssayQuestionsByExam("sc");
}

export function findEssayQuestion(
  exam: EssayExamCode,
  id: string
): SCpm2Question | undefined {
  return getEssayQuestionsByExam(exam).find((q) => q.id === id);
}

export function findSCpm2Question(id: string): SCpm2Question | undefined {
  return findEssayQuestion("sc", id);
}

export function getEssayQuestionByYearSeason(
  exam: EssayExamCode,
  year: number,
  season: "spring" | "autumn",
  qNumber: number
): SCpm2Question | undefined {
  return getEssayQuestionsByExam(exam).find(
    (q) => q.year === year && q.season === season && q.qNumber === qNumber
  );
}

export function getSCpm2QuestionByYearSeason(
  year: number,
  season: "spring" | "autumn",
  qNumber: number
): SCpm2Question | undefined {
  return getEssayQuestionByYearSeason("sc", year, season, qNumber);
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
  return {
    year: parseInt(match[1], 10),
    season: match[2] as "spring" | "autumn",
  };
}

/** question → URL segment parts */
export function questionToUrlParts(q: SCpm2Question, exam: EssayExamCode) {
  return {
    exam,
    yearSeason: `${q.year}-${q.season}`,
    section: "pm2",
    qnum: `q${q.qNumber}`,
  };
}

export { ESSAY_INDUSTRY_LABELS };
