import type { Question } from "@/lib/questions/types";
import y2026 from "@/data/qualification-staging/yobi-tanto/2026.json";
import y2025 from "@/data/qualification-staging/yobi-tanto/2025.json";
import questions2024PublicLaw from "./2024-public.json";
import questions2024CriminalLaw from "./2024-criminal.json";
import questions2024CivilLaw from "./2024-civil.json";
import questions2023PublicLaw from "./2023-public.json";
import questions2023CriminalLaw from "./2023-criminal.json";
import { projectStagedQuestions } from "../batch4/project-staged";

export const YOBI_TANTO_QUESTIONS: Question[] = [
  ...projectStagedQuestions([...y2026, ...y2025]),
  ...questions2024PublicLaw as Question[],
  ...questions2024CriminalLaw as Question[],
  ...questions2024CivilLaw as Question[],
  ...questions2023PublicLaw as Question[],
  ...questions2023CriminalLaw as Question[],
];
