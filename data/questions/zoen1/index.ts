import type { ChoiceKey, Question, Session } from "@/lib/questions/types";
import sourceJson from "./2026-september.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

type SourceItem = {
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
};

type Paper = {
  session: "mondai-a" | "mondai-b";
  paper: "A" | "B";
  officialQuestionCount: number;
  publishedCount: number;
  questionUrl: string;
  questionSha256: string;
  questions: SourceItem[];
};

type Source = {
  exam: "zoen1";
  year: 2026;
  season: "september";
  allQuestionsRequired: true;
  appliedMultipleAnswerRange: { paper: "mondai-b"; from: 24; to: 29 };
  answerUrl: string;
  answerSha256: string;
  papers: Paper[];
};

function toQuestions(source: Source): Question[] {
  if (!source.allQuestionsRequired || source.papers.length !== 2) throw new Error("Invalid zoen1 exam structure");
  return source.papers.flatMap((paper): Question[] => {
    if (paper.publishedCount !== paper.questions.length || paper.officialQuestionCount !== (paper.session === "mondai-a" ? 36 : 29)) {
      throw new Error(`Invalid zoen1 ${paper.paper} counts`);
    }
    return paper.questions.map((item): Question => {
      const answerKeys = item.officialAnswerNumbers.map((number) => keys[number - 1]);
      if (
        item.number < 1 || item.number > paper.officialQuestionCount ||
        item.choices.length !== 4 || item.choiceExplanations.length !== 4 ||
        answerKeys.length === 0 || answerKeys.some((key) => !key) ||
        new Set(item.officialAnswerNumbers).size !== answerKeys.length ||
        ((paper.session === "mondai-a" || item.number < 24) && answerKeys.length !== 1)
      ) throw new Error(`Invalid zoen1 ${paper.paper} No.${item.number}`);
      const answer = answerKeys.length === 1 ? answerKeys[0]! : answerKeys as ChoiceKey[];
      return {
        id: `zoen1-2026-september-${paper.session}-q${item.number}`,
        exam: "zoen1",
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
        ...(answerKeys.length > 1 ? { requiredSelections: answerKeys.length } : {}),
        officialAnswerNumber: item.officialAnswerNumbers.join("・"),
        explanation: item.explanation,
        choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
        explanationCoverage: "full",
        hasImage: false,
        sourcePdfUrl: paper.questionUrl,
        sourceAnswerUrl: source.answerUrl,
        sourceAttribution: `出典：一般財団法人全国建設研修センター 令和8年度1級造園施工管理技術検定 第一次検定 試験問題${paper.paper} No.${item.number}。ルビ・改行・空白を整理し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
        officialReferenceUrls: item.officialReferenceUrls ?? [],
        license: "JCTC-authorized-reuse",
        lastUpdated: "2026-09-27",
      };
    });
  });
}

/** 令和8年度第一次検定。公式の全65問中、逐語照合と解説確認が済んだ設問のみ公開。 */
export const ZOEN1_QUESTIONS = toQuestions(sourceJson as Source);
