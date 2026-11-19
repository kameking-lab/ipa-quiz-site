import type { Question } from "@/lib/questions/types";
import round149 from "./149.json";

export const ZENSHO_CALC_QUESTIONS: Question[] = [
  ...(round149 as Question[]),
];
