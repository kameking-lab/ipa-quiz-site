import { appendReplenishedQuestions } from "../published";
import officialWrittenQuestions from "./official-2022-autumn-pm2.json";

import official2025AutumnPM2 from "./official-2025-autumn-pm2.json";

import officialQb12 from "./official-2024-autumn-pm2-qb12.json";


import officialQb13 from "./official-2023-autumn-pm1.json";


import official2017SpringAm2 from "./official-2017-spring-am2.json";

import official2020AutumnPm2 from "./official-2020-autumn-pm2.json";

import official2020AutumnPm1 from "./official-2020-autumn-pm1.json";


import official2017SpringPm2 from "./official-2017-spring-pm2.json";

import official2017SpringPm1 from "./official-2017-spring-pm1.json";
import official2016SpringPm1 from "./official-2016-spring-pm1.json";


import { applyIpaCorrections } from "../corrections";


import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";


import type { Question } from "@/lib/questions/types";


import { BY_YEAR_QUESTIONS } from "./by-year";


import cxK5ChoiceExplanations from "./choice-explanations-cx-k5.json";


import official2022Autumn from "./2022-autumn-pm1-official-qb1.json";


import official2021AutumnPm1 from "./official-2021-autumn-pm1.json";

import afternoonPlan5 from "./2021-autumn-pm2-plan5-qc4.json";

import official2024AutumnPm1 from "./pm-2024a-pm1-official.json";


import official2023AutumnPm2 from "./2023-autumn-pm2-official-qb14.json";


import plan7_134 from "./plan7-134.json";


import plan7_144 from "./plan7-144.json";

import official2018SpringAm2 from "./official-2018-spring-am2.json";


import { PM_2019_SPRING_PM2_QUESTIONS } from "./2019-spring-pm2";


import { PM_2016_SPRING_AM2_QUESTIONS } from "./2016-spring-am2";

import official2018SpringPm2 from "./official-2018-spring-pm2.json";


import official2018SpringPm1 from "./official-2018-spring-pm1.json";

const RAW_PM_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...(officialWrittenQuestions as Question[])];


// Keep overlays ordered so future independent batches can be layered here.
const QB13_OFFICIAL_QUESTIONS: Question[] = [cxK5ChoiceExplanations].reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("pm", RAW_PM_QUESTIONS),
);

// Keep overlays ordered so future independent batches can be layered here.
export const PM_QUESTIONS: Question[] = appendReplenishedQuestions([...[cxK5ChoiceExplanations].reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("pm", RAW_PM_QUESTIONS),
), ...official2022Autumn as Question[]], [
  official2025AutumnPM2,
  officialQb12,
  officialQb13,
  official2017SpringAm2,
  official2020AutumnPm2,
  official2020AutumnPm1,
  official2017SpringPm2,
  official2017SpringPm1,
  official2016SpringPm1,
  official2021AutumnPm1,
  afternoonPlan5,
  official2024AutumnPm1,
  official2023AutumnPm2,
  plan7_134,
  plan7_144,
  official2018SpringAm2,
  PM_2019_SPRING_PM2_QUESTIONS,
  PM_2016_SPRING_AM2_QUESTIONS,
  official2018SpringPm2,
  official2018SpringPm1,
]);
