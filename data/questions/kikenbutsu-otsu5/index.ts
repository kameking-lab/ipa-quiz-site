import type { Question } from "@/lib/questions/types";
import { commonQuestions } from "./common";
import specific from "./published-202606.json";

export const QUESTIONS: Question[] = [...commonQuestions("kikenbutsu-otsu5"), ...(specific as Question[])];
