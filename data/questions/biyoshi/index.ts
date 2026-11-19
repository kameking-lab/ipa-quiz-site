import type { Question } from "@/lib/questions/types";
import first from "./2026-first.json";
import second from "./2026-second.json";
import round52 from "./2025-second.json";
import round51 from "./2025-first.json";
import round50 from "./2024-second.json";
import round49 from "./2024-first.json";
import round48 from "./2023-second.json";
import round47 from "./2023-first.json";
import round46 from "./2022-second.json";
import round45 from "./2022-first.json";
import mask from "./study-mask.json";

const reviewed = new Set(mask.reviewedQuestionIds);
const excluded = new Set(mask.excludedIds);
const accepted2026 = ([...first, ...second] as Question[]).filter(
  q => reviewed.has(q.id) && !excluded.has(q.id) && q.needsReview === false,
);

const earlierRounds = [
  ...round52, ...round51,
  ...round50, ...round49,
  ...round48, ...round47,
  ...round46, ...round45,
] as Question[];

export const BIYOSHI_QUESTIONS: Question[] = [...accepted2026, ...earlierRounds];
