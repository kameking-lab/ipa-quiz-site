import type { Question } from "@/lib/questions/types";
import round43 from "./2022-first.json";
import round51 from "./2026-first.json";
import round50 from "./2025-second.json";
import round49 from "./2025-first.json";

export const ZENKOU_PC_QUESTIONS = ([...round51, ...round50, ...round49, ...round43] as Question[])
  .filter((question) => !question.needsReview && question.publicAllowed !== false);
