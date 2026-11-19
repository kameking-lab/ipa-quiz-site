import paper2023 from "./2023.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const ZENSHO_MARKETING_QUESTIONS = paper2023.map(normalizeQuestionData);
