import type { ChoiceKey, Question, Season, Session } from "@/lib/questions/types";
import paperA from "./2026-july-a.json";
import paperB from "./2026-july-b.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

type Civil1SourceItem = {
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

type Civil1Source = {
  year: number;
  season: Season;
  session: Session;
  paper: "A" | "B";
  questionUrl: string;
  answerUrl: string;
  questions: Civil1SourceItem[];
};

function toQuestions(source: Civil1Source): Question[] {
  return source.questions.map((item) => {
    const answer = keys[item.officialAnswerNumber - 1];
    if (!answer || item.choices.length !== 4 || item.choiceExplanations.length !== 4) {
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
      sourceAttribution: `出典：一般財団法人全国建設研修センター 令和8年度1級土木施工管理技術検定 第一次検定 試験問題${source.paper} No.${item.number}。ルビ・改行・空白を整理し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
      officialReferenceUrls: item.officialReferenceUrls ?? [],
      license: "JCTC-authorized-reuse",
      lastUpdated: "2026-09-26",
    };
  });
}

/** 令和8年度（7月5日実施）第一次検定。問題A 66問・問題B 34問（No.7は解釈未確定のため保留）。 */
export const CIVIL1_2026_A_QUESTIONS = toQuestions(paperA as Civil1Source);
export const CIVIL1_2026_B_QUESTIONS = toQuestions(paperB as Civil1Source);
export const CIVIL1_QUESTIONS: Question[] = [...CIVIL1_2026_A_QUESTIONS, ...CIVIL1_2026_B_QUESTIONS];
