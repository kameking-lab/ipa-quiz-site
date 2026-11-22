import { appendReplenishedQuestions } from "../published";
import grade1Round71 from "./2023-71-1.json";
import grade2Round71 from "./2023-71-2.json";
import grade3Round71 from "./2023-71-3.json";
import source from "./2025-round2-1kyu.json";

import questions from "./2026-76-1.json";


import data from "./2026-76.json";


import type { Question } from "@/lib/questions/types";
import round69Grade1 from "./2022-69-1.json";
import round69Grade2 from "./2022-69-2.json";
import round69Grade3 from "./2022-69-3.json";

import paper1 from "./2026-76-3.json";

export const ZENSHO_ENGLISH_QUESTIONS = appendReplenishedQuestions(source as Question[], [
  questions,
  data,
  paper1,
  grade1Round71,
  grade2Round71,
  grade3Round71,
  round69Grade1,
  round69Grade2,
  round69Grade3,
]);
