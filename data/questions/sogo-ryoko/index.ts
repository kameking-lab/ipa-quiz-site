import type { Question } from "@/lib/questions/types";
import y2026 from "@/data/qualification-staging/sogo-ryoko/2026.json";
import y2025 from "@/data/qualification-staging/sogo-ryoko/2025.json";
import y2026Practical from "./2026-practical.json";
import { projectStagedQuestions } from "../batch4/project-staged";

export const SOGO_RYOKO_QUESTIONS: Question[] = [
  ...projectStagedQuestions([...y2026, ...y2025], "/images/questions/sogo-ryoko"),
  ...(y2026Practical as Question[]),
];
