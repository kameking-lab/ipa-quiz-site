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
  officialReferenceUrls?: string[];
  imageUrl?: string;
};

export type JctcFirstSource = {
  exam: "zoen2" | "tsushin2";
  year: 2025 | 2026;
  season: "early" | "late";
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
  if (source.year === 2025 && (source.exam !== "zoen2" || source.season !== "late")) {
    throw new Error("Only 2025 late zoen2 is supported");
  }
  if (source.year === 2026 && source.season !== "early") {
    throw new Error("Only 2026 early is supported");
  }
  return source.questions.map((item) => {
    const answerKeys = item.officialAnswerNumbers.map((number) => keys[number - 1]);
    if (
      item.choices.length !== 4 || item.choiceExplanations.length !== 4 ||
      answerKeys.length === 0 || answerKeys.some((key) => !key) ||
      new Set(item.officialAnswerNumbers).size !== answerKeys.length
    ) {
      throw new Error(`Invalid ${source.exam} ${source.year} ${source.season} No.${item.number}`);
    }
    const answer = answerKeys.length === 1 ? answerKeys[0]! : answerKeys as ChoiceKey[];
    return {
      id: `${source.exam}-${source.year}-${source.season}-gakka-q${item.number}`,
      exam: source.exam as ExamCode,
      session: "gakka",
      year: source.year,
      season: source.season,
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
      sourceAttribution: `出典：一般財団法人全国建設研修センター 令和${source.year - 2018}年度${names[source.exam]} 第一次検定（${source.season === "early" ? "前期" : "後期"}） No.${item.number}。ルビ・改行・空白を整理し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
      officialReferenceUrls: item.officialReferenceUrls ?? [],
      license: "JCTC-authorized-reuse",
      lastUpdated: "2026-09-27",
    };
  });
}
