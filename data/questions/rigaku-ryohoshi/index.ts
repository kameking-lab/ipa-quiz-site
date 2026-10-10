import type { Question } from "@/lib/questions/types";
import y2026 from "./2026-annual.json";
import y2025 from "./2025-annual.json";

/** Ready-only originals. Held source drafts and figure assets stay outside this import graph. */
export const RIGAKU_RYOHOUSHI_QUESTIONS: Question[] = [
  ...(y2026 as Question[]),
  ...(y2025 as Question[]),
].filter(question => question.needsReview === false);
