import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-late.json";

/** 内部番号1〜50。原本のA群・B群各1〜25はofficialQuestionLabelに保持。 */
export const KENCHIKU_DAIKU1_QUESTIONS: Question[] = questions2025 as Question[];
