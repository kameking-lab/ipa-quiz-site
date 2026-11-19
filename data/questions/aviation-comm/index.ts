import data from "./two-sittings.json";
import august2025 from "./2025-august.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AVIATION_COMM_QUESTIONS = [...data, ...august2025].map(normalizeQuestionData);
