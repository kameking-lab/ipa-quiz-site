import type { Question } from "@/lib/questions/types";
import seishin2024 from "../seishin/2024-annual.json";
import { type SsscSource, toSsscQuestion } from "../sssc-welfare";
import source2023 from "./2023-annual.json";
import source2024 from "./2024-annual.json";
import source from "./2025-annual.json";

export const SHAKAI_2025_SOURCE = source as SsscSource;
export const SHAKAI_2024_SOURCE = source2024 as SsscSource;

/** 第38回（令和7年度）社会福祉士国家試験 全129問（共通科目1〜84・専門科目85〜129）。 */
const SHAKAI_2025_QUESTIONS: Question[] = SHAKAI_2025_SOURCE.questions.map((item) =>
  toSsscQuestion("shakai", SHAKAI_2025_SOURCE, SHAKAI_2025_SOURCE.questionPdfs, item));

/**
 * 第37回（令和6年度）社会福祉士国家試験。
 * 共通科目（問題1〜84）は第27回精神保健福祉士と同一の問題PDF（sp_am_*_37.pdf）・同一の公式正答で、
 * 保留3問を除く共通科目81問の本文・正答・解説を seishin/2024-annual.json から共有する。
 * 専門科目（問題85〜129）は shakai/2024-annual.json。
 */
const SEISHIN_2024_SHARED = seishin2024 as SsscSource;
export const SHAKAI_2024_WITHHELD = (SEISHIN_2024_SHARED.withheld ?? []).filter((item) => item.session === "kyotsu");
const SHAKAI_2024_KYOTSU = SEISHIN_2024_SHARED.questions.filter((item) => item.session === "kyotsu");
const SHAKAI_2024_QUESTIONS: Question[] = [...SHAKAI_2024_KYOTSU, ...SHAKAI_2024_SOURCE.questions].map((item) =>
  toSsscQuestion("shakai", SHAKAI_2024_SOURCE, { ...SEISHIN_2024_SHARED.questionPdfs, ...SHAKAI_2024_SOURCE.questionPdfs }, item));

/** 第36回（令和5年度）の全150問。午前の共通科目1〜83と午後の専門科目84〜150。 */
const SHAKAI_2023_SOURCE = source2023 as SsscSource;
const SHAKAI_2023_QUESTIONS: Question[] = SHAKAI_2023_SOURCE.questions.map((item) =>
  toSsscQuestion("shakai", SHAKAI_2023_SOURCE, SHAKAI_2023_SOURCE.questionPdfs, item));

export const SHAKAI_QUESTIONS: Question[] = [...SHAKAI_2025_QUESTIONS, ...SHAKAI_2024_QUESTIONS, ...SHAKAI_2023_QUESTIONS];
