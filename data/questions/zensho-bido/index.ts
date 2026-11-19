import type { Question } from "@/lib/questions/types";
import round73 from "./round-73.json";
import round72 from "./round-72.json";

export const ZENSHO_BIDO_QUESTIONS: Question[] = [
  ...(round73 as Question[]),
  ...(round72 as Question[]),
];
