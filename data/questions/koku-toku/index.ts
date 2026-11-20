import type { Question } from "@/lib/questions/types";
import februaryHouki from "./2026-february-houki.json";
import februaryKogaku from "./2026-february-kogaku.json";
import juneHouki from "./2026-june-houki.json";
import juneKogaku from "./2026-june-kogaku.json";
import octoberHouki from "./2025-october-houki.json";
import octoberKogaku from "./2025-october-kogaku.json";
import archive2023FebruaryHouki from "./2023-february-houki.json";
import archive2023FebruaryKogaku from "./2023-february-kogaku.json";

export const KOKU_TOKU_QUESTIONS: Question[] = [
  ...februaryHouki, ...februaryKogaku, ...juneHouki, ...juneKogaku,
  ...octoberHouki, ...octoberKogaku,
  ...archive2023FebruaryHouki, ...archive2023FebruaryKogaku,
] as Question[];
