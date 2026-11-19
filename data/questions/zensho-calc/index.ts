import type { Question } from "@/lib/questions/types";
import round149 from "./149.json";
import round148 from "./148.json";

export const ZENSHO_CALC_QUESTIONS: Question[] = [
  ...(round149 as Question[]),
  ...(round148 as Question[]),
];
