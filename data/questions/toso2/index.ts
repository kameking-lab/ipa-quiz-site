import type { Question } from "@/lib/questions/types";
import questions2023 from "./2023-early.json";
import questions2024 from "./2024-early.json";

/** 原本A群・B群の番号を保持し、内部では1〜50に対応させる。 */
export const TOSO2_QUESTIONS: Question[] = [...questions2023, ...questions2024] as Question[];
