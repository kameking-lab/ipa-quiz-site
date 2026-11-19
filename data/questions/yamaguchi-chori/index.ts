import type { Question } from "@/lib/questions/types";
import first from "./2025-annual.json";
import second from "./2026-annual.json";
import annual2024 from "./2024-annual.json";

/** Unpublished candidates; registries enforce isExamPublished. */
export const YAMAGUCHI_CHORI_QUESTIONS: Question[] = [...first, ...second, ...annual2024] as Question[];
