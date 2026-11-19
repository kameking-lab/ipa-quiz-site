import { appendReplenishedQuestions } from "../published";
import type { Question } from "@/lib/questions/types";


import official2025Early from "./official-2025-first-gakka.json";

import records from "./official-2025-late-gakka.json";

export const JOBPASS_QUESTIONS: Question[] = appendReplenishedQuestions(official2025Early as Question[], [
  records,
]);
