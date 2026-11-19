import type { Question } from "@/lib/questions/types";
import second2026 from "./2026-session2.json";
import first2026 from "./2026-session1.json";
import third2025 from "./2025-session3.json";

export const EIKEN2_QUESTIONS: Question[] = [...second2026, ...first2026, ...third2025] as Question[];
