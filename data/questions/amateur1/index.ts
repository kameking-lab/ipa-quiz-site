import data from "./two-sittings.json";
import november2025 from "./2025-november.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AMATEUR1_QUESTIONS = [...data, ...november2025].map(normalizeQuestionData);
