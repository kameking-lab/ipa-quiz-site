import type { Question } from "@/lib/questions/types";
import round149 from "./149.json";
import round148 from "./148.json";
import round147 from "./147.json";
import round146 from "./146.json";
import round145 from "./145.json";

export const ZENSHO_CALC_QUESTIONS: Question[] = [
  ...(round149 as Question[]),
  ...(round148 as Question[]),
  ...(round147 as Question[]),
  ...(round146 as Question[]),
  ...(round145 as Question[]),
];
