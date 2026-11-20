import type { Question } from "@/lib/questions/types";
import r2024 from "./2024-annual.json";
import r2023 from "./2023-annual.json";
import r2022 from "./2022-annual.json";
import first from "./2025-annual.json";
import second from "./2026-annual.json";

/** Unpublished candidates; registries enforce isExamPublished. */
export const YAMAGUCHI_FUGU_QUESTIONS: Question[] = [...r2022, ...r2023, ...r2024, ...first, ...second] as Question[];
