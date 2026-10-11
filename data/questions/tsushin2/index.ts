import type { Question } from "@/lib/questions/types";
import { type JctcFirstSource, toJctcFirstQuestions } from "../jctc-first-2026";
import source from "./2026-early.json";
import law16 from "./2026-early-law16.json";

export const TSUSHIN2_QUESTIONS: Question[] = [
  ...toJctcFirstQuestions(source as JctcFirstSource),
  ...toJctcFirstQuestions(law16 as JctcFirstSource).map((q) => ({ ...q, lastUpdated: "2026-10-11" })),
].sort((a, b) => a.qNumber - b.qNumber);
