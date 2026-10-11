import type { Question } from "@/lib/questions/types";
import batch1 from "./2025-annual-pm-batch1.json";
import batch2 from "./2025-annual-pm-batch2.json";
import batch2026 from "./2026-annual-pm-batch1.json";
import batch3 from "./2025-annual-pm-batch3.json";
import batch2026Extra from "./2026-annual-pm-batch2.json";
import am2025 from "./2025-annual-am-batch1.json";
import am2026 from "./2026-annual-am-batch1.json";

/** Only originals with source, final-key, five-choice and metadata QA. */
export const RINSHO_KENSAGISHI_QUESTIONS: Question[] = ([...batch1, ...batch2, ...batch3, ...batch2026, ...batch2026Extra, ...am2025, ...am2026] as Question[]).filter(question => question.needsReview === false);
