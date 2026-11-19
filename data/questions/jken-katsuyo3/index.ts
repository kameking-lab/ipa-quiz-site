import data from "./latest-two.json";
import second2024 from "./2024-second.json";
import first2024 from "./2024-first.json";
import second2023 from "./2023-second.json";
import first2023 from "./2023-first.json";
import second2022 from "./2022-second.json";
import first2022 from "./2022-first.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

/** 公開レジストリと遅延ローダーは資格台帳のゲートを通す。 */
export const JKEN_KATSUYO3_QUESTIONS = [...data, ...second2024, ...first2024, ...second2023, ...first2023, ...second2022, ...first2022].map(normalizeQuestionData);
