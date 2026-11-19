import { appendReplenishedQuestions } from "../published";
import data from "./2026-round1.json";
import type { Question } from "@/lib/questions/types";

import questions from "./2026-round2.json";


export const CFP_5_QUESTIONS = appendReplenishedQuestions(questions as Question[], [
  data,
]);
