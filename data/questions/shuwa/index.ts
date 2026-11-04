import type { Question } from "@/lib/questions/types";
import reviewed from "./2026-reviewed.json";
import reviewed2025 from "./2025-reviewed.json";

/** 原本照合済みのステージング候補。公開レジストリは資格台帳のゲートを通す。 */
export const SHUWA_QUESTIONS: Question[] = [...reviewed, ...reviewed2025] as Question[];
