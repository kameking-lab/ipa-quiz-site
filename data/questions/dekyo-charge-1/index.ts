import { appendReplenishedQuestions } from "../published";
import paper0 from "./2026-first-kiso.json";

import paper1 from "./2025-second-kiso.json";

import paper2 from "./2025-first-kiso.json";

import paper3 from "./2026-first-theory.json";

import paper4 from "./2026-first-houki.json";

import paper5 from "./2025-second-theory.json";

import paper6 from "./2025-second-houki.json";

import paper7 from "./2025-first-theory.json";

import paper8 from "./2025-first-houki.json";
import type { Question } from "@/lib/questions/types";

import data0 from "./2026-round1.json";

import data1 from "./2025-round2.json";

import data2 from "./2025-round1.json";


export const DEKYO_CHARGE_1_QUESTIONS: Question[] = appendReplenishedQuestions([...data0, ...data1, ...data2] as Question[], [
  paper0,
  paper1,
  paper2,
  paper3,
  paper4,
  paper5,
  paper6,
  paper7,
  paper8,
]);
