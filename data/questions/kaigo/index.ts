import type { ChoiceKey, Question } from "@/lib/questions/types";
import source2024 from "./2024-annual.json";
import source2025 from "./2025-annual.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

type KaigoSourceItem = {
  number: number;
  part: string;
  subject: string;
  pdfFile: string;
  pdfPage: number;
  question: string;
  choices: string[];
  officialAnswer: number[];
  summary: string;
  choiceExplanations: string[];
  lawSensitive: boolean;
  choiceImages?: { publicPath: string; sha256: string }[];
  questionImages?: { publicPath: string; sha256: string }[];
  figureSource?: { file: string; pdfPage: number; printedPage: number };
};

type KaigoSource = {
  title: string;
  round: number;
  fiscalYear: number;
  examDate: string;
  answerUrl: string;
  questionPdfs: Record<string, { url: string; sha256: string }>;
  questions: KaigoSourceItem[];
};

/** 独自解説であることを各問題の出典欄に表示する。 */
export const KAIGO_INDEPENDENCE_NOTICE = "解説は過去問AIが独自に作成したもので、公益財団法人社会福祉振興・試験センターとは関係ありません。";

function toQuestion(item: KaigoSourceItem, data: KaigoSource): Question {
  const answerKeys = item.officialAnswer.map((n) => keys[n - 1]);
  if (item.choices.length !== 5 || item.choiceExplanations.length !== 5 || answerKeys.length !== 1 || !answerKeys[0]) {
    throw new Error(`Invalid kaigo source record 問題${item.number}`);
  }
  const pdf = data.questionPdfs[item.pdfFile];
  if (!pdf) throw new Error(`Missing official PDF for kaigo 問題${item.number}`);
  const figureNote = item.figureSource
    ? item.choiceImages
      ? `選択肢の図は公式問題PDF（${item.figureSource.printedPage}ページ）、選択肢の文は同センターの音声読み上げ用試験問題の説明文。`
      : `図は公式問題PDF（${item.figureSource.printedPage}ページ）から引用。`
    : "";
  const lawNotice = `※出題時点（${data.fiscalYear === 2024 ? "令和7年1月" : "令和8年1月"}）の制度に基づく解説です。その後の法改正等で結論が変わる場合があります。`;
  return {
    id: `kaigo-${data.fiscalYear}-annual-gakka-q${item.number}`,
    exam: "kaigo",
    session: "gakka",
    year: data.fiscalYear,
    season: "annual",
    qNumber: item.number,
    examDate: data.examDate,
    subject: item.subject,
    officialAnswerNumber: String(item.officialAnswer[0]),
    type: "multiple-choice",
    category: item.subject,
    topicTags: [item.subject, data.fiscalYear === 2024 ? item.part : `${item.part}パート`],
    difficulty: 2,
    question: item.question,
    choices: Object.fromEntries(keys.map((key, index) => [key, item.choices[index]])),
    answer: answerKeys[0],
    explanation: item.lawSensitive ? `${item.summary}\n${lawNotice}` : item.summary,
    choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
    explanationCoverage: "full",
    hasImage: Boolean(item.questionImages?.length),
    imageUrls: item.questionImages?.map((image) => image.publicPath),
    choiceImageUrls: item.choiceImages
      ? Object.fromEntries(keys.map((key, index) => [key, item.choiceImages![index]!.publicPath]))
      : undefined,
    sourcePdfUrl: pdf.url,
    sourceAnswerUrl: data.answerUrl,
    sourceAttribution: `出典：公益財団法人社会福祉振興・試験センター ${data.title} 問題${item.number}。${figureNote}${KAIGO_INDEPENDENCE_NOTICE}`,
    license: "SSSC-reuse",
    lastUpdated: data.fiscalYear === 2024 ? "2026-09-28" : "2026-09-26",
  };
}

/** 第37回（令和6年度）介護福祉士国家試験 全125問。 */
export const KAIGO_2024_QUESTIONS: Question[] = (source2024 as KaigoSource).questions.map((item) => toQuestion(item, source2024 as KaigoSource));

/** 第38回（令和7年度）介護福祉士国家試験 全125問。 */
export const KAIGO_2025_QUESTIONS: Question[] = (source2025 as KaigoSource).questions.map((item) => toQuestion(item, source2025 as KaigoSource));

export const KAIGO_QUESTIONS: Question[] = [...KAIGO_2025_QUESTIONS, ...KAIGO_2024_QUESTIONS];
