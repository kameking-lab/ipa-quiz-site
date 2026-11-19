import type { ChoiceKey, Question } from "@/lib/questions/types";
import sharedQuestions from "../batch1/gijutsushi1-kikai.json";

// 適性科目は全技術部門で共通。既存の原問、図、解説を共通科目の資格コードでも使う。
const officialKeys: Readonly<Record<number, string>> = {
  2025: "315315144344522",
  2024: "451152435353532",
};
const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"] as const;

export const GIJUTSUSHI1_TEKISEI_QUESTIONS: Question[] = (sharedQuestions as Question[])
  .filter(q => q.session === "ippan" && Object.hasOwn(officialKeys, q.year))
  .map(q => {
    const qNumber = Number(q.officialQuestionLabel?.split("－").at(-1));
    const officialAnswer = Number(officialKeys[q.year]?.[qNumber - 1]);
    if (!officialAnswer || q.answer !== choiceKeys[officialAnswer - 1] || !q.choiceExplanations) {
      throw new Error(`技術士第一次試験 適性科目 ${q.year} 問${qNumber}: 公式正答・解説の不整合`);
    }
    const choiceExplanations = Object.fromEntries(
      Object.entries(q.choiceExplanations).map(([key, explanation]) => [
        key,
        explanation.replace(/^(?:(?:誤り|正答|適切|不適切|正しい組合せ|適切な組合せ|これが正答)です|政令に記載されています)。/, ""),
      ]),
    ) as Partial<Record<ChoiceKey, string>>;
    if (q.year === 2025 && qNumber === 10) {
      choiceExplanations.オ = "アとエが適切です。処理の原則的な優先順位は発生抑制、再使用、再生利用、熱回収、適正処分で、環境負荷によって順序を見直す場合があります。";
    }
    return {
      ...q,
      id: `gijutsushi1-tekisei-${q.year}-annual-ippan-q${qNumber}`,
      exam: "gijutsushi1-tekisei",
      qNumber,
      choiceExplanations,
    };
  })
  .sort((a, b) => a.year - b.year || a.qNumber - b.qNumber);
