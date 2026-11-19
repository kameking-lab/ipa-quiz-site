import { CHOICE_KEYS } from "@/lib/questions/answers";
import type { ChoiceKey, Question, Season } from "@/lib/questions/types";
import main2025 from "./2025-main.json";

interface SourceRound {
  sourcePdfUrl: string;
  sourceAnswerUrl: string;
  passages: {
    text: string;
    questions: {
      number: number;
      label: string;
      page: number;
      category: string;
      topic: string;
      prompt: string;
      options: { mark: string; text: string; explanation: string }[];
      officialAnswers: string[];
      explanation: string;
    }[];
  }[];
}

function convert(year: number, season: Season, title: string, source: SourceRound): Question[] {
  return source.passages.flatMap(({ text, questions }) => questions.map((item): Question => {
    const choices: Partial<Record<ChoiceKey, string>> = {};
    const choiceExplanations: Partial<Record<ChoiceKey, string>> = {};
    const marks = new Map<string, ChoiceKey>();
    for (const option of item.options) {
      const key = CHOICE_KEYS[Number.parseInt(option.mark, 16)];
      if (!key || marks.has(option.mark)) throw new Error(`情報Ⅰ ${year} ${title} ${item.label}: 解答群が不正`);
      marks.set(option.mark, key);
      choices[key] = option.text;
      choiceExplanations[key] = option.explanation;
    }
    const answers = item.officialAnswers.map((mark) => {
      const key = marks.get(mark);
      if (!key) throw new Error(`情報Ⅰ ${year} ${title} ${item.label}: 正答 ${mark} が解答群にない`);
      return key;
    });
    return {
      id: `kyotsu-joho1-${year}-${season}-kyotsu-q${item.number}`,
      exam: "kyotsu-joho1",
      session: "kyotsu",
      year,
      season,
      qNumber: item.number,
      officialQuestionLabel: item.label,
      officialAnswerNumber: item.officialAnswers.join("・"),
      type: "multiple-choice",
      category: item.category,
      topicTags: [item.topic],
      difficulty: 3,
      question: [text, item.prompt].filter(Boolean).join("\n\n"),
      choices,
      answer: answers.length === 1 ? answers[0] : answers,
      ...(answers.length > 1 ? { requiredSelections: answers.length } : {}),
      explanation: item.explanation,
      choiceExplanations,
      explanationCoverage: "full",
      hasImage: false,
      sourcePdfUrl: `${source.sourcePdfUrl}#page=${item.page}`,
      sourceAnswerUrl: source.sourceAnswerUrl,
      sourceAttribution: `出典：独立行政法人大学入試センター 令和${year - 2018}年度 ${title}「情報Ⅰ」${item.label}。解説は過去問AIの独自作成。`,
      license: "DNC-owner-decision",
      lastUpdated: "2026-11-20",
    };
  }));
}

export const KYOTSU_JOHO1_QUESTIONS: Question[] = [
  ...convert(2025, "first", "本試験", main2025),
];
