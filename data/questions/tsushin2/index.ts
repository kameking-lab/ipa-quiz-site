import type { Question } from "@/lib/questions/types";
import { type JctcFirstSource, toJctcFirstQuestions } from "../jctc-first-2026";
import source from "./2026-early.json";
import construction10 from "./2026-early-construction10.json";

export const TSUSHIN2_QUESTIONS: Question[] = [
  ...toJctcFirstQuestions(source as JctcFirstSource),
  ...toJctcFirstQuestions(construction10 as JctcFirstSource).map((question) => ({
    ...question,
    lastUpdated: "2026-10-11",
  })),
].sort((a, b) => a.qNumber - b.qNumber);
