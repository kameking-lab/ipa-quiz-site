import type { Question } from "@/lib/questions/types";
import questions from "../batch3/chiiki-ryoko.json";
import questions2024 from "./2024.json";
/** INT7 public projection; reviewed source manuscripts remain private and unchanged. */
export const QUESTIONS: Question[] = [
  ...(questions as Question[]),
  ...(questions2024 as Question[]),
];
