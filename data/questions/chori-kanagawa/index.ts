import type { Question } from "@/lib/questions/types";
import y2023_round1 from "./2023-round1.json";
import y2023_round2 from "./2023-round2.json";
import y2024_round1 from "./2024-round1.json";
import y2024_round2 from "./2024-round2.json";
import y2025_annual from "./2025-annual.json";
import y2026_annual from "./2026-annual.json";

export const CHORI_KANAGAWA_QUESTIONS = [
  ...y2023_round1,
  ...y2023_round2,
  ...y2024_round1,
  ...y2024_round2,
  ...y2025_annual,
  ...y2026_annual,
] as Question[];
