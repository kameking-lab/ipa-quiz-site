import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import laneChoiceExplanations from "./choice-explanations-cx-k8sa.json";

const RAW_SA_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

const CHOICE_EXPLANATION_OVERLAYS = [laneChoiceExplanations];

export const SA_QUESTIONS: Question[] = CHOICE_EXPLANATION_OVERLAYS.reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("sa", RAW_SA_QUESTIONS),
);
