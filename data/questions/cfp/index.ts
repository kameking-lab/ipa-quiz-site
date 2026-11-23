import { appendReplenishedQuestions } from "../published";
import finance from "./2026-round1-finance-selected.json";


import riskRound1 from "./2026-round1-risk.json";


import riskRound2 from "./2026-round2-risk.json";

import finance2026Round2 from "./2026-round2-finance.json";


import type { Question } from "@/lib/questions/types";

import data from "./2026-round1-finance-supplement.json";

export const CFP_QUESTIONS = appendReplenishedQuestions([...finance, ...riskRound1, ...riskRound2] as Question[], [
  finance2026Round2,
  data,
]);
