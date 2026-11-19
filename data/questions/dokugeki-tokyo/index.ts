import type { Question } from "@/lib/questions/types";
import ippan2026 from "./2026-ippan.json";
import nougyou2026 from "./2026-nougyou.json";
import tokutei2026 from "./2026-tokutei.json";

export const DOKUGEKI_TOKYO_QUESTIONS = [
  ...ippan2026,
  ...nougyou2026,
  ...tokutei2026,
] as Question[];
