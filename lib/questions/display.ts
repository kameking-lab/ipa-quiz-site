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
  // A response-format label is not a printed question number (行政書士41〜43).
  if (q.nativeB?.officialLabel && !/^多肢選択式[（(]/.test(q.nativeB.officialLabel)) return q.nativeB.officialLabel;
  return `${q.qNumber}${q.part ? `(${q.part})` : ""}`;
}

/** 公式問題が選択肢を算用数字 1〜5 で示す試験。表示も原本の番号に合わせる。 */
const PLAIN_NUMBER_CHOICE_EXAMS: readonly ExamCode[] = ["unko-kanrisha-ryokaku", "shobo-setsubishi-kou1", "kikenbutsu-kou", "kikenbutsu-hei", "shobo-setsubishi-kou4", "shobo-setsubishi-otsu6", "unko-kanrisha-kamotsu", "kikenbutsu-otsu4", "benrishi", "sokuryoshi", "dokugeki-chiba", "jokaso-setsubishi", "junkango-kansai", "kukaku-seiri", "dojo-osen", "kenchikushi2", "mokuzo-kenchikushi", "sekou-1kenchiku", "khk-kagaku", "kenchikushi1", "chintai", "kyusui", "biru-kan", "gijutsushi1-kikai", "hoshasen-1", "hoshasen-2", "khk-kikai-kou", "khk-kikai-otsu", "reform-mgr", "denki2", "kankoji1", "kenki1", "kenki2", "kisho", "kenchiku-setsubishi", "kanteishi", "kaikeishi", "riku-toku-kokunai", "kai-toku2", "kai-toku3", "koku-toku", "land-special1", "riku-tech1", "maritime4", "aviation-comm", "amateur1", "maritime-special1", "riku-tech2", "amateur2", "maritime-radar", "maritime3", "maritime2", "maritime1", "general3", "general2", "general1", "land-special2", "land-special3", "chosashi", "kaigo", "shakai", "seishin", "kanri", "mankan", "kangoshi", "yakuzaishi", "ahaki-anma", "ahaki-hari-kyu", "hokenshi", "josanshi", "rigaku-ryohoshi", "sagyo-ryohoshi", "gengo-chokakushi", "shino-kunrenshi", "rinsho-kensagishi", "shinryo-hoshasengishi", "rinsho-kogishi", "riyoshi", "shika-ishi", "judo-seifukushi", "gas-kou", "gas-otsu", "gas-hei", "biyoshi", "kikenbutsu-otsu1", "kikenbutsu-otsu2", "kikenbutsu-otsu6", "jokaso", "denki1", "shuwa", "shinrishi", "khk-reito-3", "khk-reito-2", "khk-reito-1", "yamaguchi-seika", "yamaguchi-chori", "keiryoshi", "keiryoshi-nodo", "keiryoshi-soon", "gyosei", "shihoshoshi", "shiho-tanto", "yobi-tanto", "sokuryoshiho", "caremanager", "tsukanshi"];

/** 公式問題が選択肢をＡ〜Ｅで示す試験。内部キー ア〜オ と順番で対応させる。 */
const ALPHABET_CHOICE_EXAMS: readonly ExamCode[] = ["sharoushi"];
const ALPHABET_LABELS = ["A", "B", "C", "D", "E"] as const;

const TRUE_FALSE_ANSWER_EXAMS = new Set<ExamCode>([
  "kikai-hozen", "tetsudo-sharyo2", "diecast2", "tobi2",
  "sakan3", "zoen-gino3", "kikai-shiage3", "kikai-seizu3",
  "kikai-seizu-cad3", "haiden-seigyo3", "kikai-kensa3", "kinzoku-press1",
  "haikan-kenchiku3", "plant-haikan2", "plant-haikan1", "kinzoku-press2",
  "bousui-frp2", "pan-seizo1", "kikai-shiage1", "plant-haikan-seizu1",
  "kikai-seizu2", "kikai-seizu-cad2", "kikai-shiage2", "pan-seizo2",
  "naiso-carpet2", "naiso-plastic1", "naiso-plastic2", "naiso-kosei2",
  "bousui-urethane2", "sakan2", "sakan1", "zoen-gino1",
  "zoen-gino2", "kensetsu-kikai-seibi1", "kenchiku-bankin2", "haiden-seigyo1",
  "sequence1", "chuzo2", "chuzo1", "kaiten-denki2",
  "kaiten-denki1", "sequence3", "chuzo3", "sequence2",
  "kogyo-hoso2", "kikai-kensa2", "tekkin-zumen1", "katawaku1",
  "tekkin-zumen2", "katawaku2", "kogyo-hoso1", "kikai-kensa1",
  "tekkin-zumen3", "katawaku3", "fujin-kodomofuku1", "fujin-kodomofuku2",
  "toso1", "kikai-hozen1", "kikai-hozen3", "kikai-hozen-denki3",
  "kikai-hozen-denki1", "kikai-hozen-setsubi1", "tobi1", "engei-soshoku3",
  "flower3", "kagu3", "mekki3", "kinzoku-netsushori3",
  "kojo-bankin3", "denshi-kiki-kumitate3", "tobi3", "kenchiku-daiku1",
  "kenchiku-daiku3", "kenchiku-daiku2", "denshi-kiki-kumitate1", "tekko2",
  "tekko1", "denshi-kiki-kumitate2", "insatsu2", "sasshi2",
  "sasshi1", "kyoka-plastic2", "chikuro2", "chikuro1",
  "kagaku-bunseki1", "futsu-senban3", "shashutsu3", "kagaku-bunseki3",
  "kyoka-plastic1", "engei-soshoku1", "insatsu1", "flower1",
  "flower2", "kagu2", "kagu1", "mekki1",
  "kinzoku-netsushori1", "kojo-bankin1", "kenchiku-bankin1", "kenchiku-bankin-duct2",
  "kojo-bankin2", "kensetsu-kikai-seibi2", "hyoso1", "tairu2",
  "sekizai1", "hyoso2", "shohin-soshoku3", "shashin1",
  "sessaku-kensaku1", "tatami1", "fraise1", "fraise2",
  "fraise3", "funmatsu-yakin1", "nunohaku1", "kikinzoku-soshin1",
  "shashin3", "kikinzoku-soshin3", "kikinzoku-soshin2", "shashin2",
  "kinzoku-netsushori2", "diecast1", "tetsudo-sharyo1", "futsu-senban1",
  "shashutsu1", "tekkin3", "tekkin2", "kikai-seizu-tegaki1",
  "reito-seko2", "reito-seko1", "kuukiatsu-kumitate2", "kuukiatsu-kumitate1",
  "henatsuki-kumitate2", "henatsuki-kumitate1", "haidenban-kumitate3", "kikai-seizu-cad1",
  "plant-haikan-seizu2", "reito-seko3", "netsuzetsuen2", "hiseshoku-jokyo1",
  "tategu1", "shohin-soshoku1", "kogaku-glass1", "sangyo-sharyo1",
  "yogashi1", "block-kenchiku3", "block-kenchiku1", "shuzo1",
  "haikan-plant2", "bousui-frp1", "naiso-carpet1", "haikan-plant1",
  "shashutsu2", "kagaku-bunseki2", "engei-soshoku2", "mekki2",
  "toso2",
]);

const NUMBERED_CHOICE_EXAMS = new Set<ExamCode>([
  "haikan-kenchiku3", "tekkin-zumen3", "fraise3", "sakan3",
  "zoen-gino3", "kikai-shiage3", "kikai-seizu3", "kikai-seizu-cad3",
  "haiden-seigyo3", "kikai-kensa3", "kinzoku-press1", "plant-haikan2",
  "plant-haikan1", "kinzoku-press2", "bousui-frp2", "pan-seizo1",
  "kikai-shiage1", "plant-haikan-seizu1", "kikai-seizu2", "kikai-seizu-cad2",
  "kikai-shiage2", "pan-seizo2", "naiso-carpet2", "naiso-plastic1",
  "naiso-plastic2", "naiso-kosei2", "bousui-urethane2", "sakan2",
  "sakan1", "zoen-gino1", "zoen-gino2", "kensetsu-kikai-seibi1",
  "kenchiku-bankin2", "haiden-seigyo1", "sequence1", "chuzo2",
  "chuzo1", "kaiten-denki2", "kaiten-denki1", "sequence3",
  "chuzo3", "sequence2", "kogyo-hoso2", "kikai-kensa2",
  "tekkin-zumen1", "katawaku1", "tekkin-zumen2", "katawaku2",
  "kogyo-hoso1", "kikai-kensa1", "katawaku3", "fujin-kodomofuku1",
  "fujin-kodomofuku2", "toso1", "tobi1", "engei-soshoku3",
  "flower3", "kagu3", "mekki3", "kinzoku-netsushori3",
  "kojo-bankin3", "denshi-kiki-kumitate3", "tobi3", "kenchiku-daiku1",
  "kenchiku-daiku3", "kenchiku-daiku2", "denshi-kiki-kumitate1", "tekko2",
  "tekko1", "denshi-kiki-kumitate2", "insatsu2", "sasshi2",
  "sasshi1", "kyoka-plastic2", "chikuro2", "chikuro1",
  "kagaku-bunseki1", "futsu-senban3", "shashutsu3", "kagaku-bunseki3",
  "kyoka-plastic1", "engei-soshoku1", "insatsu1", "flower1",
  "flower2", "kagu2", "kagu1", "mekki1",
  "kinzoku-netsushori1", "kojo-bankin1", "kenchiku-bankin1", "kenchiku-bankin-duct2",
  "kojo-bankin2", "kensetsu-kikai-seibi2", "hyoso1", "tairu2",
  "sekizai1", "hyoso2", "shohin-soshoku3", "shashin1",
  "sessaku-kensaku1", "tatami1", "fraise1", "fraise2",
  "funmatsu-yakin1", "nunohaku1", "kikinzoku-soshin1", "shashin3",
  "kikinzoku-soshin3", "kikinzoku-soshin2", "shashin2", "kinzoku-netsushori2",
  "denken3", "denken2", "denken1", "tohan",
  "eisei1", "eisei2", "soukan", "hoikushi",
  "kashikin", "diecast1", "tetsudo-sharyo1", "futsu-senban1",
  "shashutsu1", "tekkin2", "kikai-seizu-tegaki1", "reito-seko2",
  "reito-seko1", "kuukiatsu-kumitate2", "kuukiatsu-kumitate1", "henatsuki-kumitate2",
  "henatsuki-kumitate1", "haidenban-kumitate3", "kikai-seizu-cad1", "plant-haikan-seizu2",
  "reito-seko3", "netsuzetsuen2", "hiseshoku-jokyo1", "tategu1",
  "shohin-soshoku1", "kogaku-glass1", "sangyo-sharyo1", "yogashi1",
  "block-kenchiku3", "block-kenchiku1", "shuzo1", "haikan-plant2",
  "bousui-frp1", "naiso-carpet1", "haikan-plant1", "shashutsu2",
  "kagaku-bunseki2", "engei-soshoku2", "mekki2", "toso2",
  "kikai-hozen-denki1", "kikai-hozen3", "kikai-hozen-denki3", "tobi2",
  "tetsudo-sharyo2", "diecast2",
]);

// Membership checks avoid a deeply nested control-flow graph for the exam union.
const TRUE_FALSE_CHOICE_EXAMS = new Set<ExamCode>([
  "sequence3", "chuzo3", "haikan-kenchiku3", "tekkin-zumen3",
  "fraise3", "sakan3", "zoen-gino3", "kikai-shiage3",
  "kikai-seizu3", "kikai-seizu-cad3", "haiden-seigyo3", "kikai-kensa3",
  "katawaku3", "futsu-senban3", "shashutsu3", "kagaku-bunseki3",
  "engei-soshoku3", "flower3", "kagu3", "mekki3",
  "kinzoku-netsushori3", "kojo-bankin3", "denshi-kiki-kumitate3", "tobi3",
  "kenchiku-daiku3", "kikai-hozen-denki3", "kikai-hozen3", "haidenban-kumitate3",
  "block-kenchiku3", "reito-seko3", "tekkin3",
]);

const IROHA_CHOICE_EXAMS = new Set<ExamCode>([
  "kinzoku-press1", "plant-haikan2", "plant-haikan1", "kinzoku-press2",
  "bousui-frp2", "pan-seizo1", "kikai-shiage1", "plant-haikan-seizu1",
  "kikai-seizu2", "kikai-seizu-cad2", "kikai-shiage2", "pan-seizo2",
  "naiso-carpet2", "naiso-plastic1", "naiso-plastic2", "naiso-kosei2",
  "bousui-urethane2", "sakan2", "sakan1", "zoen-gino1",
  "zoen-gino2", "kensetsu-kikai-seibi1", "kenchiku-bankin2", "haiden-seigyo1",
  "sequence1", "chuzo2", "chuzo1", "kaiten-denki2",
  "kaiten-denki1", "sequence2", "kogyo-hoso2", "kikai-kensa2",
  "tekkin-zumen1", "katawaku1", "tekkin-zumen2", "katawaku2",
  "kogyo-hoso1", "kikai-kensa1", "fujin-kodomofuku1", "fujin-kodomofuku2",
  "toso1", "tobi1", "kenchiku-daiku1", "kenchiku-daiku2",
  "denshi-kiki-kumitate1", "tekko2", "tekko1", "denshi-kiki-kumitate2",
  "insatsu2", "sasshi2", "sasshi1", "kyoka-plastic2",
  "chikuro2", "chikuro1", "kagaku-bunseki1", "kyoka-plastic1",
  "engei-soshoku1", "insatsu1", "flower1", "flower2",
  "kagu2", "kagu1", "mekki1", "kinzoku-netsushori1",
  "kojo-bankin1", "kenchiku-bankin1", "kenchiku-bankin-duct2", "kojo-bankin2",
  "kensetsu-kikai-seibi2", "hyoso1", "tairu2", "sekizai1",
  "hyoso2", "shashin1", "sessaku-kensaku1", "tatami1",
  "fraise1", "fraise2", "funmatsu-yakin1", "nunohaku1",
  "kikinzoku-soshin1", "kikinzoku-soshin2", "shashin2", "kinzoku-netsushori2",
  "diecast1", "tetsudo-sharyo1", "futsu-senban1", "shashutsu1",
  "tekkin2", "kikai-seizu-tegaki1", "reito-seko2", "reito-seko1",
  "kuukiatsu-kumitate2", "kuukiatsu-kumitate1", "henatsuki-kumitate2", "henatsuki-kumitate1",
  "kikai-seizu-cad1", "plant-haikan-seizu2", "netsuzetsuen2", "hiseshoku-jokyo1",
  "tategu1", "shohin-soshoku1", "kogaku-glass1", "sangyo-sharyo1",
  "yogashi1", "block-kenchiku1", "shuzo1", "haikan-plant2",
  "bousui-frp1", "naiso-carpet1", "haikan-plant1", "shashutsu2",
  "kagaku-bunseki2", "engei-soshoku2", "mekki2", "toso2",
  "tobi2", "tetsudo-sharyo2", "diecast2",
]);

export function choiceDisplayLabel(exam: ExamCode, key: ChoiceKey): string {
  if (TRUE_FALSE_CHOICE_EXAMS.has(exam)) return key === "ア" ? "○" : key === "イ" ? "×" : key;
  if (IROHA_CHOICE_EXAMS.has(exam)) {
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
  if ((TRUE_FALSE_ANSWER_EXAMS.has(question.exam)) && choices.length === 2) {
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
  return NUMBERED_CHOICE_EXAMS.has(exam) || PLAIN_NUMBER_CHOICE_EXAMS.includes(exam) || ALPHABET_CHOICE_EXAMS.includes(exam);
}
