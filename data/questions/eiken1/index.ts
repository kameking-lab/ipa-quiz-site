import { appendReplenishedQuestions } from "../published";
import data from "./2026-round2.json";


import type { Question } from "@/lib/questions/types";


import source2025Round3 from "./2025-round3.json";

import questions from "./2026-round1.json";

export const EIKEN1_QUESTIONS = appendReplenishedQuestions(data as Question[], [
  source2025Round3,
  questions,
]);
