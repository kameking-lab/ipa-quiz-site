import type { Question } from "@/lib/questions/types";
import first from "./2025-annual.json";
import second from "./2026-annual.json";

/** Unpublished candidates; registries enforce isExamPublished. */
export const YAMAGUCHI_SEIKA_QUESTIONS: Question[] = [...first, ...second] as Question[];
