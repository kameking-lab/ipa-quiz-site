import type { Question } from "@/lib/questions/types";
import notices from "./official-notice-ready.json";
import notices2024 from "./2024-official-notices.json";
import notices2023 from "./2023-official-notices.json";

/** The prior intake remains separate until the owner merges the newer sittings. */
export const GENGO_CHOKAKUSHI_QUESTIONS: Question[] = (notices as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);

export const GENGO_CHOKAKUSHI_PUBLISHED_QUESTIONS = [...notices2024, ...notices2023] as Question[];
