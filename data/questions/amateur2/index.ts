import data from "./two-sittings.json";
import august2024Kogaku from "./2024-august-kogaku.json";
import august2024Houki from "./2024-august-houki.json";
import december2024Houki from "./2024-december-houki.json";
import december2024Kogaku from "./2024-december-kogaku.json";
import may2025Kogaku from "./2025-may-kogaku.json";
import december2023Kogaku from "./2023-december-kogaku.json";
import december2023Houki from "./2023-december-houki.json";
import april2023Kogaku from "./2023-april-kogaku.json";
import april2023Houki from "./2023-april-houki.json";
import august2022Kogaku from "./2022-august-kogaku.json";
import august2022Houki from "./2022-august-houki.json";
import april2022Kogaku from "./2022-april-kogaku.json";
import april2022Houki from "./2022-april-houki.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AMATEUR2_QUESTIONS = [...data, ...may2025Kogaku, ...december2024Kogaku, ...december2024Houki, ...august2024Kogaku, ...august2024Houki, ...december2023Kogaku, ...december2023Houki, ...april2023Kogaku, ...april2023Houki, ...august2022Kogaku, ...august2022Houki, ...april2022Kogaku, ...april2022Houki].map(normalizeQuestionData);
