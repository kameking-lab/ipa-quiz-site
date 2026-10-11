import type { Question } from "@/lib/questions/types";
import batch1 from "./2025-annual-pm-batch1.json";
import batch2 from "./2025-annual-pm-batch2.json";

/** Only originals with source, final-key, five-choice and metadata QA. */
export const RINSHO_KENSAGISHI_QUESTIONS: Question[] = ([...batch1, ...batch2] as Question[]).filter(question => question.needsReview === false);
