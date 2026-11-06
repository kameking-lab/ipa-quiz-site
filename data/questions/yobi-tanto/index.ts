import type { Question } from "@/lib/questions/types";
import y2026 from "@/data/qualification-staging/yobi-tanto/2026.json";
import y2025 from "@/data/qualification-staging/yobi-tanto/2025.json";
import { projectStagedQuestions } from "../batch4/project-staged";

/** 令和8・7年 予備試験短答式・法律基本科目 各95原問・137解答欄。一般教養科目は未収録。 */
export const YOBI_TANTO_QUESTIONS: Question[] = projectStagedQuestions([...y2026, ...y2025]);
