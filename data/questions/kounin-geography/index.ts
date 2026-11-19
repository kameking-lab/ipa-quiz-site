import type { Question } from "@/lib/questions/types";
import round1 from "./2024-round1.json";
import round2 from "./2024-round2.json";
import y2023Round2A from "./2023-round2-tiri-a.json";
import y2023Round2B from "./2023-round2-tiri-b.json";
import y2023Round1A from "./2023-round1-tiri-a.json";
import y2023Round1B from "./2023-round1-tiri-b.json";
import { projectStagedQuestions } from "../batch4/project-staged";

export const KOUNIN_GEOGRAPHY_QUESTIONS: Question[] = projectStagedQuestions([...round2, ...round1, ...y2023Round1B, ...y2023Round1A, ...y2023Round2B, ...y2023Round2A]);
