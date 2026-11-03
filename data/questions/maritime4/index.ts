import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const MARITIME4_QUESTIONS = data.map(normalizeQuestionData);
