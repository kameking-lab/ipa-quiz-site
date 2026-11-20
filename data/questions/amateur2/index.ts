import data from "./two-sittings.json";
import august2024Kogaku from "./2024-august-kogaku.json";
import august2024Houki from "./2024-august-houki.json";
import december2024Houki from "./2024-december-houki.json";
import december2024Kogaku from "./2024-december-kogaku.json";
import may2025Kogaku from "./2025-may-kogaku.json";
import december2023Kogaku from "./2023-december-kogaku.json";
import december2023Houki from "./2023-december-houki.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AMATEUR2_QUESTIONS = [...data, ...may2025Kogaku, ...december2024Kogaku, ...december2024Houki, ...august2024Kogaku, ...august2024Houki, ...december2023Kogaku, ...december2023Houki].map(normalizeQuestionData);
