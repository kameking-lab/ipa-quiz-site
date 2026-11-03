import type { Question } from "@/lib/questions/types";
import { isExamPublished } from "@/lib/qualifications/catalog";
import latest from "./2026-annual.json";

/** 第9回の公式原問。公開前でも検証対象に含める。 */
export const SHINRISHI_CANDIDATES = latest as Question[];
export const SHINRISHI_QUESTIONS: Question[] = isExamPublished("shinrishi") ? SHINRISHI_CANDIDATES : [];
