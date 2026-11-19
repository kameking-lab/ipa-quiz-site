import type { Question } from "@/lib/questions/types";
import { COURT_2025_KISO } from "./2025-kiso";
import { COURT_2026_KISO } from "./2026-kiso";
import { COURT_2026_SENMON } from "./2026-senmon";

export const COURT_STAFF_QUESTIONS: Question[] = [...COURT_2026_KISO, ...COURT_2026_SENMON, ...COURT_2025_KISO];
