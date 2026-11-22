import type { Question } from "@/lib/questions/types";
import round51 from "./2026-first.json";
import round50 from "./2025-second.json";
import round47 from "./2024-first.json";
import round49 from "./2025-first.json";
import round45 from "./2023-first.json";
import round45Practical from "./2023-first-practical.json";

export const ZENKOU_PC_QUESTIONS = ([...round51, ...round50, ...round49, ...round47, ...round45, ...round45Practical] as Question[])
  .filter((question) => !question.needsReview && question.publicAllowed !== false);
