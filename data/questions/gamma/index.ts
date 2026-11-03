import type { Question } from "@/lib/questions/types";
import questions from "./questions.json";

/** 未公開。公開経路では資格台帳のゲートを通す。 */
export const GAMMA_QUESTIONS = questions as Question[];
