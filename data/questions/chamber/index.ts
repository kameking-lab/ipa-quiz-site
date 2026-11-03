import type { Question } from "@/lib/questions/types";
import october from "./2026-10.json";
import april from "./2026-04.json";

/** Unpublished candidates. All public registries must apply the catalog gate. */
export const CHAMBER_QUESTIONS: Question[] = [...october, ...april] as Question[];
