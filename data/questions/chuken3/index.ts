import type { Question } from "@/lib/questions/types";
import autumn2025 from "./2025-autumn.json";
import round2Of2025 from "./2025-round2.json";
import march2026 from "./2026-march.json";
import round2Of2026 from "./2026-round2.json";

export const CHUKEN3_QUESTIONS = [
  ...round2Of2026, ...march2026, ...autumn2025, ...round2Of2025,
] as Question[];
