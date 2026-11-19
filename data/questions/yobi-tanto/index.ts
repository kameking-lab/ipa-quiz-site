import type { Question } from "@/lib/questions/types";
import y2026 from "@/data/qualification-staging/yobi-tanto/2026.json";
import y2025 from "@/data/qualification-staging/yobi-tanto/2025.json";
import questions2024PublicLaw from "./2024-public.json";
import { projectStagedQuestions } from "../batch4/project-staged";

export const YOBI_TANTO_QUESTIONS: Question[] = [
  ...projectStagedQuestions([...y2026, ...y2025]),
  ...questions2024PublicLaw as Question[],
];
