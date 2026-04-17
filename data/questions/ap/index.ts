import type { Question } from "@/lib/questions/types";
import { AP_BY_YEAR_QUESTIONS } from "./by-year";
import { AP_SAMPLE_QUESTIONS } from "./sample-questions";

// Use real parsed data when available, fall back to curated samples.
export const AP_QUESTIONS: Question[] =
  AP_BY_YEAR_QUESTIONS.length > 0 ? AP_BY_YEAR_QUESTIONS : AP_SAMPLE_QUESTIONS;
