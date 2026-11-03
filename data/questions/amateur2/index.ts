import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AMATEUR2_QUESTIONS = data.map(normalizeQuestionData);
