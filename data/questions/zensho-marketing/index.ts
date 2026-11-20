import { appendReplenishedQuestions } from "../published";
import year2024 from "./2024-annual.json";


import year2025 from "./2025-annual.json";


import type { Question } from "@/lib/questions/types";


import source2022 from "./2022-annual.json";

import paper1 from "./2021-36-marketing.json";

export const ZENSHO_MARKETING_QUESTIONS = appendReplenishedQuestions([...year2024, ...year2025] as Question[], [
  source2022,
  paper1,
]);
