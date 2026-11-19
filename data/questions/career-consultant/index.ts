import type { Question } from "@/lib/questions/types";
import round33 from "@/data/qualification-staging/career-consultant/round33.json";
import round27 from "./round27.json";
import round23 from "./round23.json";
import round22 from "./round22.json";
import round21 from "./round21.json";
import round20 from "./round20.json";
import round26 from "./round26.json";
import round28 from "./round28.json";
import round29 from "./round29.json";
import round30 from "./round30.json";
import round31 from "./round31.json";
import round32 from "@/data/qualification-staging/career-consultant/round32.json";
import { projectStagedQuestions } from "../batch4/project-staged";

/** 公式公開の学科試験 各50問。 */
export const CAREER_CONSULTANT_QUESTIONS: Question[] = projectStagedQuestions([...round33, ...round32, ...round31, ...round30, ...round29, ...round28, ...round27, ...round23, ...round22, ...round21, ...round20, ...round26]);
