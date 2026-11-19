import { appendReplenishedQuestions } from "../published";
import type { Question } from "@/lib/questions/types";


import questions2023 from "./2023-annual.json";


import questions2023Completion from "./2023-completion.json";


import { GYOSEI_2022_QUESTIONS } from "./2022";

import { GYOSEI_2021_QUESTIONS } from "./2021";

import official2020AnnualGakka from "./official-2020-annual-gakka.json";


import { GYOSEI_2024_QUESTIONS } from "./2024";


import { GYOSEI_2025_QUESTIONS } from "./2025";

/** 2023 is partially collected; 2024 and 2025 retain their existing public originals. */
export const GYOSEI_QUESTIONS: Question[] = appendReplenishedQuestions([
  ...GYOSEI_2025_QUESTIONS,
  ...GYOSEI_2024_QUESTIONS,
  ...questions2023 as Question[],
], [
  questions2023Completion,
  GYOSEI_2022_QUESTIONS,
  GYOSEI_2021_QUESTIONS,
  official2020AnnualGakka,
]);
