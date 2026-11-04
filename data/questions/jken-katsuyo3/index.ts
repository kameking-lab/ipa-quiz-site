import data from "./latest-two.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

/** 未公開候補。公開レジストリと遅延ローダーは資格台帳のゲートを必ず通す。 */
export const JKEN_KATSUYO3_QUESTIONS = data.map(normalizeQuestionData);
