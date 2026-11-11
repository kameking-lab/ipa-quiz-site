import type { Question } from "@/lib/questions/types";
import annual2024 from "./2024-annual.json";
import first from "./2025-annual.json";
import second from "./2026-annual.json";

/** All practical electives retain their own session and question IDs. */
export const YAMAGUCHI_SEIKA_QUESTIONS: Question[] = [...annual2024, ...first, ...second] as Question[];
