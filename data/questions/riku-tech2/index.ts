import data from "./two-sittings.json";
import engineeringA2023July from "./2023-07-kogaku-a.json";
import engineeringB2023July from "./2023-07-kogaku-b.json";
import law2023January from "./2023-01-houki.json";
import engineeringB2023January from "./2023-01-kogaku-b.json";
import foundation2023January from "./2023-01-kiso.json";
import foundation2023July from "./2023-07-kiso.json";
import law2022July from "./2022-07-houki.json";
import foundation2022July from "./2022-07-kiso.json";
import engineeringA2022July from "./2022-07-kogaku-a.json";
import engineeringB2022July from "./2022-07-kogaku-b.json";
import law2025July from "./2025-07-houki.json";
import foundation2025July from "./2025-07-kiso.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const RIKU_TECH2_QUESTIONS = [...data, ...foundation2023July, ...engineeringA2023July, ...engineeringB2023July, ...law2023January, ...foundation2023January, ...engineeringB2023January, ...law2022July, ...foundation2022July, ...engineeringA2022July, ...engineeringB2022July, ...law2025July, ...foundation2025July].map(normalizeQuestionData);
