import type { Question } from "@/lib/questions/types";
import batch1 from "./2025-annual-pm-batch1.json";
import batch2026 from "./2026-annual-pm-batch1.json";

/** The saved seven batch2 originals await independent acceptance and stay out of runtime. */
export const RINSHO_KENSAGISHI_QUESTIONS: Question[] = ([...batch1, ...batch2026] as Question[]).filter(question => question.needsReview === false);
