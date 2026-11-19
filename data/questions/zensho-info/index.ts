import { appendReplenishedQuestions } from "../published";
import source from "./2026-annual-programming.json";

import type { Question } from "@/lib/questions/types";


import rows from "./75-1.json";

export const QUESTIONS = appendReplenishedQuestions(rows as Question[], [
  data,
  paper1,
  questions,
]);

import data from "./2025-73-pro1.json";

import paper1 from "./2025-73-pro2.json";


import questions from "./74-1.json";

export const ZENSHO_INFO_QUESTIONS = source as Question[];
