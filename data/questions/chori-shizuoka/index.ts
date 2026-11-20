import type { Question } from "@/lib/questions/types";
import y2023_annual from "./2023-annual.json";
import y2024_annual from "./2024-annual.json";
import y2025_annual from "./2025-annual.json";

export const CHORI_SHIZUOKA_QUESTIONS = [
  ...y2023_annual,
  ...y2024_annual,
  ...y2025_annual,
] as Question[];
