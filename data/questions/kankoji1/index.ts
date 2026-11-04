import type { ChoiceKey, Question } from "@/lib/questions/types";
import source from "./2026-september.json";

const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

/** 未公開。公式問題A44問・B29問。訂正後の公式正答に基づく。 */
export const KANKOJI1_QUESTIONS: Question[] = source.papers.flatMap((paper) => {
  if (paper.questions.length !== paper.officialQuestionCount) throw new Error("kankoji1 count mismatch");
  return paper.questions.map((item): Question => {
    const optional = item as typeof item & {
      imageUrl?: string; questionNotice?: string; requiredSelections?: number;
      acceptedAnswerCombinations?: number[][];
    };
    const answers = item.officialAnswerNumbers.map((n) => keys[n - 1]);
    if (item.choices.length !== 4 || item.choiceExplanations.length !== 4 || answers.some((a) => !a)) {
      throw new Error(`Invalid kankoji1 ${paper.paper} ${item.number}`);
    }
    return {
      id: `kankoji1-2026-september-${paper.session}-q${item.number}`,
      exam: "kankoji1", year: 2026, season: "september",
      session: paper.session as "mondai-a" | "mondai-b", qNumber: item.number,
      type: "multiple-choice", category: item.category, topicTags: [item.topic], difficulty: 3,
      question: item.question, questionNotice: optional.questionNotice,
      choices: Object.fromEntries(keys.map((key, i) => [key, item.choices[i]])),
      answer: answers.length === 1 ? answers[0] : answers,
      requiredSelections: optional.requiredSelections,
      acceptedAnswerCombinations: optional.acceptedAnswerCombinations?.map((set) => set.map((n) => keys[n - 1])),
      officialAnswerNumber: item.officialAnswerNumbers.join("・"),
      explanation: item.explanation,
      choiceExplanations: Object.fromEntries(keys.map((key, i) => [key, item.choiceExplanations[i]])),
      explanationCoverage: "full", hasImage: Boolean(optional.imageUrl),
      imageUrls: optional.imageUrl ? [optional.imageUrl] : undefined,
      sourcePdfUrl: paper.questionUrl, sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：一般財団法人全国建設研修センター 令和8年度1級管工事施工管理技術検定（第一次検定）問題${paper.paper} No.${item.number}。ルビ・改行・空白を整理。表の列を区切り文字で表示し、数字選択肢をア・イ・ウ・エへ変換。図は原本から切り出し。解説は本サイト独自作成。`,
      license: "JCTC-authorized-reuse", lastUpdated: "2026-11-03",
    };
  });
});
