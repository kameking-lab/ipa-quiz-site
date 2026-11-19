import year2026_round2 from "./2026-round2.json";
import year2026_round1 from "./2026-round1.json";
import year2025_round3 from "./2025-round3.json";
import type { Question } from "@/lib/questions/types";

export const EIKENP2_QUESTIONS = [
  ...year2026_round2,
  ...year2026_round1,
  ...year2025_round3,
] as Question[];
