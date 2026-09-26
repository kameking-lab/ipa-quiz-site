import type { ChoiceKey, ExamCode, Question } from "./types";

const DENKEN_CHOICE_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
/** 電験二種一次試験の解答群は公式どおり(イ)〜(ヨ)の15肢。内部キー ア〜ソ と順番で対応させる。 */
const IROHA_CHOICE_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ"];
const IROHA_LABELS = ["イ", "ロ", "ハ", "ニ", "ホ", "ヘ", "ト", "チ", "リ", "ヌ", "ル", "ヲ", "ワ", "カ", "ヨ"] as const;

export function questionNumberLabel(q: Pick<Question, "qNumber" | "part">): string {
  return `${q.qNumber}${q.part ? `(${q.part})` : ""}`;
}

export function choiceDisplayLabel(exam: ExamCode, key: ChoiceKey): string {
  if (exam === "denken2") {
    const index = IROHA_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? `(${IROHA_LABELS[index]})` : key;
  }
  if (exam !== "denken3") return key;
  const index = DENKEN_CHOICE_KEYS.indexOf(key);
  return index >= 0 ? `(${index + 1})` : key;
}
