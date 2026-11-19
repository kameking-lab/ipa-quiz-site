import type { Question } from "@/lib/questions/types";
import ippan2025 from "./2025-ippan.json";
import nougyou2025 from "./2025-nougyou.json";
import tokutei2025 from "./2025-tokutei.json";

export const DOKUGEKI_KANSAI_QUESTIONS = [
  ...ippan2025,
  ...nougyou2025,
  ...tokutei2025,
] as Question[];
