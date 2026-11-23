import { appendReplenishedQuestions } from "../published";
import type { Question } from "@/lib/questions/types";

import lab70Afternoon from "./2024-annual-pm.json";

import round69Afternoon from "./2023-annual-pm.json";


import batch1 from "./2025-annual-pm-batch1.json";


import batch2026 from "./2026-annual-pm-batch1.json";


import partial75 from "./partial75-20261011.json";


import publicText3 from "./public-text3-20261015.json";


import selected2024 from "./2024-am-selected.json";


import completed2025am from "./2025-annual-am-plan5-qe4.json";


import selected2024am from "./2024-am-selected.json";


import supplement2024am from "./2024-am-supplement.json";

import remaining9 from "./pr759-remaining9.json";


import plan5Completion from "./plan5-156-completion.json";

import reused30 from "./2026-pm-plan5-reused30.json";

import completion45 from "./2026-pm-plan5-completion45.json";

import completed2025pm from "./2025-annual-pm-completion.json";

const morning2024 = [...selected2024am, ...supplement2024am].sort((a, b) => a.qNumber - b.qNumber);


import plan5Am2023 from "./2023-annual-am-plan5.json";


import paper2022Am from "./2022-annual-am.json";

import official2022pm from "./2022-pm-official.json";

/** Ready-only accepted originals. Remaining source drafts stay outside runtime. */
export const RINSHO_KENSAGISHI_QUESTIONS: Question[] = appendReplenishedQuestions([
  ...([...batch1, ...batch2026, ...partial75, ...publicText3, ...remaining9] as Question[]),
  ...(selected2024 as Question[]),
].filter(question => question.needsReview === false), [
  lab70Afternoon,
  round69Afternoon,
  completed2025am,
  plan5Completion,
  reused30,
  completion45,
  completed2025pm,
  plan5Am2023,
  paper2022Am,
  official2022pm,
]);
