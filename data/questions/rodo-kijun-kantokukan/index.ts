import type { Question } from "@/lib/questions/types";
import { projectStagedQuestions } from "../batch4/project-staged";
import fiscal2023Basic from "./fiscal-2023-kiso.json";
import fiscal2023SpecialistA from "./fiscal-2023-senmon-a.json";
import fiscal2023SpecialistB from "./fiscal-2023-senmon-b.json";
import fiscal2024Basic from "./fiscal-2024-kiso.json";
import fiscal2024SpecialistA from "./fiscal-2024-senmon-a.json";
import fiscal2024SpecialistB from "./fiscal-2024-senmon-b.json";

export const RODO_KIJUN_KANTOKUKAN_QUESTIONS: Question[] = [
  ...projectStagedQuestions(fiscal2024Basic),
  ...projectStagedQuestions(fiscal2024SpecialistA),
  ...projectStagedQuestions(fiscal2024SpecialistB),
  ...projectStagedQuestions(fiscal2023Basic),
  ...projectStagedQuestions(fiscal2023SpecialistA),
  ...projectStagedQuestions(fiscal2023SpecialistB),
];
