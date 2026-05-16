// AU 午後II（論述式）問題のバレルファイル。
import type { AfternoonQuestion } from "@/lib/afternoon/types";
import { AU_AFTERNOON_2023_AUTUMN } from "./2023-autumn";
import { AU_AFTERNOON_2024_AUTUMN } from "./2024-autumn";
import { AU_AFTERNOON_2025_AUTUMN } from "./2025-autumn";

export const AU_AFTERNOON_QUESTIONS: AfternoonQuestion[] = [
  ...AU_AFTERNOON_2025_AUTUMN,
  ...AU_AFTERNOON_2024_AUTUMN,
  ...AU_AFTERNOON_2023_AUTUMN,
];
