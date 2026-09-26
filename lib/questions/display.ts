import type { ChoiceKey, ExamCode, Question } from "./types";

const DENKEN_CHOICE_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
/** 電験二種一次試験の解答群は公式どおり(イ)〜(ヨ)の15肢。内部キー ア〜ソ と順番で対応させる。 */
const IROHA_CHOICE_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ"];
const IROHA_LABELS = ["イ", "ロ", "ハ", "ニ", "ホ", "ヘ", "ト", "チ", "リ", "ヌ", "ル", "ヲ", "ワ", "カ", "ヨ"] as const;

export function questionNumberLabel(q: Pick<Question, "qNumber" | "part">): string {
  return `${q.qNumber}${q.part ? `(${q.part})` : ""}`;
}

/** 公式問題が選択肢を算用数字 1〜5 で示す試験。表示も原本の番号に合わせる。 */
const PLAIN_NUMBER_CHOICE_EXAMS: readonly ExamCode[] = ["kaigo"];

export function choiceDisplayLabel(exam: ExamCode, key: ChoiceKey): string {
  if (exam === "denken2") {
    const index = IROHA_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? `(${IROHA_LABELS[index]})` : key;
  }
  if (PLAIN_NUMBER_CHOICE_EXAMS.includes(exam)) {
    const index = DENKEN_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? String(index + 1) : key;
  }
  if (exam !== "denken3") return key;
  const index = DENKEN_CHOICE_KEYS.indexOf(key);
  return index >= 0 ? `(${index + 1})` : key;
}

/** 図だけで示された選択肢の代替テキスト。既存の回路図問題は呼び出し側の既定文言を使う。 */
export function choiceImageAlt(exam: ExamCode, key: ChoiceKey): string | undefined {
  if (!PLAIN_NUMBER_CHOICE_EXAMS.includes(exam)) return undefined;
  return `選択肢${choiceDisplayLabel(exam, key)}の図（公式問題PDFより）`;
}

/** 選択肢を原本どおり番号（電験二種は(イ)〜(ヨ)）で表示する試験（ア〜エ表記ではない）。 */
export function usesNumberedChoices(exam: ExamCode): boolean {
  return exam === "denken3" || exam === "denken2" || PLAIN_NUMBER_CHOICE_EXAMS.includes(exam);
}
