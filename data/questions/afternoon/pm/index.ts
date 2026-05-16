// PM午後II（論述式）問題のバレルファイル。
import type { AfternoonQuestion } from "@/lib/afternoon/types";
import { PM_AFTERNOON_2023_SPRING } from "./2023-spring";
import { PM_AFTERNOON_2024_SPRING } from "./2024-spring";
import { PM_AFTERNOON_2025_SPRING } from "./2025-spring";

export const PM_AFTERNOON_QUESTIONS: AfternoonQuestion[] = [
  ...PM_AFTERNOON_2025_SPRING,
  ...PM_AFTERNOON_2024_SPRING,
  ...PM_AFTERNOON_2023_SPRING,
];
