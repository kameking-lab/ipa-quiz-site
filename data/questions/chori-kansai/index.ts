import type { Question } from "@/lib/questions/types";
import y2023_annual from "./2023-annual.json";
import y2024_annual from "./2024-annual.json";
import y2025_annual from "./2025-annual.json";
import y2026_annual from "./2026-annual.json";

export const CHORI_KANSAI_QUESTIONS = [
  ...y2023_annual,
  ...y2024_annual,
  ...y2025_annual,
  ...y2026_annual,
] as Question[];
