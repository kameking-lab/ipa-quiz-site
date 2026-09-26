import type { ChoiceKey, ExamCode, Question } from "./types";

const DENKEN_CHOICE_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

export function questionNumberLabel(q: Pick<Question, "qNumber" | "part">): string {
  return `${q.qNumber}${q.part ? `(${q.part})` : ""}`;
}

/** 公式問題が選択肢を算用数字 1〜5 で示す試験。表示も原本の番号に合わせる。 */
const PLAIN_NUMBER_CHOICE_EXAMS: readonly ExamCode[] = ["kaigo", "shakai", "seishin"];

export function choiceDisplayLabel(exam: ExamCode, key: ChoiceKey): string {
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

/** 選択肢を原本どおり番号で表示する試験（ア〜エ表記ではない）。 */
export function usesNumberedChoices(exam: ExamCode): boolean {
  return exam === "denken3" || PLAIN_NUMBER_CHOICE_EXAMS.includes(exam);
}
