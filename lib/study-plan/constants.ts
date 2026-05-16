import type { ExamCode } from "@/lib/questions/types";
import type { KnowledgeLevel } from "./types";

/**
 * Reference total study hours per exam, sourced from public IPA preparation
 * surveys and major prep-school estimates. Used as the "完全初心者" baseline;
 * higher knowledge levels scale this down via LEVEL_MULTIPLIERS.
 */
export const REQUIRED_HOURS: Record<ExamCode, number> = {
  ip: 40,
  sg: 65,
  fe: 125,
  ap: 250,
  st: 400,
  sa: 400,
  pm: 400,
  nw: 400,
  db: 400,
  es: 400,
  sc: 350,
  sm: 350,
  au: 400,
};

export const LEVEL_MULTIPLIERS: Record<KnowledgeLevel, number> = {
  beginner: 1.0,
  foundation: 0.75,
  learner: 0.5,
  "final-review": 0.25,
};

export const LEVEL_LABELS: Record<KnowledgeLevel, string> = {
  beginner: "完全初心者",
  foundation: "基礎習得済み",
  learner: "学習経験あり",
  "final-review": "直前確認",
};

export const LEVEL_DESCRIPTIONS: Record<KnowledgeLevel, string> = {
  beginner: "IT基礎から学び始める",
  foundation: "基本用語は理解している",
  learner: "過去に学習・受験経験あり",
  "final-review": "試験直前の最終確認",
};

/** Phase distribution (must sum to 1.0). */
export const PHASE_RATIOS = {
  early: 0.6,
  middle: 0.3,
  late: 0.1,
} as const;

/** Minutes per past-question (午前四択 average). */
export const MINUTES_PER_QUESTION = 3;
/** Minutes for a typical blog article read. */
export const MINUTES_PER_BLOG = 10;
/** Minutes for a typical essay study read. */
export const MINUTES_PER_ESSAY = 15;
/** Minutes for a small mock exam (20問). */
export const MINUTES_PER_MOCK_SMALL = 60;
/** Minutes for a full mock exam (80問). */
export const MINUTES_PER_MOCK_FULL = 150;

export const MIN_WEEKDAY_MINUTES = 15;
export const MAX_WEEKDAY_MINUTES = 480;
export const MIN_WEEKEND_MINUTES = 15;
export const MAX_WEEKEND_MINUTES = 720;
