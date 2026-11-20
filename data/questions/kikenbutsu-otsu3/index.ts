import type { Question } from "@/lib/questions/types";
import { commonQuestions } from "../kikenbutsu-otsu5/common";
import specific from "./published-202606.json";

export const QUESTIONS: Question[] = [...commonQuestions("kikenbutsu-otsu3"), ...(specific as Question[])];
