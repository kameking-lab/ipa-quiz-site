// TEST ONLY: archived original prompts; never public supply.
import type { EssayQuestion } from "@/lib/essay/types";
import { ST_ESSAY_QUESTIONS } from "@/data/questions/essay/st";
import { SA_ESSAY_QUESTIONS } from "@/data/questions/essay/sa";
import { PM_ESSAY_QUESTIONS } from "@/data/questions/essay/pm";
import { SM_ESSAY_QUESTIONS } from "@/data/questions/essay/sm";
import { AU_ESSAY_QUESTIONS } from "@/data/questions/essay/au";

export const ALL_ESSAY_QUESTIONS: EssayQuestion[] = [
  ...ST_ESSAY_QUESTIONS,
  ...SA_ESSAY_QUESTIONS,
  ...PM_ESSAY_QUESTIONS,
  ...SM_ESSAY_QUESTIONS,
  ...AU_ESSAY_QUESTIONS,
];
