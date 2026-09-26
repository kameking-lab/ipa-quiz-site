import type { Question } from "@/lib/questions/types";
import { SHAKAI_2025_SOURCE } from "../shakai";
import { type SsscSource, toSsscQuestion } from "../sssc-welfare";
import source from "./2025-annual.json";

const SEISHIN_2025_SOURCE = source as SsscSource;

/**
 * 第28回（令和7年度）精神保健福祉士国家試験。専門科目48問と、社会福祉士第38回と同一の
 * 共通科目84問（公式の精神保健福祉士試験ページが同じ問題PDFを掲載し、正答も同一）。
 */
export const SEISHIN_QUESTIONS: Question[] = [
  ...SEISHIN_2025_SOURCE.questions.map((item) =>
    toSsscQuestion("seishin", SEISHIN_2025_SOURCE, SEISHIN_2025_SOURCE.questionPdfs, item)),
  ...SHAKAI_2025_SOURCE.questions
    .filter((item) => item.session === "kyotsu")
    .map((item) => toSsscQuestion("seishin", SEISHIN_2025_SOURCE, SHAKAI_2025_SOURCE.questionPdfs, item)),
];
