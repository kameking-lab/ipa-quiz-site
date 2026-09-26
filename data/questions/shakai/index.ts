import type { Question } from "@/lib/questions/types";
import { type SsscSource, toSsscQuestion } from "../sssc-welfare";
import source from "./2025-annual.json";

export const SHAKAI_2025_SOURCE = source as SsscSource;

/** 第38回（令和7年度）社会福祉士国家試験 全129問（共通科目1〜84・専門科目85〜129）。 */
export const SHAKAI_QUESTIONS: Question[] = SHAKAI_2025_SOURCE.questions.map((item) =>
  toSsscQuestion("shakai", SHAKAI_2025_SOURCE, SHAKAI_2025_SOURCE.questionPdfs, item));
