import { formatNativeBAnswer } from "./native-b";
import type { ChoiceKey, ExamCode, Question } from "./types";
import { formatNumericAnswer } from "./numeric";

const DENKEN_CHOICE_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
/** 電験一種・二種一次試験の解答群は公式どおり(イ)〜(ヨ)の15肢。内部キー ア〜ソ と順番で対応させる。 */
const IROHA_CHOICE_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ"];
const IROHA_LABELS = ["イ", "ロ", "ハ", "ニ", "ホ", "ヘ", "ト", "チ", "リ", "ヌ", "ル", "ヲ", "ワ", "カ", "ヨ"] as const;

export function questionNumberLabel(q: Pick<Question, "qNumber" | "part" | "nativeB" | "officialQuestionLabel">): string {
  // Callers add the 問 prefix; keep this helper limited to the printed number.
  if (q.officialQuestionLabel) return q.officialQuestionLabel.replace(/^問題/, "");
  if (q.nativeB?.officialLabel) return q.nativeB.officialLabel;
  return `${q.qNumber}${q.part ? `(${q.part})` : ""}`;
}

/** 公式問題が選択肢を算用数字 1〜5 で示す試験。表示も原本の番号に合わせる。 */
const PLAIN_NUMBER_CHOICE_EXAMS: readonly ExamCode[] = ["unko-kanrisha-ryokaku", "shobo-setsubishi-kou1", "kikenbutsu-kou", "kikenbutsu-hei", "shobo-setsubishi-kou4", "shobo-setsubishi-otsu6", "unko-kanrisha-kamotsu", "kikenbutsu-otsu4", "benrishi", "sokuryoshi", "dokugeki-chiba", "jokaso-setsubishi", "junkango-kansai", "kukaku-seiri", "dojo-osen", "kenchikushi2", "mokuzo-kenchikushi", "sekou-1kenchiku", "khk-kagaku", "kenchikushi1", "chintai", "kyusui", "biru-kan", "gijutsushi1-kikai", "hoshasen-1", "hoshasen-2", "khk-kikai-kou", "khk-kikai-otsu", "reform-mgr", "denki2", "kankoji1", "kenki1", "kenki2", "kisho", "kenchiku-setsubishi", "kanteishi", "kaikeishi", "riku-toku-kokunai", "kai-toku2", "kai-toku3", "koku-toku", "land-special1", "riku-tech1", "maritime4", "aviation-comm", "amateur1", "maritime-special1", "riku-tech2", "amateur2", "maritime-radar", "maritime3", "maritime2", "maritime1", "general3", "general2", "general1", "land-special2", "land-special3", "chosashi", "kaigo", "shakai", "seishin", "kanri", "mankan", "kangoshi", "yakuzaishi", "ahaki-anma", "ahaki-hari-kyu", "hokenshi", "josanshi", "rigaku-ryohoshi", "sagyo-ryohoshi", "gengo-chokakushi", "shino-kunrenshi", "rinsho-kensagishi", "shinryo-hoshasengishi", "rinsho-kogishi", "riyoshi", "shika-ishi", "judo-seifukushi", "gas-kou", "gas-otsu", "gas-hei", "biyoshi", "kikenbutsu-otsu1", "kikenbutsu-otsu2", "kikenbutsu-otsu6", "jokaso", "denki1", "shuwa", "shinrishi", "khk-reito-3", "khk-reito-2", "khk-reito-1", "yamaguchi-seika", "yamaguchi-chori", "keiryoshi", "keiryoshi-nodo", "keiryoshi-soon", "gyosei", "shihoshoshi", "shiho-tanto", "yobi-tanto", "sokuryoshiho", "caremanager", "tsukanshi"];

/** 公式問題が選択肢をＡ〜Ｅで示す試験。内部キー ア〜オ と順番で対応させる。 */
const ALPHABET_CHOICE_EXAMS: readonly ExamCode[] = ["sharoushi"];
const ALPHABET_LABELS = ["A", "B", "C", "D", "E"] as const;

export function choiceDisplayLabel(exam: ExamCode, key: ChoiceKey): string {
  if (exam === "kojo-bankin1" || exam === "kojo-bankin2" || exam === "kagu2" || exam === "flower1" || exam === "diecast1" || exam === "tetsudo-sharyo1" || exam === "insatsu2" || exam === "insatsu1" || exam === "kagu1" || exam === "mekki2" || exam === "mekki1" || exam === "kinzoku-netsushori1" || exam === "tekko1" || exam === "denshi-kiki-kumitate1" || exam === "fujin-kodomofuku2" || exam === "fujin-kodomofuku1" || exam === "toso1" || exam === "toso2" || exam === "tobi2") {
    const index = IROHA_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? IROHA_LABELS[index] : key;
  }
  if (exam === "tobi3") {
    const index = IROHA_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? IROHA_LABELS[index] : key;
  }
  if (exam === "kenchiku-daiku1") {
    const index = IROHA_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? IROHA_LABELS[index] : key;
  }
  if (exam === "kinzoku-netsushori3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "mekki3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "flower3" || exam === "kagu3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "kojo-bankin3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "denshi-kiki-kumitate3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "kikai-hozen3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "kikai-hozen-denki3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "kenchiku-daiku3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "shika-ishi") {
    const index = IROHA_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? String.fromCharCode(97 + index) : key;
  }
  if (ALPHABET_CHOICE_EXAMS.includes(exam)) {
    const index = DENKEN_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? ALPHABET_LABELS[index] : key;
  }
  if (exam === "denken2" || exam === "denken1") {
    const index = IROHA_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? `(${IROHA_LABELS[index]})` : key;
  }
  // 通関士の択一式「該当なし」は原本の解答番号0。語群と衝突しない内部キー タ に置く（data/questions/tsukanshi）。
  if (exam === "tsukanshi" && key === "タ") return "0";
  if (PLAIN_NUMBER_CHOICE_EXAMS.includes(exam)) {
    const index = IROHA_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? String(index + 1) : key;
  }
  if (exam !== "denken3" && exam !== "tohan" && exam !== "eisei1" && exam !== "eisei2" && exam !== "soukan" && exam !== "hoikushi" && exam !== "kashikin") return key;
  const index = DENKEN_CHOICE_KEYS.indexOf(key);
  return index >= 0 ? `(${index + 1})` : key;
}

/** Render stored choice keys individually, retaining the answer's order and separators. */
export function formatQuestionAnswerForDisplay(question: Question, value: string | readonly ChoiceKey[], multiSeparator = "・"): string {
  if (question.officialScoring?.kind === "credit-for-all" && Array.isArray(value) && value.length === 0) return "正答肢なし（全員加点）";
  if (question.type === "native-b" && question.nativeB) return formatNativeBAnswer(question.nativeB);
  if (question.type === "numeric") return formatNumericAnswer(question, String(value));
  // 正答配列は独立した許容肢。全肢許容の訂正を「5肢すべて選ぶ」と表示しない。
  const choices = Object.keys(question.choices ?? {}) as ChoiceKey[];
  const accepted = question.answer;
  if (question.type === "multiple-choice" && (question.requiredSelections ?? 1) === 1 &&
      Array.isArray(value) && Array.isArray(accepted) && choices.length > 1 &&
      value.length === choices.length && accepted.length === choices.length &&
      choices.every(key => value.includes(key) && accepted.includes(key))) {
    return "全員正解";
  }
  if ((question.exam === "kojo-bankin1" || question.exam === "kojo-bankin2" || question.exam === "kagu2" || question.exam === "flower1" || question.exam === "diecast1" || question.exam === "tetsudo-sharyo1" || question.exam === "insatsu2" || question.exam === "insatsu1" || question.exam === "kagu1" || question.exam === "mekki2" || question.exam === "mekki1" || question.exam === "kinzoku-netsushori1" || question.exam === "tekko1" || question.exam === "denshi-kiki-kumitate1" || question.exam === "fujin-kodomofuku2" || question.exam === "fujin-kodomofuku1" || question.exam === "toso1" || question.exam === "toso2" || question.exam === "kikai-hozen-denki1" || question.exam === "kikai-hozen-setsubi1") && choices.length === 2) {
    return value === "ア" ? "○" : value === "イ" ? "×" : String(value);
  }
  const separator = question.type === "ordering" ? "→" : multiSeparator;
  const text = Array.isArray(value) ? value.join(separator) : String(value);
  return text.split(/([・→,]\s*)/).map((part) => {
    const key = part.trim() as ChoiceKey;
    return key && question.choices?.[key] !== undefined ? choiceDisplayLabel(question.exam, key) : part;
  }).join("");
}

/** 図だけで示された選択肢の代替テキスト。既存の回路図問題は呼び出し側の既定文言を使う。 */
export function choiceImageAlt(exam: ExamCode, key: ChoiceKey): string | undefined {
  if (!PLAIN_NUMBER_CHOICE_EXAMS.includes(exam) && !ALPHABET_CHOICE_EXAMS.includes(exam) && exam !== "eisei1" && exam !== "eisei2" && exam !== "soukan" && exam !== "hoikushi" && exam !== "kashikin") return undefined;
  return `選択肢${choiceDisplayLabel(exam, key)}の図（公式問題PDFより）`;
}

/** 選択肢を原本どおり番号（電験一種・二種は(イ)〜(ヨ)、社労士はA〜E）で表示する試験（ア〜エ表記ではない）。 */
export function usesNumberedChoices(exam: ExamCode): boolean {
  return exam === "flower3" || exam === "kagu3" || exam === "mekki3" || exam === "kinzoku-netsushori3" || exam === "kojo-bankin3" || exam === "denshi-kiki-kumitate3" || exam === "kojo-bankin1" || exam === "kojo-bankin2" || exam === "kagu2" || exam === "flower1" || exam === "diecast1" || exam === "tetsudo-sharyo1" || exam === "insatsu2" || exam === "insatsu1" || exam === "kagu1" || exam === "mekki2" || exam === "mekki1" || exam === "kinzoku-netsushori1" || exam === "tekko1" || exam === "denshi-kiki-kumitate1" || exam === "fujin-kodomofuku2" || exam === "fujin-kodomofuku1" || exam === "toso1" || exam === "toso2" || exam === "kikai-hozen-denki1" || exam === "kikai-hozen3" || exam === "kikai-hozen-denki3" || exam === "kenchiku-daiku3" || exam === "kenchiku-daiku1" || exam === "tobi3" || exam === "tobi2" || exam === "denken3" || exam === "denken2" || exam === "denken1" || exam === "tohan" || exam === "eisei1" || exam === "eisei2" || exam === "soukan" || exam === "hoikushi" || exam === "kashikin" || PLAIN_NUMBER_CHOICE_EXAMS.includes(exam) || ALPHABET_CHOICE_EXAMS.includes(exam);
}
