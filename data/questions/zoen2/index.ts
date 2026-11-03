import type { Question } from "@/lib/questions/types";
import { type JctcFirstSource, toJctcFirstQuestions } from "../jctc-first-2026";
import source2026 from "./2026-early.json";
import source2025 from "./2025-late.json";

export const ZOEN2_QUESTIONS: Question[] = [
  ...toJctcFirstQuestions(source2026 as JctcFirstSource),
  ...toJctcFirstQuestions(source2025 as JctcFirstSource),
];
