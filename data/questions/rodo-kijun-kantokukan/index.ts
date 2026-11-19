import type { Question } from "@/lib/questions/types";
import { projectStagedQuestions } from "../batch4/project-staged";
import fiscal2024SpecialistA from "./fiscal-2024-senmon-a.json";

export const RODO_KIJUN_KANTOKUKAN_QUESTIONS: Question[] = projectStagedQuestions(fiscal2024SpecialistA);
