import type { Question } from "@/lib/questions/types";
import round33 from "@/data/qualification-staging/career-consultant/round33.json";
import round30 from "./round30.json";
import round31 from "./round31.json";
import round32 from "@/data/qualification-staging/career-consultant/round32.json";
import { projectStagedQuestions } from "../batch4/project-staged";

/** 第30〜33回 学科試験 各50問。 */
export const CAREER_CONSULTANT_QUESTIONS: Question[] = projectStagedQuestions([...round33, ...round32, ...round31, ...round30]);
