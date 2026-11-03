import type { Question } from "@/lib/questions/types";
import april from "./2026-april.json";
import october from "./2026-october.json";

/** Staged candidates; public registries must apply isExamPublished. */
export const BOILER2_QUESTIONS: Question[] = [
  ...(october as Question[]),
  ...(april as Question[]),
];
