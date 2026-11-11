import type { Question } from "@/lib/questions/types";
import q0 from "./2023.json";
import q1 from "./2024.json";

/** 非公開候補。配信は資格台帳の許可待ちゲートを通す。 */
export const QUESTIONS = [...q0,...q1] as Question[];
