import type { Question } from "@/lib/questions/types";
import { type JctcFirstSource, toJctcFirstQuestions } from "../jctc-first-2026";
import source from "./2026-early.json";
import construction6 from "./2025-late-construction6.json";

export const TSUSHIN2_QUESTIONS: Question[] = [
  ...toJctcFirstQuestions(source as JctcFirstSource),
  ...toJctcFirstQuestions(construction6 as JctcFirstSource).map((q) => ({ ...q, lastUpdated: "2026-10-11" })),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
