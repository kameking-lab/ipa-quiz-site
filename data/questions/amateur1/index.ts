import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AMATEUR1_QUESTIONS = data.map(normalizeQuestionData);
