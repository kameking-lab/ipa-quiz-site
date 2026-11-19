import priorSitting from "./2025-september.json";
import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const MARITIME3_QUESTIONS = [...data, ...priorSitting].map(normalizeQuestionData);
