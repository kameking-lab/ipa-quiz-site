import type { Question } from "@/lib/questions/types";
import { isExamPublished } from "@/lib/qualifications/catalog";
import latest from "./2026-annual.json";
import previous from "./2025-annual.json";

/** Officially available subsets only; excluded questions are a separate archive. */
export const GENGO_CHOKAKUSHI_CANDIDATES = [...latest, ...previous] as Question[];
export const GENGO_CHOKAKUSHI_QUESTIONS = isExamPublished("gengo-chokakushi")
  ? GENGO_CHOKAKUSHI_CANDIDATES.filter(q => q.needsReview === false)
  : [];
