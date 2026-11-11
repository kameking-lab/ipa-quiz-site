import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import cxK6ChoiceExplanations from "./choice-explanations-cx-k6.json";

const RAW_ES_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

// Keep independent overlays ordered, after the official question corrections.
const CHOICE_EXPLANATION_OVERLAYS: unknown[] = [cxK6ChoiceExplanations];

export const ES_QUESTIONS: Question[] = CHOICE_EXPLANATION_OVERLAYS.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("es", RAW_ES_QUESTIONS),
);
