import type { Question } from "@/lib/questions/types";
import batch1 from "./2025-annual-pm-batch1.json";
import batch2026 from "./2026-annual-pm-batch1.json";
import partial75 from "./partial75-20261011.json";
import publicText3 from "./public-text3-20261015.json";

/** Ready-only accepted originals. Remaining source drafts stay outside runtime. */
export const RINSHO_KENSAGISHI_QUESTIONS: Question[] = ([...batch1, ...batch2026, ...partial75, ...publicText3] as Question[]).filter(question => question.needsReview === false);
