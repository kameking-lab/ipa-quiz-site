import type { Question } from "@/lib/questions/types";
import { projectStagedQuestions } from "../batch4/project-staged";
import round99 from "./round-99.json";

export const ZENSHO_BOKI_2_QUESTIONS: Question[] = projectStagedQuestions([...round99]);
