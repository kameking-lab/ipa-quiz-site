import type { Question } from "@/lib/questions/types";
import { projectStagedQuestions } from "../batch4/project-staged";
import round99 from "./round-99.json";
import round98 from "./round-98.json";
import round97 from "./round-97.json";
import round96 from "./round-96.json";
import round95 from "./round-95.json";
import round94 from "./round-94.json";

export const ZENSHO_BOKI_2_QUESTIONS: Question[] = projectStagedQuestions([...round99, ...round98, ...round97, ...round96, ...round95, ...round94]);
