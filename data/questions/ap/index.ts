import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { AP_BY_YEAR_QUESTIONS } from "./by-year";
import { AP_SAMPLE_QUESTIONS } from "./sample-questions";
import choiceExplanations from "./choice-explanations-2024-2025.json";

// Use real parsed data when available, fall back to curated samples.
const RAW_AP_QUESTIONS: Question[] =
  AP_BY_YEAR_QUESTIONS.length > 0 ? AP_BY_YEAR_QUESTIONS : AP_SAMPLE_QUESTIONS;

export const AP_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  applyIpaCorrections("ap", RAW_AP_QUESTIONS),
  choiceExplanations,
);
