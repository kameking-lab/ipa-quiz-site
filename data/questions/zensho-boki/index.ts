import { appendReplenishedQuestions } from "../published";
import paper0 from "./2025-100-gakka.json";


import paper1 from "./2025-101-practical.json";


import paper2 from "./2026-102-practical.json";


import questions from "./2025-101-2.json";


import type { Question } from "@/lib/questions/types";


import data from "./2025-100-accounting.json";

export const ZENSHO_BOKI_QUESTIONS = appendReplenishedQuestions([...paper0, ...paper1, ...paper2] as Question[], [
  questions,
  data,
]);


import rows from "./102-1-acc.json";


import paper162 from "./101-1-acc.json";

export const QUESTIONS = [...rows, ...paper162] as Question[];
