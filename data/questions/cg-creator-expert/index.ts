import sitting2025_late from "./2025-late.json";
import sitting2026_early from "./2026-early.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const CG_CREATOR_EXPERT_QUESTIONS = [
  ...sitting2025_late,
  ...sitting2026_early,
].map(normalizeQuestionData);
