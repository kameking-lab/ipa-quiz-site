import data from "./two-sittings.json";
import engineeringA2023July from "./2023-07-kogaku-a.json";
import engineeringB2023July from "./2023-07-kogaku-b.json";
import foundation2023July from "./2023-07-kiso.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const RIKU_TECH2_QUESTIONS = [...data, ...foundation2023July, ...engineeringA2023July, ...engineeringB2023July].map(normalizeQuestionData);
