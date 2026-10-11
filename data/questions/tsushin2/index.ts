import type { Question } from "@/lib/questions/types";
import { type JctcFirstSource, toJctcFirstQuestions } from "../jctc-first-2026";
import source from "./2026-early.json";
import tech17 from "./2025-late-tech17.json";
import final2 from "./2026-early-final2.json";

export const TSUSHIN2_QUESTIONS: Question[] = [
  ...toJctcFirstQuestions(source as JctcFirstSource),
  ...toJctcFirstQuestions(tech17 as JctcFirstSource).map((q) => ({ ...q, lastUpdated: "2026-10-11" })),
  ...toJctcFirstQuestions(final2 as JctcFirstSource).map((q) => ({ ...q, lastUpdated: "2026-10-11" })),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
