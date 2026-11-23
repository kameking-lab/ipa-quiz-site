import { appendReplenishedQuestions } from "../published";
import officialWrittenQuestions from "./official-2024-autumn-pm1.json";

import { AU_OFFICIAL_2022_AUTUMN_PM1 } from "./official-2022-autumn-pm1";


import { AU_QUESTIONS_2022_AUTUMN_PM2 } from "./by-year/2022-autumn-pm2";


import plan7116 from "./official-2016-spring-am2.json";

import plan7114 from "./official-2017-spring-pm1.json";

import plan7112 from "./official-2018-spring-pm2.json";

import official2016SpringPm1 from "./official-2016-spring-pm1.json";


import official2017SpringPm2 from "./official-2017-spring-pm2.json";
import official2016SpringPm2 from "./official-2016-spring-pm2.json";

import { applyIpaCorrections } from "../corrections";

import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

import type { Question } from "@/lib/questions/types";

import { BY_YEAR_QUESTIONS } from "./by-year";

import { AU_2023_AUTUMN_PM2_QUESTIONS } from "./2023-autumn-pm2";

import cxK6auChoiceExplanations from "./choice-explanations-cx-k6au.json";

import official2025Autumn from "./2025-autumn-pm2-official-qb1.json";

import official2024AutumnPm2 from "./official-2024-autumn-pm2.json";


import afternoonPlan5 from "./2023-autumn-pm1-plan5-qb4.json";


import official2025AutumnPm1 from "./2025-autumn-pm1-official-qb14.json";

import { AU_2020_AUTUMN_PM1_QUESTIONS } from "./2020-autumn-pm1";

import { AU_2019_SPRING_AM2_QUESTIONS } from "./2019-spring-am2";


import official2019SpringPm1 from "./official-2019-spring-pm1.json";


import official2018SpringAm2 from "./official-2018-spring-am2.json";

import official2020AutumnPm2 from "./official-2020-autumn-pm2.json";


import official2019SpringPm2 from "./official-2019-spring-pm2.json";


import official2018SpringPm1 from "./official-2018-spring-pm1.json";


import official2017SpringAm2 from "./official-2017-spring-am2.json";


const RAW_AU_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...(officialWrittenQuestions as Question[])];


const CHOICE_EXPLANATION_OVERLAYS: unknown[] = [cxK6auChoiceExplanations];


export const AU_QUESTIONS: Question[] = appendReplenishedQuestions([...CHOICE_EXPLANATION_OVERLAYS.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("au", RAW_AU_QUESTIONS),
), ...official2025Autumn as Question[]], [
  AU_OFFICIAL_2022_AUTUMN_PM1,
  AU_QUESTIONS_2022_AUTUMN_PM2,
  plan7116,
  plan7114,
  plan7112,
  official2016SpringPm1,
  official2017SpringPm2,
  official2016SpringPm2,
  AU_2023_AUTUMN_PM2_QUESTIONS,
  official2024AutumnPm2,
  afternoonPlan5,
  official2025AutumnPm1,
  AU_2020_AUTUMN_PM1_QUESTIONS,
  AU_2019_SPRING_AM2_QUESTIONS,
  official2019SpringPm1,
  official2018SpringAm2,
  official2020AutumnPm2,
  official2019SpringPm2,
  official2018SpringPm1,
  official2017SpringAm2,
]);
