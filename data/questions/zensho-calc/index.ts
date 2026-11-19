import { appendReplenishedQuestions } from "../published";
import paper0 from "./2025-151-gakka.json";


import source from "./2025-annual-gakka.json";

import business from "./2025-annual-practical.json";


import source2026Round2 from "./2026-round2.json";

import initial from "./2026-round1.json";

import type { Question } from "@/lib/questions/types";


import questions from "./2026-152-gakka.json";


import data from "./2025-151-grade1-business.json";

import paper1 from "./2026-152-business2.json";

import paper2 from "./2026-152-ordinary1.json";


import questions20261533ordinary from "./2026-153-3-ordinary.json";

import ordinary2026 from "./2026-152-ordinary2.json";

import business2026 from "./2026-153-business3.json";


export const ZENSHO_CALC_QUESTIONS = appendReplenishedQuestions([...paper0, ...source, ...business, ...initial, ...source2026Round2, ...paper1, ...paper2, ...questions, ...questions20261533ordinary, ...ordinary2026, ...business2026] as Question[], [
  data,
]);

import rows from "./151-2.json";


export const QUESTIONS = rows as Question[];
