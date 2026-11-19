import sitting2026_early from "./2026-early.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const CG_ENGINEER_EXPERT_QUESTIONS = [
  ...sitting2026_early,
].map(normalizeQuestionData);
