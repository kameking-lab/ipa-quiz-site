import sitting2026_early from "./2026-early.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const MULTIMEDIA_KENTEI_BASIC_QUESTIONS = [
  ...sitting2026_early,
].map(normalizeQuestionData);
