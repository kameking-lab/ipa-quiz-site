import type { Question } from "@/lib/questions/types";
import { projectStagedQuestions } from "../batch4/project-staged";
import fiscal2024 from "./fiscal-2024.json";

export const KANKEN_10_QUESTIONS: Question[] = projectStagedQuestions([...fiscal2024]);
