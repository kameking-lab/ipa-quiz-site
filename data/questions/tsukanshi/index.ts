import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";

/** 第59回。未公開データもvalidate:questionsで検証する。 */
export const TSUKANSHI_QUESTIONS: Question[] = paper2025 as Question[];
