import type { EssayQuestion } from "@/lib/essay/types";
import { ST_ESSAY_QUESTIONS } from "./st";
import { SA_ESSAY_QUESTIONS } from "./sa";
import { PM_ESSAY_QUESTIONS } from "./pm";
import { SM_ESSAY_QUESTIONS } from "./sm";
import { AU_ESSAY_QUESTIONS } from "./au";

export const ALL_ESSAY_QUESTIONS: EssayQuestion[] = [
  ...ST_ESSAY_QUESTIONS,
  ...SA_ESSAY_QUESTIONS,
  ...PM_ESSAY_QUESTIONS,
  ...SM_ESSAY_QUESTIONS,
  ...AU_ESSAY_QUESTIONS,
];
