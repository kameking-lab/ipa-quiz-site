// AP午後問題のバレルファイル。実データはモック。
// 本番データは scripts/parse-afternoon/parse-ap-afternoon.ts で生成する。
import type { AfternoonQuestion } from "@/lib/afternoon/types";
import { AP_AFTERNOON_2024_SPRING } from "./2024-spring";
import { AP_AFTERNOON_2023_AUTUMN } from "./2023-autumn";
import { AP_AFTERNOON_2023_SPRING } from "./2023-spring";

export const AP_AFTERNOON_QUESTIONS: AfternoonQuestion[] = [
  ...AP_AFTERNOON_2024_SPRING,
  ...AP_AFTERNOON_2023_AUTUMN,
  ...AP_AFTERNOON_2023_SPRING,
];
