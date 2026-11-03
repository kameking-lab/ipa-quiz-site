import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";

export interface KenkiPaper {
  year: number;
  paper: string;
  questionUrl: string;
  answerUrl: string;
  questions: {
    number: number;
    pdfPage: number;
    category: string;
    topic: string;
    question: string;
    choices: string[];
    officialAnswerNumber: number;
    explanation: string;
    choiceExplanations: string[];
    isCalculation?: boolean;
    imageUrl?: string;
    imageAlt?: string;
  }[];
}
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

/** Official numeric option numbers are retained; only presentation keys are converted. */
export function toKenkiQuestions(source: KenkiPaper, exam: ExamCode): Question[] {
  return source.questions.map((item): Question => {
    const answer = keys[item.officialAnswerNumber - 1];
    if (!answer || item.choices.length !== 4 || item.choiceExplanations.length !== 4) {
      throw new Error(`Invalid ${exam} ${source.year} ${source.paper} No.${item.number}`);
    }
    return {
      id: `${exam}-${source.year}-annual-${source.paper}-q${item.number}`,
      exam, session: "gakka", year: source.year, season: "annual", qNumber: item.number,
      type: "multiple-choice", category: item.category, topicTags: [item.topic], difficulty: 3,
      question: item.question,
      choices: Object.fromEntries(keys.map((key, i) => [key, item.choices[i]])),
      answer, officialAnswerNumber: String(item.officialAnswerNumber),
      explanation: item.explanation,
      choiceExplanations: Object.fromEntries(keys.map((key, i) => [key, item.choiceExplanations[i]])),
      explanationCoverage: "full",
      isCalculation: item.isCalculation,
      hasImage: Boolean(item.imageUrl), imageUrls: item.imageUrl ? [item.imageUrl] : undefined,
      imageAltTexts: item.imageAlt ? [item.imageAlt] : undefined,
      sourcePdfUrl: `${source.questionUrl}#page=${item.pdfPage}`, sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：一般社団法人日本建設機械施工協会 令和${source.year - 2018}年度 建設機械施工管理技術検定 ${source.paper} No.${item.number}。ルビ・空白・改行を整理し、数字の選択肢をア〜エへ変換。解説は過去問AIの独自作成。`,
      license: "JCM-authorized-reuse", lastUpdated: "2026-11-03",
    };
  });
}
