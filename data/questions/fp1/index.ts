import type { Question } from "@/lib/questions/types";
import launch from "./launch.json";
import addition from "./2026-may-addition.json";
import septemberFirstThree from "./2026-september-q01-q03.json";

/** 2026年5月基礎編50問と2026年9月基礎編の公開済み問1〜3。 */
export const FP1_QUESTIONS: Question[] = [...launch, ...addition, ...septemberFirstThree]
  .sort((a, b) => a.year - b.year || a.season.localeCompare(b.season) || a.qNumber - b.qNumber) as Question[];
