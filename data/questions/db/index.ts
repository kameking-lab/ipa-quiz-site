import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import cxK5dbChoiceExplanations from "./choice-explanations-cx-k5db.json";

const RAW_DB_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

// Keep independent overlays in order, after the existing official corrections.
export const DB_QUESTIONS: Question[] = [cxK5dbChoiceExplanations].reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("db", RAW_DB_QUESTIONS),
);
