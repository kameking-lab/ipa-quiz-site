import type { Question } from "@/lib/questions/types";
import y2026 from "@/data/qualification-staging/yobi-tanto/2026.json";
import y2025 from "@/data/qualification-staging/yobi-tanto/2025.json";
import y2022 from "./2022.json";
import { projectStagedQuestions } from "../batch4/project-staged";

/** 令和8・7年の法律基本科目と令和4年の5科目。個別判定式は解答欄単位で収録。 */
export const YOBI_TANTO_QUESTIONS: Question[] = [
  ...projectStagedQuestions([...y2026, ...y2025]),
  ...(y2022 as Question[]),
];
