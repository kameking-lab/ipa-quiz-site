import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { AP_BY_YEAR_QUESTIONS } from "./by-year";
import { AP_SAMPLE_QUESTIONS } from "./sample-questions";
import cxK4ChoiceExplanations from "./choice-explanations-cx-k4.json";

// Use real parsed data when available, fall back to curated samples.
const RAW_AP_QUESTIONS: Question[] =
  AP_BY_YEAR_QUESTIONS.length > 0 ? AP_BY_YEAR_QUESTIONS : AP_SAMPLE_QUESTIONS;

const CHOICE_EXPLANATION_OVERLAYS: unknown[] = [cxK4ChoiceExplanations];

export const AP_QUESTIONS: Question[] = CHOICE_EXPLANATION_OVERLAYS.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("ap", RAW_AP_QUESTIONS),
);
