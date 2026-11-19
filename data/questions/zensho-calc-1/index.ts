import type { Question } from "@/lib/questions/types";
import paper1 from "./2025-second.json";
import paper2 from "./2025-first.json";

export const ZENSHO_CALC_1_QUESTIONS = [
  ...paper1,
  ...paper2,
] as Question[];
