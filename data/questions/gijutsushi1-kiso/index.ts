import { appendReplenishedQuestions } from "../published";
import type { Question } from "@/lib/questions/types";


import data from "./2023-kiso.json";


import questions from "./2021-kiso.json";

export const GIJUTSUSHI1_KISO_QUESTIONS = appendReplenishedQuestions(data as Question[], [
  questions,
]);
