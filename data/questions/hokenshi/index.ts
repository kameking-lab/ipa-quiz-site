import official2019Pm from "./official-2019-annual-pm.json";

import plan7241 from "./2016-annual-am.json";
import official2016AnnualPm from "./official-2016-annual-pm.json";

import type { Question } from "@/lib/questions/types";

import { HOKENSHI_2020_PM_QUESTIONS } from "./2020-annual-pm";


import candidate from "./medical34-live.json";


import completion from "./latest-two-completion-20261011.json";


import morning112 from "./112-am-completion.json";


import paper2023 from "./2023-annual.json";

import paper2023AmCompletion from "./2023-annual-am-completion.json";


import paper2022 from "./2022-annual.json";


import paper2022Pm from "./2022-annual-pm.json";


import paper2021 from "./2021-annual.json";


import paper108Pm from "./2021-pm-official-qd1.json";


import official2024pm from "./2024-pm-official.json";

import completion109Am from "./official-2023-am-qd12.json";

import paper2021AmCompletion from "./2021-annual-am-completion.json";

import paper2017 from "./plan7-239.json";


import paper2020Am from "./2020-annual-am.json";


import official2019 from "./official-2019-annual-am.json";

import { HOKENSHI_2019_PM_QUESTIONS } from "./2019-annual-pm";


import paper2018 from "./2018-annual.json";

import official2017AnnualPm from "./official-2017-annual-pm.json";

/** 第112・111回202問、第110～108回の午前各10問、第108回午後54問。 */
export const HOKENSHI_QUESTIONS: Question[] = ([...(official2017AnnualPm as Question[]), ...candidate, ...completion, ...morning112, ...paper2023, ...paper2023AmCompletion, ...official2024pm, ...paper2022, ...paper2022Pm, ...paper2021, ...paper108Pm, ...completion109Am, ...paper2021AmCompletion, ...official2019Pm, ...paper2017, ...paper2020Am, ...HOKENSHI_2020_PM_QUESTIONS, ...official2019, ...HOKENSHI_2019_PM_QUESTIONS, ...paper2018, ...plan7241, ...official2016AnnualPm] as Question[]).filter(
  question => question.needsReview === false,
).sort(
  (a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber,
);
