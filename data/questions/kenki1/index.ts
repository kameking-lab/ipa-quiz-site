import paper2026 from "@/data/qualification-staging/kenki/level1/2026.json";
import paper2025 from "@/data/qualification-staging/kenki/level1/2025.json";
import { toKenkiQuestions } from "@/data/qualification-staging/kenki/toQuestions";

/** Publication is controlled by the qualification catalog; independent review is pending. */
export const KENKI1_QUESTIONS = [
  ...toKenkiQuestions(paper2026, "kenki1"),
  ...toKenkiQuestions(paper2025, "kenki1"),
];
