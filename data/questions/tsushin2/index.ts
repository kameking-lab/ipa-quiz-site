import type { Question } from "@/lib/questions/types";
import { type JctcFirstSource, toJctcFirstQuestions } from "../jctc-first-2026";
import source from "./2026-early.json";
import tech2025 from "./2025-late-tech12.json";

export const TSUSHIN2_QUESTIONS: Question[] = [
  ...toJctcFirstQuestions(source as JctcFirstSource),
  ...toJctcFirstQuestions(tech2025 as JctcFirstSource).map((question) => ({ ...question, lastUpdated: "2026-10-11" })),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
