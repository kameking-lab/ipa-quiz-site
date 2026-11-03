import type { Question } from "@/lib/questions/types";
import batch1 from "./2025-annual-pm-batch1.json";
import batch2 from "./2025-annual-pm-batch2.json";
import batch2026 from "./2026-annual-pm-batch1.json";
import completed2025am from "./2025-annual-am-completion.json";
import completed2025pm from "./2025-annual-pm-completion.json";
import completed2026am from "./2026-annual-am-completion.json";
import completed2026pm from "./2026-annual-pm-completion.json";

/** Original keys, all five reasons and required source figures are checked. */
export const SHINRYO_HOSHASENGISHI_QUESTIONS: Question[] = ([...batch1, ...batch2, ...batch2026, ...completed2025am, ...completed2025pm, ...completed2026am, ...completed2026pm] as Question[]).filter(question => question.needsReview === false);
