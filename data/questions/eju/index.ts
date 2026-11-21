import type { Question } from "@/lib/questions/types";
import questions from "./2021-round1-math.json";
import scienceQuestions from "./2021-round1-science.json";
import math2020Round2 from "./2020-round2-math.json";
import science2020Round2 from "./2020-round2-science.json";
import math2019Round1 from "./2019-round1-math.json";
import science2019Round1 from "./2019-round1-science.json";

export const EJU_QUESTIONS = [
  ...questions,
  ...scienceQuestions,
  ...math2020Round2,
  ...science2020Round2,
  ...math2019Round1,
  ...science2019Round1,
] as Question[];
