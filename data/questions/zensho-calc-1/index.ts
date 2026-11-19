import type { Question } from "@/lib/questions/types";
import paper1 from "./2025-second.json";
import paper2 from "./2025-first.json";
import paper3 from "./2024-second.json";

export const ZENSHO_CALC_1_QUESTIONS = [
  ...paper1,
  ...paper2,
  ...paper3,
] as Question[];
