import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-early.json";
import questions2024 from "./2024-early.json";

/** 原本A群1〜25・B群1〜25を、内部の通し番号1〜50に対応させる。 */
export const INSATSU1_QUESTIONS: Question[] = [...questions2025, ...questions2024] as Question[];
