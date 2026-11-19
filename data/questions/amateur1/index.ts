import data from "./two-sittings.json";
import november from "./2026-november.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AMATEUR1_QUESTIONS = [...data, ...november].map(normalizeQuestionData);
