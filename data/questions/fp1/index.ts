import type { Question } from "@/lib/questions/types";

import january2025 from "./2025-january.json";


import may2025 from "./2025-may-gakka.json";


import may2024 from "./2024-may-gakka.json";

import september2024 from "./2024-september-gakka.json";


import launch from "./launch.json";


import addition from "./2026-may-addition.json";

import september2025 from "./2025-september-gakka.json";


import septemberFirstThree from "./2026-september-q01-q03.json";


import septemberReady from "./2026-september-q04-q20-ready.json";


import septemberQ10 from "./2026-september-q10.json";


import september21to35 from "./2026-september-q21-q35.json";


import septemberPrimaryFive from "./2026-september-q22-q25-q26-q29-q31.json";


import septemberOptions from "./2026-september-q21.json";


import septemberNisa from "./2026-september-q23.json";


import september36to50 from "./2026-september-q36-q50.json";


import january from "./2026-january.json";

/** Reviewed basic-paper originals, separated by sitting and original question number. */
export const FP1_QUESTIONS: Question[] = [...january2025, ...may2025, ...may2024, ...september2024, ...launch, ...addition, ...september2025, ...septemberFirstThree, ...septemberReady, ...septemberQ10, ...september21to35, ...septemberPrimaryFive, ...septemberOptions, ...septemberNisa, ...september36to50, ...(january as Question[])]
  .sort((a, b) => a.year - b.year || a.season.localeCompare(b.season) || a.qNumber - b.qNumber) as Question[];
