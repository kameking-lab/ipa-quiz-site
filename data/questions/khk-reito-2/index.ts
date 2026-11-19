import type { Question } from "@/lib/questions/types";
import { isExamPublished } from "@/lib/qualifications/catalog";
import data from "./latest-two.json";
import annual2026 from "./2026-annual.json";

/** Review/validation entry point. Public loaders additionally enforce the catalog gate. */
export const KHK_REITO_2_CANDIDATES = [...data, ...annual2026] as Question[];
export const KHK_REITO_2_QUESTIONS: Question[] = isExamPublished("khk-reito-2")
  ? KHK_REITO_2_CANDIDATES
  : [];
