import type { Question } from "@/lib/questions/types";
import { toKenkiQuestions } from "@/data/qualification-staging/kenki/toQuestions";
import y2026_0 from "@/data/qualification-staging/kenki/level2/2026-common.json";
import y2026_1 from "@/data/qualification-staging/kenki/level2/2026-type1.json";
import y2026_2 from "@/data/qualification-staging/kenki/level2/2026-type2.json";
import y2026_3 from "@/data/qualification-staging/kenki/level2/2026-type3.json";
import y2026_4 from "@/data/qualification-staging/kenki/level2/2026-type4.json";
import y2026_5 from "@/data/qualification-staging/kenki/level2/2026-type5.json";
import y2026_6 from "@/data/qualification-staging/kenki/level2/2026-type6.json";
import y2025_0 from "@/data/qualification-staging/kenki/level2/2025-common.json";
import y2025_1 from "@/data/qualification-staging/kenki/level2/2025-type1.json";
import y2025_2 from "@/data/qualification-staging/kenki/level2/2025-type2.json";
import y2025_3 from "@/data/qualification-staging/kenki/level2/2025-type3.json";
import y2025_4 from "@/data/qualification-staging/kenki/level2/2025-type4.json";
import y2025_5 from "@/data/qualification-staging/kenki/level2/2025-type5.json";
import y2025_6 from "@/data/qualification-staging/kenki/level2/2025-type6.json";

/** 全冊子304原問。公開は資格台帳のゲートで制御する。 */
export const KENKI2_QUESTIONS: Question[] = [
  ...toKenkiQuestions(y2026_0, "kenki2", "kyotsu"),
  ...toKenkiQuestions(y2026_1, "kenki2", "kenki-type1"),
  ...toKenkiQuestions(y2026_2, "kenki2", "kenki-type2"),
  ...toKenkiQuestions(y2026_3, "kenki2", "kenki-type3"),
  ...toKenkiQuestions(y2026_4, "kenki2", "kenki-type4"),
  ...toKenkiQuestions(y2026_5, "kenki2", "kenki-type5"),
  ...toKenkiQuestions(y2026_6, "kenki2", "kenki-type6"),
  ...toKenkiQuestions(y2025_0, "kenki2", "kyotsu"),
  ...toKenkiQuestions(y2025_1, "kenki2", "kenki-type1"),
  ...toKenkiQuestions(y2025_2, "kenki2", "kenki-type2"),
  ...toKenkiQuestions(y2025_3, "kenki2", "kenki-type3"),
  ...toKenkiQuestions(y2025_4, "kenki2", "kenki-type4"),
  ...toKenkiQuestions(y2025_5, "kenki2", "kenki-type5"),
  ...toKenkiQuestions(y2025_6, "kenki2", "kenki-type6"),
];
