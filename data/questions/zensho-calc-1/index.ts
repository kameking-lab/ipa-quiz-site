import type { Question } from "@/lib/questions/types";
import paper1 from "./2025-second.json";
import paper2 from "./2025-first.json";
import paper3 from "./2024-second.json";
import paper4 from "./2024-first.json";
import paper5 from "./2023-second.json";
import paper6 from "./2023-first.json";

export const ZENSHO_CALC_1_QUESTIONS = [
  ...paper1,
  ...paper2,
  ...paper3,
  ...paper4,
  ...paper5,
  ...paper6,
] as Question[];
