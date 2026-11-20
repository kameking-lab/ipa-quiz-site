import { appendReplenishedQuestions } from "../published";
import data from "./2025-senmon-selected.json";


import type { Question } from "@/lib/questions/types";


import questions from "./2024-senmon.json";


import newPaper from "./2021-senmon.json";

export const GIJUTSUSHI1_KENSETSU_QUESTIONS = appendReplenishedQuestions(data as Question[], [
  questions,
  newPaper,
]);

import rows from "./2022-senmon.json";


export const QUESTIONS = rows as Question[];
