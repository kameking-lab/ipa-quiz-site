import type { Question } from "@/lib/questions/types";
import { isExamPublished } from "@/lib/qualifications/catalog";
import latest from "./2026-annual.json";
import previous from "./2025-annual.json";

/** 第8・9回の公式原問。公開前でも検証対象に含める。 */
export const SHINRISHI_CANDIDATES = [...latest, ...previous] as Question[];
export const SHINRISHI_QUESTIONS: Question[] = isExamPublished("shinrishi") ? SHINRISHI_CANDIDATES : [];
