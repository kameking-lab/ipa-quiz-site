import type { Question } from "@/lib/questions/types";
import launch from "./launch.json";
import theoryAq02 from "./theory-aq02.json";

/** 令和8年度第一種電気主任技術者一次試験の4原問・20空欄。 */
export const DENKEN1_QUESTIONS: Question[] = [...launch, ...theoryAq02] as Question[];
