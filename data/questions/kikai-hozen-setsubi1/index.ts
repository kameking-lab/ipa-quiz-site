import type { Question } from "@/lib/questions/types";
import common from "../kikai-hozen-denki1/2025-round2.json";
import specialist from "./2025-round2.json";
import added0 from "./2024-round2.json";
import added1 from "./2023-round2.json";

// 共通25問は両作業の公式原本で本文・選択肢・正答を照合済み。原稿と原図を再利用する。
const shared: Question[] = (common as Question[]).filter(q => q.qNumber <= 25).map(q => ({
  ...q,
  id: q.id.replace("kikai-hozen-denki1", "kikai-hozen-setsubi1"),
  exam: "kikai-hozen-setsubi1",
  topicTags: ["設備診断作業", q.category],
  sourcePdfUrl: q.sourcePdfUrl?.replace("2025_1kyu_denki_mondai.pdf", "2025_1kyu_setubi_mondai.pdf"),
  sourceAnswerUrl: q.sourceAnswerUrl?.replace("2025_1kyu_denki_kaitou.pdf", "2025_1kyu_setubi_kaitou.pdf"),
  sourceAttribution: q.sourceAttribution?.replace("電気系保全作業", "設備診断作業"),
}));

export const QUESTIONS: Question[] = [...shared, ...specialist as Question[], ...added0 as Question[], ...added1 as Question[]];
