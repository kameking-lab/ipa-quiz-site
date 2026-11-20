import { appendReplenishedQuestions } from "../published";
import type { Question } from "@/lib/questions/types";

import records from "./official-2025-annual-gakka.json";

import officialPaper from "./official-2024-annual-gakka.json";


export const ZENSHO_FINANCIAL_STATEMENT_QUESTIONS = appendReplenishedQuestions(records as Question[], [
  officialPaper,
]);
