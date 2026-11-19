import text2022 from "./2022-annual-text.json";

import text2023 from "./2023-annual-text.json";

import text2024 from "./2024-annual-text.json";

import completed2024am from "./2024-annual-am-completion.json";

import completed2024pm from "./2024-annual-pm-plan5-qe4.json";


import completed2023am from "./2023-annual-am-completion.json";

import completed2023pm from "./2023-annual-pm.json";

import plan5pm2022 from "./2022-annual-pm-plan5.json";

import type { Question } from "@/lib/questions/types";

import batch1 from "./2025-annual-pm-batch1.json";

import batch2 from "./2025-annual-pm-batch2.json";

import batch2026 from "./2026-annual-pm-batch1.json";

import completed2025am from "./2025-annual-am-completion.json";

import completed2025pm from "./2025-annual-pm-completion.json";

import completed2026am from "./2026-annual-am-completion.json";

import completed2026pm from "./2026-annual-pm-completion.json";


import completed2022am from "./2022-annual-am-completion.json";


/** Original keys, all five reasons and required source figures are checked. */
export const SHINRYO_HOSHASENGISHI_QUESTIONS: Question[] = ([...text2024, ...completed2024am, ...completed2024pm, ...text2023, ...completed2023am, ...text2022, ...completed2023pm, ...completed2022am, ...plan5pm2022, ...batch1, ...batch2, ...batch2026, ...completed2025am, ...completed2025pm, ...completed2026am, ...completed2026pm] as Question[]).filter(question => question.needsReview === false);
