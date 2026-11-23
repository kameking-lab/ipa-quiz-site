import { appendReplenishedQuestions } from "../published";
import { DB_OFFICIAL_2025_AUTUMN_PM2 } from "./official-2025-autumn-pm2";


import { DB_QUESTIONS_2024_AUTUMN_PM1 } from "./by-year/2024-autumn-pm1";

import official2023AutumnPM2 from "./official-2023-autumn-pm2.json";

import officialQb12 from "./official-2022-autumn-pm2-qb12.json";


import officialQb13 from "./official-2021-autumn-pm1.json";


import plan7175 from "./official-2017-spring-pm1.json";

import plan7174 from "./official-2017-spring-am2.json";

import plan7173 from "./official-2018-spring-pm2.json";

import official2016SpringPm1 from "./official-2016-spring-pm1.json";


import official2016SpringAm2 from "./official-2016-spring-am2.json";


import official2017SpringPm2 from "./official-2017-spring-pm2.json";
import official2016SpringPm2 from "./official-2016-spring-pm2.json";

import { applyIpaCorrections } from "../corrections";


import type { Question } from "@/lib/questions/types";


import { BY_YEAR_QUESTIONS } from "./by-year";


import { DB_2025_AUTUMN_PM1_QUESTIONS } from "./2025-autumn-pm1";


import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";


import cxK5dbChoiceExplanations from "./choice-explanations-cx-k5db.json";

import official2022AutumnPm1 from "./db-2022a-pm1-official.json";


import official2021AutumnPm2 from "./2021-autumn-pm2-official-qb14.json";

import { DB_2020_AUTUMN_PM1_QUESTIONS } from "./2020-autumn-pm1";


import official2019SpringAm2 from "./official-2019-spring-am2.json";


import official2019SpringPm1 from "./official-2019-spring-pm1.json";

import official2020AutumnPm2 from "./official-2020-autumn-pm2.json";


import official2019SpringPm2 from "./official-2019-spring-pm2.json";


import official2018SpringAm2 from "./official-2018-spring-am2.json";


import official2018SpringPm1 from "./official-2018-spring-pm1.json";

const RAW_DB_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...DB_2025_AUTUMN_PM1_QUESTIONS];


// Keep independent overlays in order, after the existing official corrections.
const QB13_OFFICIAL_QUESTIONS: Question[] = [cxK5dbChoiceExplanations].reduce(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("db", RAW_DB_QUESTIONS),
);

// Keep independent overlays in order, after the existing official corrections.
export const DB_QUESTIONS: Question[] = appendReplenishedQuestions([...QB13_OFFICIAL_QUESTIONS, ...(officialQb13 as Question[])], [
  DB_OFFICIAL_2025_AUTUMN_PM2,
  DB_QUESTIONS_2024_AUTUMN_PM1,
  official2023AutumnPM2,
  officialQb12,
  plan7175,
  plan7174,
  plan7173,
  official2016SpringPm1,
  official2016SpringAm2,
  official2017SpringPm2,
  official2016SpringPm2,
  official2022AutumnPm1,
  official2021AutumnPm2,
  DB_2020_AUTUMN_PM1_QUESTIONS,
  official2019SpringAm2,
  official2019SpringPm1,
  official2020AutumnPm2,
  official2019SpringPm2,
  official2018SpringAm2,
  official2018SpringPm1,
]);
