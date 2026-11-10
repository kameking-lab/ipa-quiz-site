import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import laneChoiceExplanations from "./choice-explanations-cx-k8sm.json";

const RAW_SM_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

// Apply overlays after official corrections; preserve existing explanations for
// questions not included in a later overlay.
export const SM_QUESTIONS: Question[] = [laneChoiceExplanations].reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("sm", RAW_SM_QUESTIONS),
);
