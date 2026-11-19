import sitting2026_early from "./2026-early.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const CG_CREATOR_BASIC_QUESTIONS = [
  ...sitting2026_early,
].map(normalizeQuestionData);
