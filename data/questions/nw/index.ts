import { appendReplenishedQuestions } from "../published";
import officialWrittenQuestions from "./official-2025-spring-pm1.json";


import { NW_OFFICIAL_2023_SPRING_PM1 } from "./official-2023-spring-pm1";

import { NW_QUESTIONS_2023_SPRING_PM2 } from "./by-year/2023-spring-pm2";


import official2021SpringPM1 from "./official-2021-spring-pm1.json";


import official2018AutumnPm1 from "./official-2018-autumn-pm1.json";


import { applyIpaCorrections } from "../corrections";


import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";


import type { Question } from "@/lib/questions/types";


import { BY_YEAR_QUESTIONS } from "./by-year";


import { NW_2024_SPRING_PM2_QUESTIONS } from "./2024-spring-pm2";

import official2017AutumnPm2 from "./official-2017-autumn-pm2.json";


import choiceExplanationsCxK8 from "./choice-explanations-cx-k8.json";


import official2025SpringPm2 from "./official-2025-spring-pm2.json";

import afternoonPlan5 from "./2024-spring-pm1-plan5-qb4.json";


import official2021SpringPm2 from "./nw-2021h-pm2-official.json";


import plan7_032 from "./plan7-032.json";


import plan7_035 from "./plan7-035.json";

import official2019AutumnPm1 from "./official-2019-autumn-pm1.json";


import { NW_2019_AUTUMN_PM2_QUESTIONS } from "./2019-autumn-pm2";

import official2018AutumnPm2 from "./official-2018-autumn-pm2.json";


import official2016AutumnPm1 from "./official-2016-autumn-pm1.json";

const RAW_NW_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...(officialWrittenQuestions as Question[])];

const CHOICE_EXPLANATION_OVERLAYS: unknown[] = [choiceExplanationsCxK8];

export const NW_QUESTIONS: Question[] = appendReplenishedQuestions(CHOICE_EXPLANATION_OVERLAYS.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("nw", RAW_NW_QUESTIONS),
), [
  NW_OFFICIAL_2023_SPRING_PM1,
  NW_QUESTIONS_2023_SPRING_PM2,
  official2021SpringPM1,
  official2018AutumnPm1,
  NW_2024_SPRING_PM2_QUESTIONS,
  official2017AutumnPm2,
  official2025SpringPm2,
  afternoonPlan5,
  official2021SpringPm2,
  plan7_032,
  plan7_035,
  official2019AutumnPm1,
  NW_2019_AUTUMN_PM2_QUESTIONS,
  official2018AutumnPm2,
  official2016AutumnPm1,
]);
