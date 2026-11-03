import type { ChoiceKey, Question, Season } from "@/lib/questions/types";
import source2026 from "./2026-early.json";
import source2025 from "./2025-late.json";

const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
type Source = typeof source2026;

function toQuestions(source: Source): Question[] {
  return source.questions.map((item): Question => {
    const answerNumber = item.officialAnswerNumbers[0];
    const answer = keys[answerNumber - 1];
    if (!answer || item.officialAnswerNumbers.length !== 1 ||
        item.choices.length !== (item.number >= 37 && item.number <= 40 ? 5 : 4) ||
        item.choiceExplanations.length !== item.choices.length) {
      throw new Error(`Invalid denki2 ${source.year}-${source.season} No.${item.number}`);
    }
    const imageUrl = "imageUrl" in item && typeof item.imageUrl === "string" ? item.imageUrl : undefined;
    return {
      id: `denki2-${source.year}-${source.season}-gakka-q${item.number}`,
      exam: "denki2", session: "gakka", year: source.year, season: source.season as Season,
      qNumber: item.number, type: "multiple-choice", category: item.category,
      topicTags: [item.topic], difficulty: 2,
      question: item.question,
      choices: Object.fromEntries(item.choices.map((text, i) => [keys[i], text])),
      answer, officialAnswerNumber: String(answerNumber),
      explanation: item.explanation,
      choiceExplanations: Object.fromEntries(item.choiceExplanations.map((text, i) => [keys[i], text])),
      explanationCoverage: "full", hasImage: Boolean(imageUrl), imageUrls: imageUrl ? [imageUrl] : undefined,
      sourcePdfUrl: source.questionUrl, sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：一般財団法人建設業振興基金 ${source.edition} No.${item.number}（問題PDF ${item.pdfPage}ページ、正答 ${source.answerPdfPage}ページ）。ふりがな・空白・改行を整理し、数式と表をテキスト化。数字の選択肢をア〜オに対応付け、図の選択肢に識別用テキストを付加。解説は過去問AIの独自作成。`,
      license: "FCIP-owner-confirmed",
      lastUpdated: "2026-11-03",
    };
  });
}

/** 公開は資格カタログのゲートで制御する。 */
export const DENKI2_2026_QUESTIONS = toQuestions(source2026);
export const DENKI2_2025_QUESTIONS = toQuestions(source2025 as Source);
export const DENKI2_QUESTIONS: Question[] = [...DENKI2_2026_QUESTIONS, ...DENKI2_2025_QUESTIONS];
