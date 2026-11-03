import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AVIATION_COMM_QUESTIONS = data.map(normalizeQuestionData);
