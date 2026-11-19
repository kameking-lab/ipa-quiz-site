import type { ChoiceKey, Question } from "@/lib/questions/types";
import general2024 from "./2024-general.json";
import required2024 from "./2024-required.json";

const organization = "一般財団法人動物看護師統一認定機構";
const sourceAnswerUrl = "https://www.ccrvn.jp/aigan_shiken/seitou.d2kokkasiken.pdf";

function convert(
  paper: typeof general2024,
  session: "required" | "ippan",
  subject: string,
  sourcePdfUrl: string,
  answerPage: number,
): Question[] {
  return paper.map(({ page, category: topic, answer, ...question }) => ({
    ...question,
    answer: Array.isArray(answer) ? (answer as ChoiceKey[]) : answer,
    id: `aigan-kangoshi-2024-annual-${session}-q${question.qNumber}`,
    exam: "aigan-kangoshi",
    year: 2024,
    examDate: "2024-02-18",
    season: "annual",
    session,
    subject,
    category: subject,
    type: "multiple-choice",
    difficulty: 2,
    topicTags: [topic],
    hasImage: false,
    officialQuestionLabel: `${subject} 問${question.qNumber}`,
    sourcePdfUrl,
    sourceAnswerUrl,
    sourceAttribution: `出典：${organization} 第2回愛玩動物看護師国家試験 ${subject} 問${question.qNumber}（問題PDF ${page}ページ、正答PDF ${answerPage}ページ）。解説は過去問AI独自作成。`,
    license: "CCRVN-owner-authorized",
    explanationCoverage: "full",
    lastUpdated: "2026-11-19",
  }));
}

export const AIGAN_KANGOSHI_QUESTIONS: Question[] = [
  ...convert(required2024, "required", "必須問題", "https://www.ccrvn.jp/aigan_shiken/hissu.d2kokkasiken.pdf", 1),
  ...convert(general2024, "ippan", "一般問題", "https://www.ccrvn.jp/aigan_shiken/ippan.d2kokkasiken.pdf", 2),
];
