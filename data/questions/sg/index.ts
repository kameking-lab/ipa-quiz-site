import { appendReplenishedQuestions } from "../published";
import plan7074 from "./official-2017-spring-pm.json";

import official2016AutumnPm from "./official-2016-autumn-pm.json";


import official2016SpringPm from "./official-2016-spring-pm.json";

import official2019AutumnPm from "./official-2019-autumn-pm.json";
import official2019SpringPm from "./official-2019-spring-pm.json";


import { applyIpaCorrections } from "../corrections";


import type { Question } from "@/lib/questions/types";


import { BY_YEAR_QUESTIONS } from "./by-year";


import official2026 from "./sg-2026cbt-kamoku-a-official.json";


import { SG_2018_AUTUMN_PM_QUESTIONS } from "./2018-autumn-pm";

import official2018SpringPm from "./official-2018-spring-pm.json";


import official2017AutumnPm from "./official-2017-autumn-pm.json";

const RAW_SG_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...official2026 as Question[]];

export const SG_QUESTIONS: Question[] = appendReplenishedQuestions(applyIpaCorrections("sg", RAW_SG_QUESTIONS), [
  plan7074,
  official2016AutumnPm,
  official2016SpringPm,
  official2019AutumnPm,
  official2019SpringPm,
  SG_2018_AUTUMN_PM_QUESTIONS,
  official2018SpringPm,
  official2017AutumnPm,
]);
