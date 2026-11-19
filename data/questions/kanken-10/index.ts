import type { Question } from "@/lib/questions/types";
import { projectStagedQuestions } from "../batch4/project-staged";
import fiscal2024 from "./fiscal-2024.json";
import fiscal2023 from "./fiscal-2023.json";
import fiscal2022 from "./fiscal-2022.json";

export const KANKEN_10_QUESTIONS: Question[] = projectStagedQuestions([...fiscal2024, ...fiscal2023, ...fiscal2022]);
