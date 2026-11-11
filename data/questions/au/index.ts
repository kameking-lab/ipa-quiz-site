import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import cxK6auChoiceExplanations from "./choice-explanations-cx-k6au.json";

const RAW_AU_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

const CHOICE_EXPLANATION_OVERLAYS: unknown[] = [cxK6auChoiceExplanations];

export const AU_QUESTIONS: Question[] = CHOICE_EXPLANATION_OVERLAYS.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("au", RAW_AU_QUESTIONS),
);
