import { appendReplenishedQuestions } from "../published";
import officialWrittenQuestions from "./official-2023-spring-pm1.json";


import { SA_OFFICIAL_2021_SPRING_PM1 } from "./official-2021-spring-pm1";

import { SA_QUESTIONS_2021_SPRING_PM2 } from "./by-year/2021-spring-pm2";


import officialQb12 from "./official-2025-spring-pm1-qb12.json";

import officialQb13 from "./official-2025-spring-pm2.json";

import official2016AutumnPm2 from "./official-2016-autumn-pm2.json";

import plan7095 from "./official-2016-autumn-pm1.json";
import official2018AutumnPm1 from "./official-2018-autumn-pm1.json";


import { applyIpaCorrections } from "../corrections";


import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";


import type { Question } from "@/lib/questions/types";


import { BY_YEAR_QUESTIONS } from "./by-year";


import laneChoiceExplanations from "./choice-explanations-cx-k8sa.json";


import official2024Spring from "./2024-spring-pm2-official-qb1.json";


import official2023SpringPm2 from "./official-2023-spring-pm2.json";

import afternoonPlan5 from "./2022-spring-pm1-plan5-qb4.json";


import { SA_2022_SPRING_PM2_QUESTIONS } from "./2022-spring-pm2";

import official2024SpringPm1 from "./2024-spring-pm1-official-qb14.json";

import official2017AutumnPm2 from "./official-2017-autumn-pm2.json";


import official2019AutumnPm1 from "./official-2019-autumn-pm1.json";

import official2017AutumnPm1 from "./official-2017-autumn-pm1.json";

const RAW_SA_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...(officialWrittenQuestions as Question[])];

const CHOICE_EXPLANATION_OVERLAYS = [laneChoiceExplanations];

const QB13_OFFICIAL_QUESTIONS: Question[] = CHOICE_EXPLANATION_OVERLAYS.reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("sa", RAW_SA_QUESTIONS),
);

export const SA_QUESTIONS: Question[] = appendReplenishedQuestions([...CHOICE_EXPLANATION_OVERLAYS.reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("sa", RAW_SA_QUESTIONS),
), ...official2024Spring as Question[]], [
  SA_OFFICIAL_2021_SPRING_PM1,
  SA_QUESTIONS_2021_SPRING_PM2,
  officialQb12,
  officialQb13,
  official2016AutumnPm2,
  plan7095,
  official2018AutumnPm1,
  official2023SpringPm2,
  afternoonPlan5,
  SA_2022_SPRING_PM2_QUESTIONS,
  official2024SpringPm1,
  official2017AutumnPm2,
  official2019AutumnPm1,
  official2017AutumnPm1,
]);
