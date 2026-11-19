import { appendReplenishedQuestions } from "../published";
import type { Question } from "@/lib/questions/types";


import questions from "./plan7-080.json";

export const JOBPASS3_QUESTIONS = appendReplenishedQuestions(questions as Question[], [
  officialPaper,
]);

import officialPaper from "./official-2025-late-gakka.json";

export const QUESTIONS = questions as Question[];
