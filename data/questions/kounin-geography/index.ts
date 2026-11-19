import type { Question } from "@/lib/questions/types";
import round1 from "./2024-round1.json";
import round2 from "./2024-round2.json";
import { projectStagedQuestions } from "../batch4/project-staged";

export const KOUNIN_GEOGRAPHY_QUESTIONS: Question[] = projectStagedQuestions([...round2, ...round1]);
