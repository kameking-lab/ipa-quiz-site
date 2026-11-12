import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-early.json";

/** 原本A群1〜25・B群1〜25を内部通し番号1〜50に対応させる。 */
export const CHIKURO2_QUESTIONS: Question[] = questions2025 as Question[];
