import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import choiceExplanationsCxK8 from "./choice-explanations-cx-k8.json";

const RAW_NW_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

const CHOICE_EXPLANATION_OVERLAYS: unknown[] = [choiceExplanationsCxK8];

export const NW_QUESTIONS: Question[] = CHOICE_EXPLANATION_OVERLAYS.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("nw", RAW_NW_QUESTIONS),
);
