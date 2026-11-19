import type { Question } from "@/lib/questions/types";
import { projectStagedQuestions } from "../batch4/project-staged";
import paper2025_02 from "./fiscal-2025-02.json";

export const KOGAI_16_QUESTIONS: Question[] = projectStagedQuestions([
  ...paper2025_02,
]);
