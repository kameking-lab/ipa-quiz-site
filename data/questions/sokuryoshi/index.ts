import type { Question } from "@/lib/questions/types";
import source from "./questions.json";

/** Validation candidates. Publication is controlled by the qualification catalog. */
export const SOKURYOSHI_QUESTIONS = source as Question[];
