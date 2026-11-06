import type { Question } from "@/lib/questions/types";
import round33 from "@/data/qualification-staging/career-consultant/round33.json";
import round32 from "@/data/qualification-staging/career-consultant/round32.json";
import { projectStagedQuestions } from "../batch4/project-staged";

/** 第33回・第32回 学科試験 各50問（独立レビュー PASS 済み）。 */
export const CAREER_CONSULTANT_QUESTIONS: Question[] = projectStagedQuestions([...round33, ...round32]);
