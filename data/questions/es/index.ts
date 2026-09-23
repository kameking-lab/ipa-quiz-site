import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import choiceExplanations from "./choice-explanations-2024-2025.json";

const RAW_ES_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const ES_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  applyIpaCorrections("es", RAW_ES_QUESTIONS),
  choiceExplanations,
);
