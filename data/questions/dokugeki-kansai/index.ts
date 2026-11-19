import type { Question } from "@/lib/questions/types";
import ippan2023 from "./2023-ippan.json";
import nougyou2023 from "./2023-nougyou.json";
import tokutei2023 from "./2023-tokutei.json";
import ippan2024 from "./2024-ippan.json";
import nougyou2024 from "./2024-nougyou.json";
import tokutei2024 from "./2024-tokutei.json";
import ippan2025 from "./2025-ippan.json";
import nougyou2025 from "./2025-nougyou.json";
import tokutei2025 from "./2025-tokutei.json";

export const DOKUGEKI_KANSAI_QUESTIONS = [
  ...ippan2025,
  ...nougyou2025,
  ...tokutei2025,
  ...ippan2024,
  ...nougyou2024,
  ...tokutei2024,
  ...ippan2023,
  ...nougyou2023,
  ...tokutei2023,
] as Question[];
