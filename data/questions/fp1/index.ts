import type { Question } from "@/lib/questions/types";
import launch from "./launch.json";
import addition from "./2026-may-addition.json";
import septemberFirstThree from "./2026-september-q01-q03.json";
import septemberReady from "./2026-september-q04-q20-ready.json";
import september21to35 from "./2026-september-q21-q35.json";
import september36to50 from "./2026-september-q36-q50.json";

/** Reviewed basic-paper originals, separated by sitting and original question number. */
export const FP1_QUESTIONS: Question[] = [...launch, ...addition, ...septemberFirstThree, ...septemberReady, ...september21to35, ...september36to50]
  .sort((a, b) => a.year - b.year || a.season.localeCompare(b.season) || a.qNumber - b.qNumber) as Question[];
