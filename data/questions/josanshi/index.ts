import type { Question } from "@/lib/questions/types";


import baseline from "./medical34-live.json";


import additions from "./latest-two-additions.json";


import paper2023 from "./2023-annual.json";

import paper2023AmCompletion from "./2023-annual-am-completion.json";


import paper2022 from "./2022-annual.json";


import paper2021 from "./2021-annual.json";


import paper106Am from "./2022-am-completion-qd1.json";


import plan5Completion from "./plan5-170-completion.json";

import completion2022 from "./2021-annual-am-completion45.json";


import paper2021Pm from "./2021-annual-pm-plan5-qe4.json";

/** 第109・108回219問、過年度の午前各10問、第106回午前の不足44問。採点除外は別記録。 */
export const JOSANSHI_QUESTIONS: Question[] = ([...baseline, ...additions, ...paper2023, ...paper2023AmCompletion, ...paper2022, ...paper2021, ...paper106Am, ...plan5Completion, ...completion2022, ...paper2021Pm] as Question[]).filter(
  question => question.needsReview === false,
).sort(
  (a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber,
);
