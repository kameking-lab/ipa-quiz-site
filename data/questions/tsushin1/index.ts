import type { ChoiceKey, Question, Session } from "@/lib/questions/types";
import sourceJson from "./2026-september.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

type Item = {
  number: number;
  pdfPage: number;
  category: string;
  topic: string;
  officialAnswerNumbers: number[];
  question: string;
  choices: string[];
  explanation: string;
  choiceExplanations: string[];
  officialReferenceUrls?: string[];
  imageUrls?: string[];
  imageAltTexts?: string[];
  lastUpdated?: string;
};

type Paper = {
  session: "mondai-a" | "mondai-b";
  paper: "A" | "B";
  officialQuestionCount: number;
  publishedCount: number;
  questionUrl: string;
  questionSha256: string;
  questions: Item[];
};

type Source = {
  exam: "tsushin1";
  year: 2026;
  season: "september";
  answerUrl: string;
  answerSha256: string;
  papers: Paper[];
};

function toQuestions(source: Source): Question[] {
  if (source.papers.length !== 2) throw new Error("Invalid tsushin1 exam structure");
  return source.papers.flatMap((paper): Question[] => {
    if (paper.publishedCount !== paper.questions.length || paper.officialQuestionCount !== (paper.session === "mondai-a" ? 55 : 35)) {
      throw new Error(`Invalid tsushin1 ${paper.paper} counts`);
    }
    return paper.questions.map((item): Question => {
      const [number] = item.officialAnswerNumbers;
      const answer = number ? keys[number - 1] : undefined;
      if (
        item.number < 1 || item.number > paper.officialQuestionCount ||
        item.choices.length !== 4 || item.choiceExplanations.length !== 4 ||
        item.officialAnswerNumbers.length !== 1 || !answer ||
        !item.question || !item.explanation
      ) throw new Error(`Invalid tsushin1 ${paper.paper} No.${item.number}`);
      return {
        id: `tsushin1-2026-september-${paper.session}-q${item.number}`,
        exam: "tsushin1",
        session: paper.session as Session,
        year: 2026,
        season: "september",
        qNumber: item.number,
        type: "multiple-choice",
        category: item.category,
        topicTags: [item.topic],
        difficulty: 3,
        question: item.question,
        choices: Object.fromEntries(keys.map((key, index) => [key, item.choices[index]])),
        answer,
        officialAnswerNumber: String(number),
        explanation: item.explanation,
        choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
        explanationCoverage: "full",
        hasImage: (item.imageUrls?.length ?? 0) > 0,
        imageUrls: item.imageUrls,
        imageAltTexts: item.imageAltTexts,
        sourcePdfUrl: paper.questionUrl,
        sourceAnswerUrl: source.answerUrl,
        sourceAttribution: `出典：一般財団法人全国建設研修センター 令和8年度1級電気通信工事施工管理技術検定 第一次検定 試験問題${paper.paper} No.${item.number}。ルビ・改行・空白を整理し、添字・指数・分数を文字化。図中の情報は原本画像と併記し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
        officialReferenceUrls: item.officialReferenceUrls ?? [],
        license: "JCTC-authorized-reuse",
        lastUpdated: item.lastUpdated ?? "2026-09-27",
      };
    });
  });
}

/** 令和8年度第一次検定。公式のA55問・B35問、全90問の問題・正答・全肢解説を収録。 */
export const TSUSHIN1_QUESTIONS = toQuestions(sourceJson as Source);
