import type { Question } from "@/lib/questions/types";

import existing from "./chintai.json";

import questions2022 from "./chintai-2022.json";

import baseQuestions from "./chintai.json";

import questions2023 from "./chintai-2023.json";


export const CHINTAI_QUESTIONS = [...existing, ...questions2022.filter(q => !q.officialScoring), ...baseQuestions, ...questions2023.filter((question) => !question.officialScoring)] as Question[];
