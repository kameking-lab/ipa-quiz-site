import type { Question } from "@/lib/questions/types";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import previous from "../batch1/biru-kan.json";
import morning from "@/data/qualification-staging/biru-kan/2026/am-questions.json";
import afternoon from "@/data/qualification-staging/biru-kan/2026/pm-questions.json";

/** レビュー済み原本を保持し、公開時だけ画像URLと公開フラグを変換する。 */
export const BIRU_KAN_2026_QUESTIONS: Question[] = ([...morning, ...afternoon] as Question[])
  .map(q => ({
    ...q,
    publicAllowed: true,
    imageUrls: q.imageUrls?.map(url => url.replace("data/qualification-staging/biru-kan/2026/images/", "/questions/biru-kan/2026/")),
  }))
  .filter(isPracticeReadyQuestion);

export const BIRU_KAN_QUESTIONS: Question[] = [
  ...previous as Question[],
  ...BIRU_KAN_2026_QUESTIONS,
].filter(isPracticeReadyQuestion);
