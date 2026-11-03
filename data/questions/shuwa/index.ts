import type { Question } from "@/lib/questions/types";
import reviewed from "./2026-reviewed.json";

/** 原本照合済みのステージング候補。公開レジストリは資格台帳のゲートを通す。 */
export const SHUWA_QUESTIONS: Question[] = reviewed as Question[];
