import type { ChoiceKey, Question, Season, Session } from "@/lib/questions/types";
import paperA from "./2026-july-a.json";
import paperB from "./2026-july-b.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

export type Civil1SourceItem = {
  number: number;
  pdfPage: number;
  category: string;
  topic: string;
  officialAnswerNumber: number;
  question: string;
  choices: string[];
  explanation: string;
  choiceExplanations: string[];
  imageUrl?: string;
  officialReferenceUrls?: string[];
};

export type Civil1Source = {
  year: number;
  season: Season;
  session: Session;
  paper: "A" | "B";
  questionUrl: string;
  answerUrl: string;
  questions: Civil1SourceItem[];
  lastUpdated?: string;
  publicationStatus?: "accepted" | "draft" | "held";
};

export function toCivil1Questions(source: Civil1Source): Question[] {
  if (source.publicationStatus && source.publicationStatus !== "accepted") {
    throw new Error(`Unaccepted civil1 ${source.year}-${source.season} ${source.paper} source`);
  }
  const questionNumbers = new Set<number>();
  const examYearLabel = source.year >= 2019 ? `令和${source.year - 2018}年度` : `${source.year}年度`;
  return source.questions.map((item) => {
    if (!Number.isInteger(item.number) || item.number < 1 || questionNumbers.has(item.number)) {
      throw new Error(`Duplicate or invalid civil1 ${source.year}-${source.season} ${source.paper} record No.${item.number}`);
    }
    questionNumbers.add(item.number);
    const answer = keys[item.officialAnswerNumber - 1];
    if (!answer || item.choices.length !== 4 || item.choiceExplanations.length !== 4
      || item.choices.some((choice) => !choice.trim()) || item.choiceExplanations.some((reason) => !reason.trim())) {
      throw new Error(`Invalid civil1 ${source.year}-${source.season} ${source.paper} record No.${item.number}`);
    }
    return {
      id: `civil1-${source.year}-${source.season}-${source.session}-q${item.number}`,
      exam: "civil1",
      session: source.session,
      year: source.year,
      season: source.season,
      qNumber: item.number,
      type: "multiple-choice",
      category: item.category,
      topicTags: [item.topic],
      difficulty: 3,
      question: item.question,
      choices: Object.fromEntries(keys.map((key, index) => [key, item.choices[index]])),
      answer,
      officialAnswerNumber: String(item.officialAnswerNumber),
      explanation: item.explanation,
      choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
      explanationCoverage: "full",
      hasImage: Boolean(item.imageUrl),
      imageUrls: item.imageUrl ? [item.imageUrl] : undefined,
      sourcePdfUrl: source.questionUrl,
      sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：一般財団法人全国建設研修センター ${examYearLabel}1級土木施工管理技術検定 第一次検定 試験問題${source.paper} No.${item.number}。ルビ・改行・空白を整理し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
      officialReferenceUrls: item.officialReferenceUrls ?? [],
      license: "JCTC-authorized-reuse",
      lastUpdated: source.lastUpdated ?? "2026-09-26",
    };
  });
}

/** 令和8年度（7月5日実施）第一次検定。問題A 66問・問題B 34問（No.7は解釈未確定のため保留）。 */
export const CIVIL1_2026_A_QUESTIONS = toCivil1Questions(paperA as Civil1Source);
export const CIVIL1_2026_B_QUESTIONS = toCivil1Questions(paperB as Civil1Source);
export const CIVIL1_QUESTIONS: Question[] = [...CIVIL1_2026_A_QUESTIONS, ...CIVIL1_2026_B_QUESTIONS];
