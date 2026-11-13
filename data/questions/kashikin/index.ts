import type { Question } from "@/lib/questions/types";
import questions0 from "./2025-annual.json";
import questions1 from "./2024-annual.json";
import questions2 from "./2019-annual.json";
import questions3 from "./2018-annual.json";
import questions4 from "./2017-annual.json";
import questions5 from "./2022-annual.json";
import questions6 from "./2021-annual.json";
import questions7 from "./2020-annual.json";
import questions8 from "./2016-annual.json";
import questions9 from "./2023-annual.json";

export const KASHIKIN_QUESTIONS: Question[] = [...questions0, ...questions1, ...questions2, ...questions3, ...questions4, ...questions5, ...questions6, ...questions7, ...questions8, ...questions9] as Question[];
KASHIKIN_QUESTIONS.sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
