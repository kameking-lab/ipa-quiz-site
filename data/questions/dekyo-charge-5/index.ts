import { appendReplenishedQuestions } from "../published";
import type { Question } from "@/lib/questions/types";

import questions from "./2025-round2.json";

import questions2025 from "./2025-round1.json";

import questions2026 from "./2026-round1.json";


export const DEKYO_CHARGE_5_QUESTIONS = appendReplenishedQuestions(questions as Question[], [
  questions2025,
  questions2026,
]);
