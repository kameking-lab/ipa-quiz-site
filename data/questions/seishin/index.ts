import type { Question } from "@/lib/questions/types";
import { SHAKAI_2025_SOURCE } from "../shakai";
import { type SsscSource, toSsscQuestion } from "../sssc-welfare";
import source2024 from "./2024-annual.json";
import source from "./2025-annual.json";

const SEISHIN_2025_SOURCE = source as SsscSource;
export const SEISHIN_2024_SOURCE = source2024 as SsscSource;

/**
 * 第28回（令和7年度）精神保健福祉士国家試験。専門科目48問と、社会福祉士第38回と同一の
 * 共通科目84問（公式の精神保健福祉士試験ページが同じ問題PDFを掲載し、正答も同一）。
 */
const SEISHIN_2025_QUESTIONS: Question[] = [
  ...SEISHIN_2025_SOURCE.questions.map((item) =>
    toSsscQuestion("seishin", SEISHIN_2025_SOURCE, SEISHIN_2025_SOURCE.questionPdfs, item)),
  ...SHAKAI_2025_SOURCE.questions
    .filter((item) => item.session === "kyotsu")
    .map((item) => toSsscQuestion("seishin", SEISHIN_2025_SOURCE, SHAKAI_2025_SOURCE.questionPdfs, item)),
];

/**
 * 第27回（令和6年度）精神保健福祉士国家試験。専門科目48問と、社会福祉士第37回と同一の
 * 共通科目（公式の精神保健福祉士試験ページが sp_am_*_37.pdf を掲載し、正答も84問すべて同一）。
 * 社会福祉士第37回は未公開のため共通科目もこのJSONに持ち、原文と一次資料から公式正答を
 * 一意に説明できない問題（withheld）は公開データに含めない。
 */
const SEISHIN_2024_QUESTIONS: Question[] = SEISHIN_2024_SOURCE.questions.map((item) =>
  toSsscQuestion("seishin", SEISHIN_2024_SOURCE, SEISHIN_2024_SOURCE.questionPdfs, item));

export const SEISHIN_QUESTIONS: Question[] = [...SEISHIN_2025_QUESTIONS, ...SEISHIN_2024_QUESTIONS];
