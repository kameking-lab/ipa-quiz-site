import { appendReplenishedQuestions } from "../published";
import data from "./2026-kiso-selected.json";

import source from "./2025-kiso.json";

import type { Question } from "@/lib/questions/types";

import questions from "./2026-kiso-supplement.json";


export const KOKKA_IPPAN_DAI_QUESTIONS = appendReplenishedQuestions(data as Question[], [
  source,
  questions,
]);
