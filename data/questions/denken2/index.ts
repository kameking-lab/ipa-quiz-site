import type { Question } from "@/lib/questions/types";
import launch from "./launch.json";

/** 令和8年度第二種電気主任技術者一次試験の電力・法規（空欄単位70件）。build-launch.py が受入レシートに結び付けて生成する。 */
export const DENKEN2_QUESTIONS: Question[] = launch as Question[];
