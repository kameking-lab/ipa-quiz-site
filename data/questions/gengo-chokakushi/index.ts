import type { Question } from "@/lib/questions/types";
import notices from "./official-notice-ready.json";

/** Official notice originals only; the catalog gate keeps this qualification private. */
export const GENGO_CHOKAKUSHI_QUESTIONS: Question[] = (notices as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
