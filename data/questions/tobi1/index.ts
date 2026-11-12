import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-early.json";

/** A群1〜25、B群1〜25。内部の通し番号は1〜50、原本の群・番号は別途保持する。 */
export const TOBI1_QUESTIONS: Question[] = questions2025 as Question[];
