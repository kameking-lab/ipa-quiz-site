import type { Question } from "@/lib/questions/types";
import { projectStagedQuestions } from "../batch4/project-staged";
import paper2025_02 from "./fiscal-2025-02.json";
import paper2025_03 from "./fiscal-2025-03.json";
import paper2025_04 from "./fiscal-2025-04.json";
import paper2025_07 from "./fiscal-2025-07.json";
import paper2025_08 from "./fiscal-2025-08.json";
import paper2025_09 from "./fiscal-2025-09.json";
import paper2025_10 from "./fiscal-2025-10.json";
import paper2025_12 from "./fiscal-2025-12.json";
import paper2025_13 from "./fiscal-2025-13.json";
import paper2025_14 from "./fiscal-2025-14.json";
import paper2024_02 from "./fiscal-2024-02.json";

export const KOGAI_16_QUESTIONS: Question[] = projectStagedQuestions([
  ...paper2025_02,
  ...paper2025_03,
  ...paper2025_04,
  ...paper2025_07,
  ...paper2025_08,
  ...paper2025_09,
  ...paper2025_10,
  ...paper2025_12,
  ...paper2025_13,
  ...paper2025_14,
  ...paper2024_02,
]);
