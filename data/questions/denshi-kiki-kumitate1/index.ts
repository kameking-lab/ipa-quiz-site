import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-early.json";
import questions2023 from "./2023-early.json";

/** 原本A群・B群各1〜25を内部番号1〜50に対応させる。 */
export const DENSHI_KIKI_KUMITATE1_QUESTIONS: Question[] = [...questions2025, ...questions2023] as Question[];
