import { isReferenceOnlyQuestionId } from "@/lib/questions/assessment";
import type { Question } from "@/lib/questions/types";
import { toJctcFirstQuestions } from "./jctc-first";
import source from "./2026-early.json";
import { readSavedSource } from "./saved-source-reader";
import saved1 from "./sources/2026-early-first5.json";
import saved2 from "./sources/2026-early-next5.json";
import saved3 from "./sources/2026-early-systems10.json";
import saved4 from "./sources/2026-early-tech10.json";
import saved5 from "./sources/2026-early-construction10.json";
import saved6 from "./sources/2026-early-final2.json";
import saved7 from "./sources/2026-early-law16.json";
import saved8 from "./sources/2026-early-last1.json";
import saved9 from "./sources/2026-early-gantt1.json";
import saved10 from "./sources/2025-late-tech12.json";
import saved11 from "./sources/2025-late-tech17.json";
import saved12 from "./sources/2025-late-final7.json";
import saved13 from "./sources/2025-late-last1.json";
import saved14 from "./sources/2025-late-practical7.json";
import saved15 from "./sources/2025-late-construction6.json";
import saved16 from "./sources/2025-late-law14.json";
import saved17 from "./sources/2025-late-q21-caveated.json";

const existing = toJctcFirstQuestions(readSavedSource(source));
const savedBlocks: readonly unknown[] = [saved1, saved2, saved3, saved4, saved5, saved6, saved7, saved8, saved9, saved10, saved11, saved12, saved13, saved14, saved15, saved16, saved17];
const attributedLicense: Question["license"] = "JCTC-attributed";
const added = savedBlocks.flatMap((block) =>
  toJctcFirstQuestions(readSavedSource(block)).map((question) => ({
    ...question,
    license: attributedLicense,
  })),
);
const all = [...existing, ...added];
if (existing.length !== 5 || added.length !== 125 || all.length !== 130) {
  throw new Error("tsushin2 saved source count mismatch");
}
if (new Set(all.map((question) => question.id)).size !== all.length) {
  throw new Error("tsushin2 duplicate question ID");
}

export const TSUSHIN2_QUESTIONS: Question[] = all;
export const TSUSHIN2_REFERENCE_QUESTIONS = all.filter(q => isReferenceOnlyQuestionId(q.id));
export const TSUSHIN2_ASSESSMENT_COUNTS = { materials: all.length, scored: all.filter(q => !isReferenceOnlyQuestionId(q.id)).length, referenceOnly: TSUSHIN2_REFERENCE_QUESTIONS.length };
if (TSUSHIN2_ASSESSMENT_COUNTS.materials !== 130 || TSUSHIN2_ASSESSMENT_COUNTS.scored !== 129 || TSUSHIN2_ASSESSMENT_COUNTS.referenceOnly !== 1) {
  throw new Error("tsushin2 material and scored counts mismatch");
}
