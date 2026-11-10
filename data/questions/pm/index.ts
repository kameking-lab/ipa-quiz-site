import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import cxK5ChoiceExplanations from "./choice-explanations-cx-k5.json";

const RAW_PM_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

// Keep overlays ordered so future independent batches can be layered here.
export const PM_QUESTIONS: Question[] = [cxK5ChoiceExplanations].reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("pm", RAW_PM_QUESTIONS),
);
