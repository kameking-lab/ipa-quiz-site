import { appendReplenishedQuestions } from "../published";
import { ST_OFFICIAL_2024_SPRING_PM1 } from "./official-2024-spring-pm1";


import { ST_QUESTIONS_2024_SPRING_PM2 } from "./by-year/2024-spring-pm2";

import official2022SpringPM1 from "./official-2022-spring-pm1.json";

import officialQb12 from "./official-2021-spring-pm1-qb12.json";


import officialQb13 from "./official-2021-spring-pm2.json";

import official2019AutumnPm1 from "./official-2019-autumn-pm1.json";


import official2017AutumnPm2 from "./official-2017-autumn-pm2.json";

import official2018AutumnPm1 from "./official-2018-autumn-pm1.json";

import official2016AutumnPm2 from "./official-2016-autumn-pm2.json";

import { mergeStAccepted399 } from "./accepted399-20261024";

import { applyIpaCorrections } from "../corrections";

import { applyIpaChoiceExplanationAdditions } from "../corrections/choice-explanations-20261118";

import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

import type { Question } from "@/lib/questions/types";

import { BY_YEAR_QUESTIONS } from "./by-year";

import { ST_2025_SPRING_PM2_QUESTIONS } from "./2025-spring-pm2";

import choiceExplanations from "./choice-explanations-2024-2025.json";

import allYearChoiceExplanations from "./choice-explanations-all-years.json";

import allYearExplanationRepairs from "./explanation-repairs-all-years.json";

import residualCorrections from "./residual-source-corrections-20261011.json";

import residualChoiceExplanations from "./choice-explanations-residual-20261011.json";

import afternoonPlan5 from "./2025-spring-pm1-plan5-qb4.json";

import official2022SpringPm2 from "./st-2022h-pm2-official.json";


import plan7_098 from "./plan7-098.json";

import official2018AutumnPm2 from "./official-2018-autumn-pm2.json";


const RAW_ST_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...(afternoonPlan5 as Question[])];


const CURRENT_ST_QUESTIONS: Question[] = mergeStAccepted399(applyChoiceExplanationOverlay(
  applyIpaCorrections("st", RAW_ST_QUESTIONS),
  choiceExplanations,
));


// The older PR predates accepted399. Fill its remaining gaps without replacing
// already accepted originals, official answers, or reviewed explanations.
const eligibleIds = new Set(CURRENT_ST_QUESTIONS.filter(q => !q.choiceExplanations).map(q => q.id));

const gapExplanations = Object.fromEntries(
  Object.entries(allYearChoiceExplanations).filter(([id]) => eligibleIds.has(id)),
);

const explanationRepairs: Record<string, string> = allYearExplanationRepairs;

export const ST_PR718_ADOPTED_IDS = Object.keys(gapExplanations);


const EXPLAINED_ST_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  CURRENT_ST_QUESTIONS.map(q => gapExplanations[q.id] && explanationRepairs[q.id]
    ? { ...q, explanation: explanationRepairs[q.id] }
    : q),
  gapExplanations,
);


const sourceCorrections: Record<string, Partial<Question>> = residualCorrections;

const residualIds = new Set(EXPLAINED_ST_QUESTIONS.filter(q => !q.choiceExplanations).map(q => q.id));

const residualReasons = Object.fromEntries(
  Object.entries(residualChoiceExplanations).filter(([id]) => residualIds.has(id)),
);

export const ST_PR757_ADOPTED_IDS = Object.keys(residualReasons);

const QB13_OFFICIAL_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  EXPLAINED_ST_QUESTIONS.map(q => {
    if (residualReasons[q.id]) return { ...q, ...sourceCorrections[q.id] };
    return q;
  }),
  residualReasons,
);

const RESOLVED_ST_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  EXPLAINED_ST_QUESTIONS.map(q => {
    if (residualReasons[q.id]) return { ...q, ...sourceCorrections[q.id] };
    return q;
  }),
  residualReasons,
);

export const ST_QUESTIONS: Question[] = appendReplenishedQuestions([...QB13_OFFICIAL_QUESTIONS, ...(officialQb13 as Question[])], [
  ST_OFFICIAL_2024_SPRING_PM1,
  ST_QUESTIONS_2024_SPRING_PM2,
  official2022SpringPM1,
  officialQb12,
  official2019AutumnPm1,
  official2017AutumnPm2,
  official2018AutumnPm1,
  official2016AutumnPm2,
  ST_2025_SPRING_PM2_QUESTIONS,
  official2022SpringPm2,
  plan7_098,
  official2018AutumnPm2,
]);
