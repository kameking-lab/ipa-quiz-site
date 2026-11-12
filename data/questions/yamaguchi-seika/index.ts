import type { Question } from "@/lib/questions/types";
import first from "./2025-annual.json";
import second from "./2026-annual.json";
import paper2023 from "./2023-annual.json";
import paper2022 from "./2022-annual.json";

/** Unpublished candidates; registries enforce isExamPublished. */
export const YAMAGUCHI_SEIKA_QUESTIONS: Question[] = [...first, ...second, ...paper2023, ...paper2022] as Question[];
