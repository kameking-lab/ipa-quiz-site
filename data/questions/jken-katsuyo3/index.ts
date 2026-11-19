import data from "./latest-two.json";
import second2024 from "./2024-second.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

/** 公開レジストリと遅延ローダーは資格台帳のゲートを通す。 */
export const JKEN_KATSUYO3_QUESTIONS = [...data, ...second2024].map(normalizeQuestionData);
