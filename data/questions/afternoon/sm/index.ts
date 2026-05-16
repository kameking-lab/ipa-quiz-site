// SM 午後II（論述式）問題のバレルファイル。
import type { AfternoonQuestion } from "@/lib/afternoon/types";
import { SM_AFTERNOON_2023_AUTUMN } from "./2023-autumn";
import { SM_AFTERNOON_2024_AUTUMN } from "./2024-autumn";
import { SM_AFTERNOON_2025_AUTUMN } from "./2025-autumn";

export const SM_AFTERNOON_QUESTIONS: AfternoonQuestion[] = [
  ...SM_AFTERNOON_2025_AUTUMN,
  ...SM_AFTERNOON_2024_AUTUMN,
  ...SM_AFTERNOON_2023_AUTUMN,
];
