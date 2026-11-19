import type { ChoiceKey, Question } from "@/lib/questions/types";
import paper2026 from "./2026-september.json";
import paper2025 from "./2025-september.json";
import paper2024 from "./2024-september.json";

const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

/** 第一次検定の公式問題と訂正後の公式正答。 */
export const KANKOJI1_QUESTIONS: Question[] = [paper2026, paper2025, paper2024].flatMap((source) =>
  source.papers.flatMap((paper) => {
    if (paper.questions.length !== paper.officialQuestionCount) throw new Error("kankoji1 count mismatch");
    return paper.questions.map((item): Question => {
      const optional = item as typeof item & {
        imageUrl?: string; imageAltText?: string; questionNotice?: string; requiredSelections?: number;
        acceptedAnswerCombinations?: number[][];
      };
      const answers = item.officialAnswerNumbers.map((n) => keys[n - 1]);
      if (item.choices.length !== 4 || item.choiceExplanations.length !== 4 || answers.some((a) => !a)) {
        throw new Error(`Invalid kankoji1 ${paper.paper} ${item.number}`);
      }
      return {
        id: `kankoji1-${source.year}-september-${paper.session}-q${item.number}`,
        exam: "kankoji1", year: source.year, season: "september",
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
        imageAltTexts: optional.imageAltText ? [optional.imageAltText] : undefined,
        sourcePdfUrl: paper.questionUrl, sourceAnswerUrl: source.answerUrl,
        sourceAttribution: `出典：一般財団法人全国建設研修センター 令和${source.year - 2018}年度1級管工事施工管理技術検定（第一次検定）問題${paper.paper} No.${item.number}。ルビ・改行・空白を整理。表の列を区切り文字で表示し、数字選択肢をア・イ・ウ・エへ変換。図は原本から切り出し。解説は本サイト独自作成。`,
        license: "JCTC-authorized-reuse", lastUpdated: source.year === 2026 ? "2026-11-03" : "2026-11-20",
      };
    });
  }),
);
