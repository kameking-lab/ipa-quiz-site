import type { Question } from "@/lib/questions/types";
import candidate from "./medical34-live.json";
import completion from "./latest-two-completion-20261011.json";
import paper2023 from "./2023-annual.json";
import paper2022 from "./2022-annual.json";
import paper2021 from "./2021-annual.json";

/** 第112・111回の202原問に、第110～108回の午前各10問を追加。確認済み原問だけを公開。 */
export const HOKENSHI_QUESTIONS: Question[] = ([...candidate, ...completion, ...paper2023, ...paper2022, ...paper2021] as Question[]).filter(
  question => question.needsReview === false,
).sort(
  (a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber,
);
