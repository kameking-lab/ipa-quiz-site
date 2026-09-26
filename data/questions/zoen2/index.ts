import type { Question } from "@/lib/questions/types";
import { type JctcFirstSource, toJctcFirstQuestions } from "../jctc-first-2026";
import source from "./2026-early.json";

export const ZOEN2_QUESTIONS: Question[] = toJctcFirstQuestions(source as JctcFirstSource);
