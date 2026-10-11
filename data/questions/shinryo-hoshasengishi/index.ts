import type { Question } from "@/lib/questions/types";
import batch1 from "./2025-annual-pm-batch1.json";
import batch2 from "./2025-annual-pm-batch2.json";
import batch2026 from "./2026-annual-pm-batch1.json";

/** Only originals with source, final-key, five-choice and metadata QA. */
export const SHINRYO_HOSHASENGISHI_QUESTIONS: Question[] = ([...batch1, ...batch2, ...batch2026] as Question[]).filter(question => question.needsReview === false);
