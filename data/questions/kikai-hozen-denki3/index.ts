import type { Question } from "@/lib/questions/types";
import round2023First from "./2023-round1.json";
import specialist2023 from "./2023-round2.json";
import common2023 from "../kikai-hozen3/2023-round2.json";
import round2026 from "./2026-round1.json";
import round2025 from "./2025-round2.json";
import specialist2024 from "./2024-round2.json";
import common2024 from "../kikai-hozen3/2024-round2.json";
import added0 from "./2025-round1.json";
import added1 from "./2024-round1.json";

// 共通15問は両作業の公式原本と正答表を照合済み。本文・解説・原図を参照する。
const shared2024: Question[] = (common2024 as Question[]).filter(q => q.qNumber <= 15).map(q => ({
  ...q,
  id: q.id.replace("kikai-hozen3", "kikai-hozen-denki3"),
  exam: "kikai-hozen-denki3",
  topicTags: ["電気系保全作業", q.category],
  sourcePdfUrl: q.sourcePdfUrl?.replace("2024_3kyu_kikai_mondai_2.pdf", "2024_3kyu_denki_mondai_2.pdf"),
  sourceAnswerUrl: q.sourceAnswerUrl?.replace("2024_3kyu_kikai_kaitou_2.pdf", "2024_3kyu_denki_kaitou_2.pdf"),
  sourceAttribution: q.sourceAttribution?.replace("機械系保全作業", "電気系保全作業"),
}));

// 2023年度第2回も共通15問を両作業の公式原本・正答表で照合済み。
const shared2023: Question[] = (common2023 as Question[]).filter(q => q.qNumber <= 15).map(q => ({
  ...q,
  id: q.id.replace("kikai-hozen3", "kikai-hozen-denki3"),
  exam: "kikai-hozen-denki3",
  topicTags: ["電気系保全作業", q.category],
  sourcePdfUrl: q.sourcePdfUrl?.replace("2023__3kyu_kikai_mondai_2.pdf", "2023__3kyu_denki_mondai_2.pdf"),
  sourceAnswerUrl: q.sourceAnswerUrl?.replace("2023__3kyu_kikai_kaitou_2.pdf", "2023__3kyu_denki_kaitou_2.pdf"),
  sourceAttribution: q.sourceAttribution?.replace("機械系保全作業", "電気系保全作業"),
}));

export const QUESTIONS: Question[] = [...round2026 as Question[], ...round2025 as Question[], ...shared2024, ...specialist2024 as Question[], ...round2023First as Question[], ...shared2023, ...specialist2023 as Question[], ...added0 as Question[], ...added1 as Question[]];

export const KIKAI_HOZEN_DENKI3_QUESTIONS = QUESTIONS;
