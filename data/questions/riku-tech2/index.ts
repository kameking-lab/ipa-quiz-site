import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const RIKU_TECH2_QUESTIONS = data.map(normalizeQuestionData);
