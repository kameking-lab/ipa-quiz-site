import type { Question } from "@/lib/questions/types";
import am from "@/data/qualification-staging/kanri-eiyoshi/round40-am.json";
import pm from "@/data/qualification-staging/kanri-eiyoshi/round40-pm.json";
import { projectStagedQuestions } from "../batch4/project-staged";

/** 第40回 全200問。表・図・構造式は原本ページ画像を public/images/questions/kanri-eiyoshi に配置。 */
export const KANRI_EIYOSHI_QUESTIONS: Question[] = projectStagedQuestions([...am, ...pm], "/images/questions/kanri-eiyoshi");
