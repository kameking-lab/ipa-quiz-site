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
  if (exam === "sequence3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "haikan-kenchiku3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "tekkin-zumen3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "fraise3" || exam === "sakan3" || exam === "zoen-gino3" || exam === "kikai-shiage3" || exam === "kikai-seizu3" || exam === "kikai-seizu-cad3" || exam === "haiden-seigyo3" || exam === "kikai-kensa3" || exam === "katawaku3" || exam === "futsu-senban3" || exam === "shashutsu3" || exam === "kagaku-bunseki3" || exam === "engei-soshoku3" || exam === "flower3" || exam === "kagu3" || exam === "mekki3" || exam === "kinzoku-netsushori3" || exam === "kojo-bankin3" || exam === "denshi-kiki-kumitate3" || exam === "tobi3" || exam === "kenchiku-daiku3" || exam === "kikai-hozen-denki3" || exam === "kikai-hozen3") return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (exam === "kinzoku-press1" || exam === "plant-haikan2" || exam === "plant-haikan1" || exam === "kinzoku-press2" || exam === "bousui-frp2" || exam === "pan-seizo1" || exam === "kikai-shiage1" || exam === "plant-haikan-seizu1" || exam === "kikai-seizu2" || exam === "kikai-seizu-cad2" || exam === "kikai-shiage2" || exam === "pan-seizo2" || exam === "naiso-carpet2" || exam === "naiso-plastic1" || exam === "naiso-plastic2" || exam === "naiso-kosei2" || exam === "bousui-urethane2" || exam === "sakan2" || exam === "sakan1" || exam === "zoen-gino1" || exam === "zoen-gino2" || exam === "kensetsu-kikai-seibi1" || exam === "kenchiku-bankin2" || exam === "haiden-seigyo1" || exam === "sequence1" || exam === "sequence2" || exam === "kogyo-hoso2" || exam === "kikai-kensa2" || exam === "tekkin-zumen1" || exam === "katawaku1" || exam === "tekkin-zumen2" || exam === "katawaku2" || exam === "kogyo-hoso1" || exam === "kikai-kensa1" || exam === "fujin-kodomofuku1" || exam === "fujin-kodomofuku2" || exam === "toso1" || exam === "tobi1" || exam === "kenchiku-daiku1" || exam === "kenchiku-daiku2" || exam === "denshi-kiki-kumitate1" || exam === "tekko2" || exam === "tekko1" || exam === "denshi-kiki-kumitate2" || exam === "insatsu2" || exam === "sasshi2" || exam === "sasshi1" || exam === "kyoka-plastic2" || exam === "chikuro2" || exam === "chikuro1" || exam === "kagaku-bunseki1" || exam === "kyoka-plastic1" || exam === "engei-soshoku1" || exam === "insatsu1" || exam === "flower1" || exam === "flower2" || exam === "kagu2" || exam === "kagu1" || exam === "mekki1" || exam === "kinzoku-netsushori1" || exam === "kojo-bankin1" || exam === "kenchiku-bankin1" || exam === "kenchiku-bankin-duct2" || exam === "kojo-bankin2" || exam === "kensetsu-kikai-seibi2" || exam === "hyoso1" || exam === "tairu2" || exam === "sekizai1" || exam === "hyoso2" || exam === "shashin1" || exam === "sessaku-kensaku1" || exam === "tatami1" || exam === "fraise1" || exam === "fraise2" || exam === "funmatsu-yakin1" || exam === "nunohaku1" || exam === "kikinzoku-soshin1" || exam === "kikinzoku-soshin2" || exam === "shashin2" || exam === "kinzoku-netsushori2") {
    const index = IROHA_CHOICE_KEYS.indexOf(key);
    return index >= 0 ? IROHA_LABELS[index] : key;
  }
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
  if ((question.exam === "sakan3" || question.exam === "zoen-gino3" || question.exam === "kikai-shiage3" || question.exam === "kikai-seizu3" || question.exam === "kikai-seizu-cad3" || question.exam === "haiden-seigyo3" || question.exam === "kikai-kensa3" || question.exam === "kinzoku-press1" || question.exam === "haikan-kenchiku3" || question.exam === "plant-haikan2" || question.exam === "plant-haikan1" || question.exam === "kinzoku-press2" || question.exam === "bousui-frp2" || question.exam === "pan-seizo1" || question.exam === "kikai-shiage1" || question.exam === "plant-haikan-seizu1" || question.exam === "kikai-seizu2" || question.exam === "kikai-seizu-cad2" || question.exam === "kikai-shiage2" || question.exam === "pan-seizo2" || question.exam === "naiso-carpet2" || question.exam === "naiso-plastic1" || question.exam === "naiso-plastic2" || question.exam === "naiso-kosei2" || question.exam === "bousui-urethane2" || question.exam === "sakan2" || question.exam === "sakan1" || question.exam === "zoen-gino1" || question.exam === "zoen-gino2" || question.exam === "kensetsu-kikai-seibi1" || question.exam === "kenchiku-bankin2" || question.exam === "haiden-seigyo1" || question.exam === "sequence1" || question.exam === "sequence3" || question.exam === "sequence2" || question.exam === "kogyo-hoso2" || question.exam === "kikai-kensa2" || question.exam === "tekkin-zumen1" || question.exam === "katawaku1" || question.exam === "tekkin-zumen2" || question.exam === "katawaku2" || question.exam === "kogyo-hoso1" || question.exam === "kikai-kensa1" || question.exam === "tekkin-zumen3" || question.exam === "katawaku3" || question.exam === "fujin-kodomofuku1" || question.exam === "fujin-kodomofuku2" || question.exam === "toso1" || question.exam === "kikai-hozen1" || question.exam === "kikai-hozen3" || question.exam === "kikai-hozen-denki3" || question.exam === "kikai-hozen-denki1" || question.exam === "kikai-hozen-setsubi1" || question.exam === "tobi1" || question.exam === "engei-soshoku3" || question.exam === "flower3" || question.exam === "kagu3" || question.exam === "mekki3" || question.exam === "kinzoku-netsushori3" || question.exam === "kojo-bankin3" || question.exam === "denshi-kiki-kumitate3" || question.exam === "tobi3" || question.exam === "kenchiku-daiku1" || question.exam === "kenchiku-daiku3" || question.exam === "kenchiku-daiku2" || question.exam === "denshi-kiki-kumitate1" || question.exam === "tekko2" || question.exam === "tekko1" || question.exam === "denshi-kiki-kumitate2" || question.exam === "insatsu2" || question.exam === "sasshi2" || question.exam === "sasshi1" || question.exam === "kyoka-plastic2" || question.exam === "chikuro2" || question.exam === "chikuro1" || question.exam === "kagaku-bunseki1" || question.exam === "futsu-senban3" || question.exam === "shashutsu3" || question.exam === "kagaku-bunseki3" || question.exam === "kyoka-plastic1" || question.exam === "engei-soshoku1" || question.exam === "insatsu1" || question.exam === "flower1" || question.exam === "flower2" || question.exam === "kagu2" || question.exam === "kagu1" || question.exam === "mekki1" || question.exam === "kinzoku-netsushori1" || question.exam === "kojo-bankin1" || question.exam === "kenchiku-bankin1" || question.exam === "kenchiku-bankin-duct2" || question.exam === "kojo-bankin2" || question.exam === "kensetsu-kikai-seibi2" || question.exam === "hyoso1" || question.exam === "tairu2" || question.exam === "sekizai1" || question.exam === "hyoso2" || question.exam === "shohin-soshoku3" || question.exam === "shashin1" || question.exam === "sessaku-kensaku1" || question.exam === "tatami1" || question.exam === "fraise1" || question.exam === "fraise2" || question.exam === "fraise3" || question.exam === "funmatsu-yakin1" || question.exam === "nunohaku1" || question.exam === "kikinzoku-soshin1" || question.exam === "shashin3" || question.exam === "kikinzoku-soshin3" || question.exam === "kikinzoku-soshin2" || question.exam === "shashin2" || question.exam === "kinzoku-netsushori2") && choices.length === 2) {
    const key = String(value);
    return key === "ア" ? "○" : key === "イ" ? "×" : key;
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
  if (exam === "hyoso1" || exam === "tairu2" || exam === "sekizai1" || exam === "hyoso2") return `選択肢${choiceDisplayLabel(exam, key)}の図（公式問題PDFより）`;
  if (!PLAIN_NUMBER_CHOICE_EXAMS.includes(exam) && !ALPHABET_CHOICE_EXAMS.includes(exam) && exam !== "eisei1" && exam !== "eisei2" && exam !== "soukan" && exam !== "hoikushi" && exam !== "kashikin") return undefined;
  return `選択肢${choiceDisplayLabel(exam, key)}の図（公式問題PDFより）`;
}

/** 選択肢を原本どおり番号（電験一種・二種は(イ)〜(ヨ)、社労士はA〜E）で表示する試験（ア〜エ表記ではない）。 */
export function usesNumberedChoices(exam: ExamCode): boolean {
  return exam === "haikan-kenchiku3" || exam === "tekkin-zumen3" || exam === "fraise3" || exam === "sakan3" || exam === "zoen-gino3" || exam === "kikai-shiage3" || exam === "kikai-seizu3" || exam === "kikai-seizu-cad3" || exam === "haiden-seigyo3" || exam === "kikai-kensa3" || exam === "kinzoku-press1" || exam === "plant-haikan2" || exam === "plant-haikan1" || exam === "kinzoku-press2" || exam === "bousui-frp2" || exam === "pan-seizo1" || exam === "kikai-shiage1" || exam === "plant-haikan-seizu1" || exam === "kikai-seizu2" || exam === "kikai-seizu-cad2" || exam === "kikai-shiage2" || exam === "pan-seizo2" || exam === "naiso-carpet2" || exam === "naiso-plastic1" || exam === "naiso-plastic2" || exam === "naiso-kosei2" || exam === "bousui-urethane2" || exam === "sakan2" || exam === "sakan1" || exam === "zoen-gino1" || exam === "zoen-gino2" || exam === "kensetsu-kikai-seibi1" || exam === "kenchiku-bankin2" || exam === "haiden-seigyo1" || exam === "sequence1" || exam === "sequence3" || exam === "sequence2" || exam === "kogyo-hoso2" || exam === "kikai-kensa2" || exam === "tekkin-zumen1" || exam === "katawaku1" || exam === "tekkin-zumen2" || exam === "katawaku2" || exam === "kogyo-hoso1" || exam === "kikai-kensa1" || exam === "katawaku3" || exam === "fujin-kodomofuku1" || exam === "fujin-kodomofuku2" || exam === "toso1" || exam === "tobi1" || exam === "engei-soshoku3" || exam === "flower3" || exam === "kagu3" || exam === "mekki3" || exam === "kinzoku-netsushori3" || exam === "kojo-bankin3" || exam === "denshi-kiki-kumitate3" || exam === "tobi3" || exam === "kenchiku-daiku1" || exam === "kenchiku-daiku3" || exam === "kenchiku-daiku2" || exam === "denshi-kiki-kumitate1" || exam === "tekko2" || exam === "tekko1" || exam === "denshi-kiki-kumitate2" || exam === "insatsu2" || exam === "sasshi2" || exam === "sasshi1" || exam === "kyoka-plastic2" || exam === "chikuro2" || exam === "chikuro1" || exam === "kagaku-bunseki1" || exam === "futsu-senban3" || exam === "shashutsu3" || exam === "kagaku-bunseki3" || exam === "kyoka-plastic1" || exam === "engei-soshoku1" || exam === "insatsu1" || exam === "flower1" || exam === "flower2" || exam === "kagu2" || exam === "kagu1" || exam === "mekki1" || exam === "kinzoku-netsushori1" || exam === "kojo-bankin1" || exam === "kenchiku-bankin1" || exam === "kenchiku-bankin-duct2" || exam === "kojo-bankin2" || exam === "kensetsu-kikai-seibi2" || exam === "hyoso1" || exam === "tairu2" || exam === "sekizai1" || exam === "hyoso2" || exam === "shohin-soshoku3" || exam === "shashin1" || exam === "sessaku-kensaku1" || exam === "tatami1" || exam === "fraise1" || exam === "fraise2" || exam === "funmatsu-yakin1" || exam === "nunohaku1" || exam === "kikinzoku-soshin1" || exam === "shashin3" || exam === "kikinzoku-soshin3" || exam === "kikinzoku-soshin2" || exam === "shashin2" || exam === "kinzoku-netsushori2" || exam === "denken3" || exam === "denken2" || exam === "denken1" || exam === "tohan" || exam === "eisei1" || exam === "eisei2" || exam === "soukan" || exam === "hoikushi" || exam === "kashikin" || PLAIN_NUMBER_CHOICE_EXAMS.includes(exam) || ALPHABET_CHOICE_EXAMS.includes(exam);
}
