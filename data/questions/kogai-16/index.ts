import type { Question } from "@/lib/questions/types";
import { projectStagedQuestions } from "../batch4/project-staged";
import paper2025_02 from "./fiscal-2025-02.json";
import paper2025_03 from "./fiscal-2025-03.json";
import paper2025_04 from "./fiscal-2025-04.json";
import paper2025_07 from "./fiscal-2025-07.json";

export const KOGAI_16_QUESTIONS: Question[] = projectStagedQuestions([
  ...paper2025_02,
  ...paper2025_03,
  ...paper2025_04,
  ...paper2025_07,
]);
