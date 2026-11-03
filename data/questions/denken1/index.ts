import type { Question } from "@/lib/questions/types";
import launch from "./launch.json";
import theoryAq02 from "./theory-aq02.json";
import theoryAq03 from "./theory-aq03.json";

/** 令和8年度第一種電気主任技術者一次試験の5原問・25空欄。 */
export const DENKEN1_QUESTIONS: Question[] = [...launch, ...theoryAq02, ...theoryAq03] as Question[];
