// ST午後II（論述式）問題のバレルファイル。
import type { AfternoonQuestion } from "@/lib/afternoon/types";
import { ST_AFTERNOON_2023_SPRING } from "./2023-spring";
import { ST_AFTERNOON_2024_SPRING } from "./2024-spring";
import { ST_AFTERNOON_2025_SPRING } from "./2025-spring";

export const ST_AFTERNOON_QUESTIONS: AfternoonQuestion[] = [
  ...ST_AFTERNOON_2025_SPRING,
  ...ST_AFTERNOON_2024_SPRING,
  ...ST_AFTERNOON_2023_SPRING,
];
