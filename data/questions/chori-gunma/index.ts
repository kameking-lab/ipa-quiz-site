import type { Question } from "@/lib/questions/types";
import y2025_annual from "./2025-annual.json";
import y2026_annual from "./2026-annual.json";

export const CHORI_GUNMA_QUESTIONS = [
  ...y2025_annual,
  ...y2026_annual,
] as Question[];
