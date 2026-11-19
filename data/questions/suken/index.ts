import { appendReplenishedQuestions } from "../published";
import paper0 from "./2020-1-2.json";


import paper1 from "./2022-3-1.json";


import paper2 from "./2022-4-2.json";

import grade2 from "./2023-2-2.json";


import grade9 from "./2020-9.json";


import source2020PrimaryAm from "./2020-primary-am.json";

import initial from "./2023-second-pm.json";


import newSitting from "./2020-eighth.json";


import type { Question } from "@/lib/questions/types";

import jun1 from "./2024-j1-1.json";

import grade10 from "./2020-10.json";


import first from "./2022-5-1.json";


import second from "./2022-5-2.json";

import data from "./2023-second-first.json";


import questions from "./2020-7.json";

export const SUKEN_QUESTIONS = appendReplenishedQuestions([...paper0, ...paper1, ...paper2, ...grade9, ...grade2, ...initial, ...source2020PrimaryAm, ...first, ...second, ...data, ...newSitting] as Question[], [
  jun1,
  grade10,
  questions,
]);


import rows from "./2023-jun2-first.json";


import paper104 from "./2022-third-second.json";


import paper105 from "./2022-fourth-first.json";

export const QUESTIONS = [...rows, ...paper104, ...paper105] as Question[];
