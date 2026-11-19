import paper2023 from "./2023.json";
import paper2024 from "./2024.json";
import paper2025 from "./2025.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const KOGAI_11_QUESTIONS = [...paper2025, ...paper2024, ...paper2023].map(normalizeQuestionData);
