import text2022 from "./2022-annual-text.json";

import completion2022A from "./official-2022-a-qd12.json";


import paperB2022 from "./2022-annual-b.json";

import paperC2022 from "./2022-annual-c.json";

import text2024 from "./2024-annual-text.json";

import text2023 from "./2023-annual-text.json";


import mondaiB2024 from "./2024-mondai-b.json";

import c2024 from "./2024-mondai-c.json";

import plan5a2023 from "./2023-annual-mondai-a-plan5.json";


import mondaiB2023 from "./2023-mondai-b.json";


import paperD2023 from "./2023-annual-d.json";

import type { Question } from "@/lib/questions/types";

import latestTwo from "./latest-two.json";

import officialD2022 from "./2022-mondai-d-official-qc1.json";

import plan5Qd4 from "./2024-a-plan5-qd4.json";


import paper117D from "./2024-mondai-d.json";

import c116first20 from "./2023-annual-c-first20.json";

import c116completion from "./2023-annual-c-completion.json";


/** Only independently reviewed questions are eligible for publication. */
export const SHIKA_ISHI_QUESTIONS: Question[] = ([...paper117D, ...text2024, ...mondaiB2024, ...c2024, ...text2023, ...plan5a2023, ...mondaiB2023, ...paperD2023, ...text2022, ...c116first20, ...c116completion, ...completion2022A, ...paperB2022, ...paperC2022, ...latestTwo, ...officialD2022, ...plan5Qd4] as Question[]).filter(question => question.needsReview === false);
