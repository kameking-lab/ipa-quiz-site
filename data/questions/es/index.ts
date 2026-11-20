import { appendReplenishedQuestions } from "../published";
import officialWrittenQuestions from "./official-2025-autumn-pm2.json";


import { ES_OFFICIAL_2023_AUTUMN_PM2 } from "./official-2023-autumn-pm2";

import { ES_QUESTIONS_2022_AUTUMN_PM1 } from "./by-year/2022-autumn-pm1";


import official2021AutumnPM2 from "./official-2021-autumn-pm2.json";

import official2016SpringPm2 from "./official-2016-spring-pm2.json";


import official2016SpringPm1 from "./official-2016-spring-pm1.json";

import plan7224 from "./official-2017-spring-am2.json";


import official2016SpringAm2 from "./official-2016-spring-am2.json";

import official2020AutumnPm1 from "./official-2020-autumn-pm1.json";
import official2020AutumnPm2 from "./official-2020-autumn-pm2.json";


import { applyIpaCorrections } from "../corrections";


import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";


import type { Question } from "@/lib/questions/types";


import { BY_YEAR_QUESTIONS } from "./by-year";


import { ES_2023_AUTUMN_PM1_QUESTIONS } from "./2023-autumn-pm1";


import cxK6ChoiceExplanations from "./choice-explanations-cx-k6.json";


import official2025Autumn from "./2025-autumn-pm1-official-qb1.json";


import official2024AutumnPm1 from "./official-2024-autumn-pm1.json";

import afternoonPlan5 from "./2024-autumn-pm2-plan5-qc4.json";

import official2017SpringPm1 from "./official-2017-spring-pm1.json";

import official2017SpringPm2 from "./official-2017-spring-pm2.json";


import official2019SpringAm2 from "./official-2019-spring-am2.json";

import official2018SpringAm2 from "./official-2018-spring-am2.json";

const RAW_ES_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...(officialWrittenQuestions as Question[])];

// Keep independent overlays ordered, after the official question corrections.
const CHOICE_EXPLANATION_OVERLAYS: unknown[] = [cxK6ChoiceExplanations];

export const ES_QUESTIONS: Question[] = appendReplenishedQuestions([...CHOICE_EXPLANATION_OVERLAYS.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("es", RAW_ES_QUESTIONS),
), ...official2025Autumn as Question[]], [
  ES_OFFICIAL_2023_AUTUMN_PM2,
  ES_QUESTIONS_2022_AUTUMN_PM1,
  official2021AutumnPM2,
  official2016SpringPm2,
  official2016SpringPm1,
  plan7224,
  official2016SpringAm2,
  official2020AutumnPm1,
  official2020AutumnPm2,
  ES_2023_AUTUMN_PM1_QUESTIONS,
  official2024AutumnPm1,
  afternoonPlan5,
  official2017SpringPm1,
  official2017SpringPm2,
  official2019SpringAm2,
  official2018SpringAm2,
]);
