import type { Question } from "@/lib/questions/types";
import questions2023 from "./2023-early.json";
import questions2024 from "./2024-early.json";

/** 原本A群・B群各1〜25を内部番号1〜50に対応させる。 */
export const TEKKO2_QUESTIONS: Question[] = [...questions2023, ...questions2024] as Question[];
