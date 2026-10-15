import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const MARITIME3_QUESTIONS = data.map(normalizeQuestionData);
