import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-early.json";

/** 原本A群・B群の番号を保持し、内部では1〜50に対応させる。 */
export const TOSO1_QUESTIONS: Question[] = [...questions2025] as Question[];
