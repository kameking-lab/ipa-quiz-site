import second2022 from "./2022-second.json";
import first2023 from "./2023-first.json";
import second2023 from "./2023-second.json";
import first2024 from "./2024-first.json";
import second2024 from "./2024-second.json";
import data from "./latest-two.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

/** 公式資料の回ごとに追加し、レジストリと遅延ローダーから共通で参照する。 */
export const JKEN_KATSUYO1_QUESTIONS = [...data, ...second2024, ...first2024, ...second2023, ...first2023, ...second2022].map(normalizeQuestionData);
