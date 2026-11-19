import { appendReplenishedQuestions } from "../published";
import type { Question } from "@/lib/questions/types";

import questions from "./2026-annual.json";

import paper from "./2025-june.json";


export const ZENSHO_BOKI_2_QUESTIONS = appendReplenishedQuestions(questions as Question[], [
  paper,
]);
