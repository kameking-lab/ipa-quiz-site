import { appendReplenishedQuestions } from "../published";
import officialWrittenQuestions from "./official-2022-spring-pm1.json";

import official2025SpringPM1 from "./official-2025-spring-pm1.json";

import officialQb12 from "./official-2024-spring-pm1-qb12.json";


import officialQb13 from "./official-2024-spring-pm2.json";


import official2019AutumnAm2 from "./official-2019-autumn-am2.json";

import official2018AutumnAm2 from "./official-2018-autumn-am2.json";


import official2019AutumnPm1 from "./official-2019-autumn-pm1.json";
import official2019AutumnPm2 from "./official-2019-autumn-pm2.json";

import { applyIpaCorrections } from "../corrections";

import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

import type { Question } from "@/lib/questions/types";

import { BY_YEAR_QUESTIONS } from "./by-year";

import { SM_2021_SPRING_PM2_QUESTIONS } from "./2021-spring-pm2";

import laneChoiceExplanations from "./choice-explanations-cx-k8sm.json";

import official2023Spring from "./2023-spring-pm2-official-qb1.json";

import official2022SpringPm2 from "./official-2022-spring-pm2.json";


import afternoonPlan5 from "./2021-spring-pm1-plan5-qb4.json";

import official2025SpringPm2 from "./sm-2025h-pm2-official.json";


import official2023SpringPm1 from "./2023-spring-pm1-official-qb14.json";

import plan7_125 from "./plan7-125.json";


import official2016AutumnPm1 from "./official-2016-autumn-pm1.json";


import official2016AutumnPm2 from "./official-2016-autumn-pm2.json";


const RAW_SM_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...(officialWrittenQuestions as Question[])];


// Apply overlays after official corrections; preserve existing explanations for
// questions not included in a later overlay.
const QB13_OFFICIAL_QUESTIONS: Question[] = [laneChoiceExplanations].reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("sm", RAW_SM_QUESTIONS),
);


// Apply overlays after official corrections; preserve existing explanations for
// questions not included in a later overlay.
export const SM_QUESTIONS: Question[] = appendReplenishedQuestions([...[laneChoiceExplanations].reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("sm", RAW_SM_QUESTIONS),
), ...official2023Spring as Question[]], [
  official2025SpringPM1,
  officialQb12,
  officialQb13,
  official2019AutumnAm2,
  official2018AutumnAm2,
  official2019AutumnPm1,
  official2019AutumnPm2,
  SM_2021_SPRING_PM2_QUESTIONS,
  official2022SpringPm2,
  afternoonPlan5,
  official2025SpringPm2,
  official2023SpringPm1,
  plan7_125,
  official2016AutumnPm1,
  official2016AutumnPm2,
]);
