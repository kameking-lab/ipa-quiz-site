import type { Question } from "@/lib/questions/types";
import y2026 from "@/data/qualification-staging/shiho-tanto/2026.json";
import y2025 from "@/data/qualification-staging/shiho-tanto/2025.json";
import { projectStagedQuestions } from "../batch4/project-staged";

/** 令和8・7年 短答式（憲法・民法・刑法）各77原問・109解答欄。 */
export const SHIHO_TANTO_QUESTIONS: Question[] = projectStagedQuestions([...y2026, ...y2025]);
