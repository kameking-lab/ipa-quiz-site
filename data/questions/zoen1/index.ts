import type { ChoiceKey, Question, Session } from "@/lib/questions/types";
import source2023 from "./2023-september.json";
import source2024 from "./2024-september.json";
import sourceJson from "./2026-september.json";
import supplementJson from "./2026-september-supplement5.json";
import supplement6Json from "./2026-september-supplement6.json";
import supplement7Json from "./2026-september-supplement7.json";
import supplement8Json from "./2026-september-supplement8.json";
import supplement9Json from "./2026-september-supplement9.json";
import supplement10Json from "./2026-september-supplement10.json";
import supplement11Json from "./2026-september-supplement11.json";

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
  imageUrls?: string[];
  imageAltTexts?: string[];
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
  year: number;
  season: "september";
  allQuestionsRequired: true;
  appliedMultipleAnswerRange: { paper: "mondai-b"; from: 24; to: 29 };
  answerUrl: string;
  answerSha256: string;
  papers: Paper[];
};

function toQuestions(source: Source, lastUpdated = "2026-09-27"): Question[] {
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
        id: `zoen1-${source.year}-${source.season}-${paper.session}-q${item.number}`,
        exam: "zoen1",
        session: paper.session as Session,
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
        ...(answerKeys.length > 1 ? { requiredSelections: answerKeys.length } : {}),
        officialAnswerNumber: item.officialAnswerNumbers.join("・"),
        explanation: item.explanation,
        choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
        explanationCoverage: "full",
        hasImage: Boolean(item.imageUrls?.length),
        ...(item.imageUrls?.length ? { imageUrls: item.imageUrls, imageAltTexts: item.imageAltTexts } : {}),
        sourcePdfUrl: paper.questionUrl,
        sourceAnswerUrl: source.answerUrl,
        sourceAttribution: `出典：一般財団法人全国建設研修センター 令和${source.year - 2018}年度1級造園施工管理技術検定 第一次検定 試験問題${paper.paper} No.${item.number}。ルビ・改行・空白を整理し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
        officialReferenceUrls: item.officialReferenceUrls ?? [],
        license: "JCTC-authorized-reuse",
        lastUpdated,
      };
    });
  });
}

export const ZOEN1_QUESTIONS = [
  ...toQuestions(sourceJson as Source),
  ...toQuestions(supplementJson as Source, "2026-10-11"),
  ...toQuestions(supplement6Json as Source, "2026-10-11"),
  ...toQuestions(supplement7Json as Source, "2026-10-11"),
  ...toQuestions(supplement8Json as Source, "2026-10-11"),
  ...toQuestions(supplement9Json as Source, "2026-10-11"),
  ...toQuestions(supplement10Json as Source, "2026-10-11"),
  ...toQuestions(supplement11Json as Source, "2026-11-06"),
  ...toQuestions(source2024 as Source, "2026-11-20"),
  ...toQuestions(source2023 as Source, "2026-11-20"),
].sort((a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber);

if (new Set(ZOEN1_QUESTIONS.map((question) => question.id)).size !== ZOEN1_QUESTIONS.length) {
  throw new Error("Duplicate zoen1 question IDs");
}
