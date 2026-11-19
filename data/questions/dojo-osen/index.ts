import type { Question } from "@/lib/questions/types";
import questions from "../batch3/dojo-osen.json";
import annual2026 from "./2026-annual.json";
/** INT7 public projection; reviewed source manuscripts remain private and unchanged. */
export const QUESTIONS: Question[] = [...(questions as Question[]), ...(annual2026 as Question[])];
