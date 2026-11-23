import { appendReplenishedQuestions } from "../published";
import paper0 from "./n1.json";


import paper1 from "./n4.json";

import source from "./n2.json";


import type { Question } from "@/lib/questions/types";

import questions from "./n3.json";


import data from "./n1-2012.json";

export const JLPT_QUESTIONS = appendReplenishedQuestions([...paper0, ...paper1] as Question[], [
  source,
  questions,
  data,
]);


import rows from "./n4-2012.json";

export const QUESTIONS = rows as Question[];
