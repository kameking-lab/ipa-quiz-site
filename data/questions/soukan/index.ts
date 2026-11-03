import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2026 from "./2026-annual.json";

/** 技術士第二次試験 総合技術監理部門 必須科目Ⅰ－1（択一式）令和7・8年度。 */
export const SOUKAN_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2026 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
