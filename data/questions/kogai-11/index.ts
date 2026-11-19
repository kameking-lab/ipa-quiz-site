import paper2025 from "./2025.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const KOGAI_11_QUESTIONS = paper2025.map(normalizeQuestionData);
