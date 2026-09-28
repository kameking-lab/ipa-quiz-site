import type { ChoiceKey, ExamCode, Question, Session } from "@/lib/questions/types";

/** 社会福祉振興・試験センターの福祉系国家試験（社会福祉士・精神保健福祉士）の共通ローダー。 */

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

export type SsscSourceItem = {
  number: number;
  session: "kyotsu" | "senmon";
  subject: string;
  pdfFile: string;
  pdfPage: number;
  question: string;
  choices: string[];
  officialAnswer: number[];
  summary: string;
  choiceExplanations: string[];
  lawSensitive: boolean;
};

export type SsscSource = {
  title: string;
  round: number;
  fiscalYear: number;
  examDate: string;
  answerUrl: string;
  /** 法改正注意書きに表示する出題時点（省略時は第38回・第28回の「令和8年1〜2月」）。 */
  lawNoticePeriod?: string;
  /** 解説の最終更新日（省略時は 2026-09-26）。 */
  lastUpdated?: string;
  questionPdfs: Record<string, { url: string; sha256: string }>;
  /** 公開データから除外した問題（原文と一次資料から公式正答を一意に説明できないもの）。 */
  withheld?: { session: SsscSourceItem["session"]; number: number; status: string; reason: string }[];
  questions: SsscSourceItem[];
};

/** 独自解説であることを各問題の出典欄に表示する。 */
export const SSSC_INDEPENDENCE_NOTICE = "解説は過去問AIが独自に作成したもので、公益財団法人社会福祉振興・試験センターとは関係ありません。";

const lawNotice = (period = "令和8年1〜2月") =>
  `※出題時点（${period}）の制度に基づく解説です。その後の法改正等で結論が変わる場合があります。`;

const SESSION_LABEL: Record<SsscSourceItem["session"], string> = { kyotsu: "共通科目", senmon: "専門科目" };

export function toSsscQuestion(
  exam: ExamCode,
  edition: Pick<SsscSource, "title" | "fiscalYear" | "examDate" | "answerUrl" | "lawNoticePeriod" | "lastUpdated">,
  pdfs: SsscSource["questionPdfs"],
  item: SsscSourceItem,
): Question {
  const answerKeys = item.officialAnswer.map((n) => keys[n - 1]);
  if (item.choices.length !== 5 || item.choiceExplanations.length !== 5 || answerKeys.some((key) => !key) || answerKeys.length < 1 || answerKeys.length > 2) {
    throw new Error(`Invalid ${exam} source record 問題${item.number}`);
  }
  const pdf = pdfs[item.pdfFile];
  if (!pdf) throw new Error(`Missing official PDF for ${exam} 問題${item.number}`);
  const session: Session = item.session;
  return {
    id: `${exam}-${edition.fiscalYear}-annual-${session}-q${item.number}`,
    exam,
    session,
    year: edition.fiscalYear,
    season: "annual",
    qNumber: item.number,
    examDate: edition.examDate,
    subject: item.subject,
    officialAnswerNumber: item.officialAnswer.join(","),
    type: "multiple-choice",
    category: item.subject,
    topicTags: [item.subject, SESSION_LABEL[item.session]],
    difficulty: 2,
    question: item.question,
    choices: Object.fromEntries(keys.map((key, index) => [key, item.choices[index]])),
    answer: answerKeys.length === 1 ? answerKeys[0]! : (answerKeys as ChoiceKey[]),
    ...(answerKeys.length > 1 ? { requiredSelections: answerKeys.length } : {}),
    explanation: item.lawSensitive ? `${item.summary}\n${lawNotice(edition.lawNoticePeriod)}` : item.summary,
    choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
    explanationCoverage: "full",
    hasImage: false,
    sourcePdfUrl: pdf.url,
    sourceAnswerUrl: edition.answerUrl,
    sourceAttribution: `出典：公益財団法人社会福祉振興・試験センター ${edition.title} ${SESSION_LABEL[item.session]} 問題${item.number}。${SSSC_INDEPENDENCE_NOTICE}`,
    license: "SSSC-reuse",
    lastUpdated: edition.lastUpdated ?? "2026-09-26",
  };
}
