import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import choiceExplanations from "./choice-explanations-2024-2025.json";

const RAW_DB_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const DB_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  applyIpaCorrections("db", RAW_DB_QUESTIONS),
  choiceExplanations,
);
