import type { Question } from "@/lib/questions/types";
import { COURT_2023_KISO } from "./2023-kiso";
import { COURT_2023_SENMON } from "./2023-senmon";
import { COURT_2024_KISO } from "./2024-kiso";
import { COURT_2024_SENMON } from "./2024-senmon";
import { COURT_2025_KISO } from "./2025-kiso";
import { COURT_2025_SENMON } from "./2025-senmon";
import { COURT_2026_KISO } from "./2026-kiso";
import { COURT_2026_SENMON } from "./2026-senmon";

export const COURT_STAFF_QUESTIONS: Question[] = [
  ...COURT_2026_KISO,
  ...COURT_2026_SENMON,
  ...COURT_2025_KISO,
  ...COURT_2025_SENMON,
  ...COURT_2024_KISO,
  ...COURT_2024_SENMON,
  ...COURT_2023_KISO,
  ...COURT_2023_SENMON,
];
