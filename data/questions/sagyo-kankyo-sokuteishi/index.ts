import type { Question } from "@/lib/questions/types";
import papers from "./latest-two.json";

/** 科目ごとの公式掲載直近2回。公開は資格台帳のゲートで制御する。 */
export const SAGYO_KANKYO_SOKUTEISHI_QUESTIONS: Question[] = papers as Question[];
