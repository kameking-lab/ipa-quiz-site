import type { Question } from "@/lib/questions/types";
import early2022 from "./2022-early.json";
import late2022 from "./2022-late.json";

export const KYOTO_KENTEI3_QUESTIONS = [...late2022, ...early2022] as Question[];
