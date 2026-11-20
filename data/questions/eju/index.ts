import type { Question } from "@/lib/questions/types";
import questions from "./2021-round1-math.json";
import scienceQuestions from "./2021-round1-science.json";

export const EJU_QUESTIONS = [...questions, ...scienceQuestions] as Question[];
