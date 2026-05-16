// SA 午後II（論述式）問題のバレルファイル。
import type { AfternoonQuestion } from "@/lib/afternoon/types";
import { SA_AFTERNOON_2023_SPRING } from "./2023-spring";
import { SA_AFTERNOON_2024_SPRING } from "./2024-spring";
import { SA_AFTERNOON_2025_SPRING } from "./2025-spring";

export const SA_AFTERNOON_QUESTIONS: AfternoonQuestion[] = [
  ...SA_AFTERNOON_2025_SPRING,
  ...SA_AFTERNOON_2024_SPRING,
  ...SA_AFTERNOON_2023_SPRING,
];
