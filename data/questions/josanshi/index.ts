import type { Question } from "@/lib/questions/types";
import baseline from "./medical34-live.json";
import additions from "./latest-two-additions.json";
import paper2023 from "./2023-annual.json";
import paper2022 from "./2022-annual.json";

/** 第109・108回の採点対象219問と、第107回午前の確認済み10問。採点除外は未収録。 */
export const JOSANSHI_QUESTIONS: Question[] = ([...baseline, ...additions, ...paper2023, ...paper2022] as Question[]).filter(
  question => question.needsReview === false,
).sort(
  (a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber,
);
