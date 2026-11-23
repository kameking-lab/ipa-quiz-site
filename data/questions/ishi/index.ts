import { appendReplenishedQuestions } from "../published";
import data from "./2026-annual-mondai-a.json";


import data2026 from "./2026-annual-mondai-e.json";

import data2025 from "./2025-annual-mondai-d.json";

import mondaiB from "./2025-annual-mondai-b.json";


import mondaiF from "./2025-annual-mondai-f.json";


import type { Question } from "@/lib/questions/types";


import questions from "./2024-annual-mondai-e.json";


import source2026D from "./2026-annual-mondai-d.json";
import source2026C from "./2026-annual-mondai-c.json";

import source2025C from "./2025-annual-mondai-c.json";

export const ISHI_QUESTIONS = appendReplenishedQuestions(data as Question[], [
  data2026,
  data2025,
  mondaiB,
  mondaiF,
  questions,
  source2026C,
  source2026D,
  source2025C,
]);
