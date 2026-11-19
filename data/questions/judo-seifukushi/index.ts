import { appendReplenishedQuestions } from "../published";
import type { Question } from "@/lib/questions/types";


import round31Morning from "./2022-annual-am-plan5.json";


import round30Morning from "./2021-annual-am.json";

import originals from "./questions.json";

import thirtySecondMorning from "./2023-annual-am.json";

import afternoon2023 from "./2023-pm-plan5.json";

import round31Afternoon from "./2022-annual-pm-plan5.json";

import pm2021 from "./2021-annual-pm.json";


/** Only source-verified originals with all four explanations enter practice. */
export const JUDO_SEIFUKUSHI_QUESTIONS: Question[] = appendReplenishedQuestions(([...originals, ...thirtySecondMorning] as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber), [
  round31Morning,
  round30Morning,
  afternoon2023,
  round31Afternoon,
  pm2021,
]);
