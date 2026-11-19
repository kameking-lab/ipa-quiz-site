import data from "./latest-two.json";
import second2024 from "./2024-second.json";
import first2024 from "./2024-first.json";
import second2023 from "./2023-second.json";
import first2023 from "./2023-first.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

/** 未公開候補。公開レジストリと遅延ローダーは資格台帳のゲートを必ず通す。 */
export const JKEN_KATSUYO2_QUESTIONS = [...data, ...second2024, ...first2024, ...second2023, ...first2023].map(normalizeQuestionData);
