import type { Question } from "@/lib/questions/types";
import y2026 from "@/data/qualification-staging/sogo-ryoko/2026.json";
import y2025 from "@/data/qualification-staging/sogo-ryoko/2025.json";
import { projectStagedQuestions } from "../batch4/project-staged";

/** 令和8・7年度の旅行業法令・約款 110問。国内・海外旅行実務は未収録。 */
export const SOGO_RYOKO_QUESTIONS: Question[] = projectStagedQuestions([...y2026, ...y2025], "/images/questions/sogo-ryoko");
