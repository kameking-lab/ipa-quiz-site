import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";

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
  imageUrl?: string;
};

export type JctcFirstSource = {
  exam: "zoen2" | "tsushin2";
  year: 2026;
  season: "early";
  session: "gakka";
  officialQuestionCount: number;
  publishedCount: number;
  questionUrl: string;
  answerUrl: string;
  questions: SourceItem[];
};

const names = {
  zoen2: "2級造園施工管理技術検定",
  tsushin2: "2級電気通信工事施工管理技術検定",
} as const;

export function toJctcFirstQuestions(source: JctcFirstSource): Question[] {
  if (source.publishedCount !== source.questions.length) throw new Error(`${source.exam} published count mismatch`);
  return source.questions.map((item) => {
    const answerKeys = item.officialAnswerNumbers.map((number) => keys[number - 1]);
    if (
      item.choices.length !== 4 || item.choiceExplanations.length !== 4 ||
      answerKeys.length === 0 || answerKeys.some((key) => !key) ||
      new Set(item.officialAnswerNumbers).size !== answerKeys.length
    ) {
      throw new Error(`Invalid ${source.exam} 2026 early No.${item.number}`);
    }
    const answer = answerKeys.length === 1 ? answerKeys[0]! : answerKeys as ChoiceKey[];
    return {
      id: `${source.exam}-2026-early-gakka-q${item.number}`,
      exam: source.exam as ExamCode,
      session: "gakka",
      year: 2026,
      season: "early",
      qNumber: item.number,
      type: "multiple-choice",
      category: item.category,
      topicTags: [item.topic],
      difficulty: 2,
      question: item.question,
      choices: Object.fromEntries(keys.map((key, index) => [key, item.choices[index]])),
      answer,
      ...(answerKeys.length > 1 ? { requiredSelections: answerKeys.length } : {}),
      officialAnswerNumber: item.officialAnswerNumbers.join("・"),
      explanation: item.explanation,
      choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
      explanationCoverage: "full",
      hasImage: Boolean(item.imageUrl),
      imageUrls: item.imageUrl ? [item.imageUrl] : undefined,
      sourcePdfUrl: source.questionUrl,
      sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：一般財団法人全国建設研修センター 令和8年度${names[source.exam]} 第一次検定（前期） No.${item.number}。ルビ・改行・空白を整理し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
      officialReferenceUrls: [],
      license: "JCTC-authorized-reuse",
      lastUpdated: "2026-09-27",
    };
  });
}
