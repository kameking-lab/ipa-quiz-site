import type { Question } from "@/lib/questions/types";
import required2024 from "./2024-required.json";

const organization = "一般財団法人動物看護師統一認定機構";
const sourcePdfUrl = "https://www.ccrvn.jp/aigan_shiken/hissu.d2kokkasiken.pdf";
const sourceAnswerUrl = "https://www.ccrvn.jp/aigan_shiken/seitou.d2kokkasiken.pdf";

export const AIGAN_KANGOSHI_QUESTIONS: Question[] = required2024.map(({ page, category: topic, ...question }) => ({
  ...question,
  id: `aigan-kangoshi-2024-annual-required-q${question.qNumber}`,
  exam: "aigan-kangoshi",
  year: 2024,
  examDate: "2024-02-18",
  season: "annual",
  session: "required",
  subject: "必須問題",
  category: "必須問題",
  type: "multiple-choice",
  difficulty: 2,
  topicTags: [topic],
  hasImage: false,
  officialQuestionLabel: `必須 問${question.qNumber}`,
  sourcePdfUrl,
  sourceAnswerUrl,
  sourceAttribution: `出典：${organization} 第2回愛玩動物看護師国家試験 必須問題 問${question.qNumber}（問題PDF ${page}ページ、正答PDF 1ページ）。解説は過去問AI独自作成。`,
  license: "CCRVN-owner-authorized",
  explanationCoverage: "full",
  lastUpdated: "2026-11-19",
}));
