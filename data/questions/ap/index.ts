import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { AP_BY_YEAR_QUESTIONS } from "./by-year";
import { AP_SAMPLE_QUESTIONS } from "./sample-questions";
import cxK3ChoiceExplanations from "./choice-explanations-cx-k3.json";
import eAp1ChoiceExplanations from "./choice-explanations-e-ap-1.json";

// Use real parsed data when available, fall back to curated samples.
const RAW_AP_QUESTIONS: Question[] =
  AP_BY_YEAR_QUESTIONS.length > 0 ? AP_BY_YEAR_QUESTIONS : AP_SAMPLE_QUESTIONS;

const choiceExplanationOverlays: unknown[] = [cxK3ChoiceExplanations, eAp1ChoiceExplanations];

export const AP_QUESTIONS: Question[] = choiceExplanationOverlays.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("ap", RAW_AP_QUESTIONS),
);
