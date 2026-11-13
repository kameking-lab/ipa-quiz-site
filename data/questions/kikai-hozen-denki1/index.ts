import type { Question } from "@/lib/questions/types";
import round2025 from "./2025-round2.json";
import specialist2024 from "./2024-round2.json";
import common2024 from "../kikai-hozen1/2024-round2.json";

// 共通25問は両作業の公式原本と正答表を照合済み。本文・解説・原図を参照する。
const shared2024: Question[] = (common2024 as Question[]).filter(q => q.qNumber <= 25).map(q => ({
  ...q,
  id: q.id.replace("kikai-hozen1", "kikai-hozen-denki1"),
  exam: "kikai-hozen-denki1",
  subject: q.subject?.replace("機械系保全作業", "電気系保全作業"),
  topicTags: ["電気系保全作業", q.category],
  sourcePdfUrl: q.sourcePdfUrl?.replace("2024_1kyu_kikai_mondai.pdf", "2024_1kyu_denki_mondai.pdf"),
  sourceAnswerUrl: q.sourceAnswerUrl?.replace("2024_1kyu_kikai_kaitou.pdf", "2024_1kyu_denki_kaitou.pdf"),
  sourceAttribution: q.sourceAttribution?.replace("機械系保全作業", "電気系保全作業"),
}));

export const QUESTIONS: Question[] = [...round2025 as Question[], ...shared2024, ...specialist2024 as Question[]];
