import type { Question } from "@/lib/questions/types";
import r2024 from "./2024-annual.json";
import first from "./2025-annual.json";
import second from "./2026-annual.json";

/** Unpublished candidates; registries enforce isExamPublished. */
export const YAMAGUCHI_FUGU_QUESTIONS: Question[] = [...r2024, ...first, ...second] as Question[];
