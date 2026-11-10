import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ExamCode, Session } from "./types";

export const SPECIALIST_EXAMS: readonly ExamCode[] = ["st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"];
export const PRACTICE_SESSIONS: readonly Session[] = ["yakkan", "jitsumu", "patent", "design", "trademark", "treaty", "copyright", "dokugeki-ippan", "dokugeki-nougyou", "dokugeki-tokutei", "gakka-I", "gakka-II", "gakka-III", "gakka-IV", "khk-ax", "khk-ay", "khk-az", "khk-bx", "khk-by", "khk-bz", "khk-cx", "khk-cy", "khk-cz", "khk-dx", "khk-dy", "khk-dz", "keikaku", "kankyo-setsubi", "kozo", "sekou", "gakushiki", "gyosei","kanri","kansa","am","am1","am2","pm","kamoku-a","kamoku-b","gakka","rousai","koyou","kenpo","kounen","kokunen","ippan","sentaku","riron","denryoku","kikai","houki","hoki","kogaku","kiso","kogaku-a","kogaku-b","tiri","mondai-a","mondai-b","mondai-c","mondai-d","kyotsu","senmon","hoiku-genri","kyoiku-genri","shakaiteki-yougo","kodomo-katei-fukushi","shakai-fukushi","hoiku-shinrigaku","kodomo-hoken","kodomo-shokueiyou","hoiku-jisshu-riron","keizai","zaimu","kigyo","unei","keiei-houmu","keiei-joho","chusho-seisaku","required","theory","practical","gas-law","gas-basic","gas-technology","jken-basic","jken-programming","jken-design","hoan","wagashi","yogashi","seipan","measurement-basic","measurement-mass","measurement-chemistry","measurement-concentration","measurement-physics","measurement-sound","measurement-management","kenki-type1","kenki-type2","kenki-type3","kenki-type4","kenki-type5","kenki-type6","constitution","civil-law","criminal-law","admin-law","commercial-law","civil-procedure","criminal-procedure","tsukan-law","customs-law","tsukan-practical"];

/** Specialist practice starts with the specialist paper; common AM I is explicit. */
export function defaultPracticeSession(exam: ExamCode, year?: number): Session {
  if (!["ip","sg","fe","ap","st","sa","pm","nw","db","es","sc","sm","au","fp2","fp1","fp3","denken3","denken2","denken1","denko2","denko1","takken","civil2","kankoji2","zoen2","zoen1","tsushin2","tsushin1","kaigo","civil1","shakai","seishin","tohan","kanri","eisei1","eisei2","soukan","hoikushi","mankan","kashikin","sharoushi","kangoshi","yakuzaishi","ahaki-anma","ahaki-hari-kyu","hokenshi","josanshi","rigaku-ryohoshi","sagyo-ryohoshi","shino-kunrenshi","rinsho-kensagishi","shinryo-hoshasengishi","rinsho-kogishi","shika-ishi","riyoshi","chusho-kigyo-shindanshi","chosashi","judo-seifukushi","riku-toku-kokunai","kai-toku2","kai-toku3","koku-toku","land-special1","riku-tech1","maritime4","aviation-comm","amateur1","maritime-special1","riku-tech2","amateur2","maritime-radar","general1","general2","general3","maritime3","maritime2","maritime1","land-special2","land-special3","kanteishi","kaikeishi","gas-kou","gas-otsu","gas-hei"].includes(exam)) return EXAM_CONFIGS[exam]?.sessions[0]?.session ?? "gakka";

  if (exam === "kenchiku-setsubishi") return "am1";
  if (exam === "chizai2") return "gakka";
  if (exam === "kisho") return "ippan";
  if (exam === "kanteishi") return "gyosei";
  if (exam === "kaikeishi") return "kigyo";
  if (SPECIALIST_EXAMS.includes(exam)) return "am2";
  if ((exam === "fe" || exam === "sg") && (!year || year >= 2023)) return "kamoku-a";
  if (exam === "civil1" || exam === "zoen1" || exam === "tsushin1" || exam === "shika-ishi") return "mondai-a";
  if (exam === "fp1" || exam === "fp2" || exam === "fp3" || exam === "denko2" || exam === "denko1" || exam === "takken" || exam === "civil2" || exam === "kankoji2" || exam === "zoen2" || exam === "tsushin2" || exam === "kaigo" || exam === "tohan" || exam === "kanri" || exam === "soukan" || exam === "mankan" || exam === "kashikin" || exam === "sharoushi") return "gakka";
  if (exam === "maritime2" || exam === "maritime1" || exam === "general3" || exam === "general2" || exam === "general1") return "kiso";
  if (exam === "riku-tech1") return "kiso";
  if (exam === "gas-kou" || exam === "gas-otsu" || exam === "gas-hei") return "gas-law";
  if (exam === "yakuzaishi") return "required";
  if (exam === "riku-toku-kokunai" || exam === "kai-toku2" || exam === "kai-toku3" || exam === "koku-toku" || exam === "land-special1" || exam === "maritime4" || exam === "aviation-comm" || exam === "amateur1" || exam === "maritime-special1" || exam === "riku-tech2" || exam === "amateur2" || exam === "maritime-radar" || exam === "maritime3" || exam === "land-special2" || exam === "land-special3") return "houki";
  if (exam === "denken3") return "riron";
  if (exam === "denken2" || exam === "denken1") return "denryoku";
  if (exam === "shakai") return "kyotsu";
  if (exam === "seishin") return "senmon";
  if (exam === "hoikushi") return "hoiku-genri";
  if (exam === "chusho-kigyo-shindanshi") return "keizai";
  return "am";
}

export function parsePracticeSession(value?: string): Session | undefined {
  return PRACTICE_SESSIONS.includes(value as Session) ? value as Session : undefined;
}

export function practiceSessionLabel(session: Session, exam?: ExamCode): string {
  if (exam && ["kikenbutsu-otsu4", "unko-kanrisha-kamotsu", "shobo-setsubishi-otsu6", "shobo-setsubishi-kou4"].includes(exam)) {
    return EXAM_CONFIGS[exam].sessions.find(item => item.session === session)?.label ?? session;
  }
  if (exam && ["benrishi", "sokuryoshi", "dokugeki-chiba", "jokaso-setsubishi", "chiiki-ryoko", "junkango-kansai", "kukaku-seiri", "dojo-osen", "kenchikushi2", "mokuzo-kenchikushi"].includes(exam)) return EXAM_CONFIGS[exam].sessions.find(item => item.session === session)?.label ?? session;
  if (exam?.startsWith("khk-reito-")) {
    const labels: Partial<Record<Session, string>> = { houki: "法令", hoan: "保安管理技術", kogaku: "学識" };
    if (labels[session]) return labels[session]!;
  }
  if (exam && ["khk-reito-1", "khk-reito-2", "khk-reito-3", "shuwa"].includes(exam)) return EXAM_CONFIGS[exam].sessions.find(item => item.session === session)?.label ?? session;
  if (exam && ["gijutsushi1-kikai", "khk-kikai-kou", "khk-kikai-otsu"].includes(exam)) return EXAM_CONFIGS[exam].sessions.find(item => item.session === session)?.label ?? session;
  if (exam === "kenchiku-setsubishi") {
    if (session === "am1") return "建築一般知識";
    if (session === "am2") return "建築法規";
    if (session === "pm") return "建築設備";
  }
  if (exam === "chizai2" && session === "practical") return "実技";
  if (exam === "kisho" && session === "ippan") return "学科一般";
  if (exam === "kisho" && session === "senmon") return "学科専門";
  if (exam === "kanteishi" && session === "riron") return "鑑定評価理論";
  if (exam === "kaikeishi" && session === "kigyo") return "企業法";
  if (exam === "kaikeishi" && session === "zaimu") return "財務会計論";
  return ({ "khk-ax": "甲種化学 法令", "khk-ay": "甲種化学 保安管理技術", "khk-az": "甲種化学 学識", "khk-bx": "乙種化学 法令", "khk-by": "乙種化学 保安管理技術", "khk-bz": "乙種化学 学識", "khk-cx": "丙種化学（液石） 法令", "khk-cy": "丙種化学（液石） 保安管理技術", "khk-cz": "丙種化学（液石） 学識", "khk-dx": "丙種化学（特別） 法令", "khk-dy": "丙種化学（特別） 保安管理技術", "khk-dz": "丙種化学（特別） 学識",  keikaku: "計画", "kankyo-setsubi": "環境・設備", kozo: "構造", sekou: "施工", gakushiki: "学識", gyosei: "行政法規",
kanri: "管理会計論",
kansa: "監査論",
am: "午前",
am1: "午前I（共通）",
am2: "午前II（専門）",
"kamoku-a": "科目A",
"kamoku-b": "科目B",
pm: "午後",
pm1: "午後I",
pm2: "午後II",
gakka: "学科",
constitution: "憲法",
"civil-law": "民法",
"criminal-law": "刑法",
"admin-law": "行政法",
"commercial-law": "商法",
"civil-procedure": "民事訴訟法",
"criminal-procedure": "刑事訴訟法",
"tsukan-law": "通関業法",
"customs-law": "関税法等",
"tsukan-practical": "通関実務",
rousai: "労災",
koyou: "雇用保険",
kenpo: "健康保険",
kounen: "厚生年金",
kokunen: "国民年金",
ippan: "一般常識",
sentaku: "選択式",
required: "必須問題",
theory: "薬学理論問題",
practical: "薬学実践問題",
riron: "理論",
denryoku: "電力",
kikai: "機械",
houki: "法規",
hoki: "法規",
kogaku: "無線工学",
kiso: "無線工学の基礎",
"kogaku-a": "無線工学A",
"kogaku-b": "無線工学B",
tiri: "地理",
"mondai-a": "問題A",
"mondai-b": "問題B",
"mondai-c": "問題C",
"mondai-d": "問題D",
kyotsu: "共通科目",
senmon: "専門科目",
"hoiku-genri": "保育原理",
"kyoiku-genri": "教育原理",
"shakaiteki-yougo": "社会的養護",
"kodomo-katei-fukushi": "子ども家庭福祉",
"shakai-fukushi": "社会福祉",
"hoiku-shinrigaku": "保育の心理学",
"kodomo-hoken": "子どもの保健",
"kodomo-shokueiyou": "子どもの食と栄養",
"hoiku-jisshu-riron": "保育実習理論",
keizai: "経済学・経済政策",
zaimu: "財務・会計",
kigyo: "企業経営理論",
unei: "運営管理（オペレーション・マネジメント）",
"keiei-houmu": "経営法務",
"keiei-joho": "経営情報システム",
"chusho-seisaku": "中小企業経営・中小企業政策",
"gas-law": "法令",
"gas-basic": "基礎",
"gas-technology": "ガス技術",
"jken-basic": "基本スキル",
"jken-programming": "プログラミングスキル",
"jken-design": "システムデザインスキル",
hoan: "保安管理技術",
wagashi: "和菓子（選択）",
yogashi: "洋菓子（選択）",
seipan: "製パン（選択）",
"measurement-basic": "計量に関する基礎知識",
"measurement-mass": "計量器概論及び質量の計量",
"measurement-chemistry": "環境計量に関する基礎知識（化学）",
"measurement-concentration": "化学分析概論及び濃度の計量",
"measurement-physics": "環境計量に関する基礎知識（物理）",
"measurement-sound": "音響・振動概論並びに音圧レベル及び振動加速度レベルの計量",
"measurement-management": "計量管理概論",
"kenki-type1": "第1種（ブルドーザ等）",
"kenki-type2": "第2種（油圧ショベル等）",
"kenki-type3": "第3種（モータグレーダ）",
"kenki-type4": "第4種（締固め機械）",
"kenki-type5": "第5種（舗装機械）",
"kenki-type6": "第6種（基礎工事機械）"} as Partial<Record<Session, string>>)[session] ?? session;
}

export function quizBackHref({ exam, mode, returnTo }: { exam: string; mode?: string; returnTo?: string }): string {
  // Only local learning destinations; never accept external URLs or player loops.
  if (returnTo && /^\/(?!\/)/.test(returnTo) && !/[\\\u0000-\u0020]/.test(returnTo) && !/^\/quiz(?:[/?#]|$)/.test(returnTo)) return returnTo;
  if (mode === "year") return `/modes/year?exam=${encodeURIComponent(exam)}`;
  if (mode === "topic") return `/modes/topic?exam=${encodeURIComponent(exam)}`;
  return `/${encodeURIComponent(exam)}`;
}
