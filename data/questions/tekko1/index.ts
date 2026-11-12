import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024-early.json";

/** 原本A群・B群各1〜25を内部番号1〜50に対応させる。 */
export const TEKKO1_QUESTIONS: Question[] = [...questions2024] as Question[];
