import data from "./two-sittings.json";
import december2024Kogaku from "./2024-december-kogaku.json";
import december2024Houki from "./2024-december-houki.json";
import november2025 from "./2025-november.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AMATEUR1_QUESTIONS = [...data, ...november2025, ...december2024Houki, ...december2024Kogaku].map(normalizeQuestionData);
