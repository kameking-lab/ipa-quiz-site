import type { Question } from "@/lib/questions/types";
import { type JctcFirstSource, toJctcFirstQuestions } from "../jctc-first-2026";
import source from "./2026-early.json";
import law14 from "./2025-late-law14.json";

export const TSUSHIN2_QUESTIONS: Question[] = [
  ...toJctcFirstQuestions(source as JctcFirstSource),
  ...toJctcFirstQuestions(law14 as JctcFirstSource).map((q) => ({ ...q, lastUpdated: "2026-10-11" })),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
