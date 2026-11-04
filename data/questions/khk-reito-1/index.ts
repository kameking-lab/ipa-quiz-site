import type { Question } from "@/lib/questions/types";
import { isExamPublished } from "@/lib/qualifications/catalog";
import data from "./latest-two.json";

/** Review/validation entry point. Public loaders additionally enforce the catalog gate. */
export const KHK_REITO_1_CANDIDATES = data as Question[];
export const KHK_REITO_1_QUESTIONS: Question[] = isExamPublished("khk-reito-1")
  ? KHK_REITO_1_CANDIDATES
  : [];
