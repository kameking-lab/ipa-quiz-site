import type { Question } from "@/lib/questions/types";
import practical2022 from "./2022-september-practical.json";
import practical2023 from "./2023-september-practical.json";
import january2022 from "./2022-january-gakka.json";
import launch from "./launch.json";
import addition from "./2026-may-addition.json";
import septemberFirstThree from "./2026-september-q01-q03.json";
import septemberReady from "./2026-september-q04-q20-ready.json";
import septemberQ10 from "./2026-september-q10.json";
import september21to35 from "./2026-september-q21-q35.json";
import septemberPrimaryFive from "./2026-september-q22-q25-q26-q29-q31.json";
import septemberOptions from "./2026-september-q21.json";
import septemberNisa from "./2026-september-q23.json";
import september36to50 from "./2026-september-q36-q50.json";

/** Reviewed exam originals, separated by sitting and original question number. */
export const FP1_QUESTIONS: Question[] = [...january2022, ...practical2022, ...practical2023, ...launch, ...addition, ...septemberFirstThree, ...septemberReady, ...septemberQ10, ...september21to35, ...septemberPrimaryFive, ...septemberOptions, ...septemberNisa, ...september36to50]
  .sort((a, b) => a.year - b.year || a.season.localeCompare(b.season) || a.qNumber - b.qNumber) as Question[];
