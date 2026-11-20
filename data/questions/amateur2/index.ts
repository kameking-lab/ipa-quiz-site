import data from "./two-sittings.json";
import december2024Kogaku from "./2024-december-kogaku.json";
import may2025Kogaku from "./2025-may-kogaku.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AMATEUR2_QUESTIONS = [...data, ...may2025Kogaku, ...december2024Kogaku].map(normalizeQuestionData);
