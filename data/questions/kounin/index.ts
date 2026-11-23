import { appendReplenishedQuestions } from "../published";
import paper0 from "./2025-round1-chemistry.json";


import paper1 from "./2025-round1-history.json";


import paper2 from "./2025-round1-japanese.json";


import paper3 from "./2025-round2-japanese.json";

import source from "./2025-round1-kokyo.json";


import biology from "./2025-round1-kiso.json";

import earthScience from "./2025-round2-chigaku-kiso.json";

import source2025Round2GakkaIv from "./2025-round2-gakka-IV.json";


import source2025Round2GakkaIii from "./2025-round2-gakka-III.json";


import source2025Round2GakkaIi from "./2025-round2-gakka-II.json";


import initial from "./2025-round2-gakka-I.json";


import type { Question } from "@/lib/questions/types";

import geography from "./2025-round1-tiri.json";

import english from "./2025-round1-gakka-III.json";

import physics from "./2025-round2-theory.json";

export const KOUNIN_QUESTIONS = appendReplenishedQuestions([...paper0, ...paper1, ...paper2, ...paper3, ...biology, ...earthScience, ...initial, ...source2025Round2GakkaIi, ...source2025Round2GakkaIii, ...source2025Round2GakkaIv, ...physics] as Question[], [
  source,
  geography,
  english,
]);


import rows from "./2025-first-math.json";


import history from "./2025-second-history.json";

export const QUESTIONS = [...rows, ...history] as Question[];
