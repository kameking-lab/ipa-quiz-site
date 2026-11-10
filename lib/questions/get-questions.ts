import type { ExamCode, Question } from "./types";
import { isExamPublished } from "@/lib/qualifications/catalog";

// Bundler-friendly lazy loaders — each exam chunk is only loaded on demand.
// To add a new exam: (1) create data/questions/{exam}/index.ts, (2) uncomment the loader.
const EXAM_LOADERS: Partial<Record<ExamCode, () => Promise<Question[]>>> = {
  "kikenbutsu-otsu4": async () => isExamPublished("kikenbutsu-otsu4") ? (await import("@/data/questions/kikenbutsu-otsu4")).QUESTIONS : [],
  "sekou-1kenchiku": async () => isExamPublished("sekou-1kenchiku") ? (await import("@/data/questions/sekou-1kenchiku")).SEKOU_1KENCHIKU_QUESTIONS : [],
  "khk-kagaku": async () => isExamPublished("khk-kagaku") ? (await import("@/data/questions/khk-kagaku")).KHK_KAGAKU_QUESTIONS : [],
  "benrishi": async () => isExamPublished("benrishi") ? (await import("@/data/questions/benrishi")).QUESTIONS : [],
  "sokuryoshi": async () => isExamPublished("sokuryoshi") ? (await import("@/data/questions/sokuryoshi")).QUESTIONS : [],
  "dokugeki-chiba": async () => isExamPublished("dokugeki-chiba") ? (await import("@/data/questions/dokugeki-chiba")).QUESTIONS : [],
  "jokaso-setsubishi": async () => isExamPublished("jokaso-setsubishi") ? (await import("@/data/questions/jokaso-setsubishi")).QUESTIONS : [],
  "chiiki-ryoko": async () => isExamPublished("chiiki-ryoko") ? (await import("@/data/questions/chiiki-ryoko")).QUESTIONS : [],
  "junkango-kansai": async () => isExamPublished("junkango-kansai") ? (await import("@/data/questions/junkango-kansai")).QUESTIONS : [],
  "kukaku-seiri": async () => isExamPublished("kukaku-seiri") ? (await import("@/data/questions/kukaku-seiri")).QUESTIONS : [],
  "dojo-osen": async () => isExamPublished("dojo-osen") ? (await import("@/data/questions/dojo-osen")).QUESTIONS : [],
  "kenchikushi2": async () => isExamPublished("kenchikushi2") ? (await import("@/data/questions/kenchikushi2")).QUESTIONS : [],
  "mokuzo-kenchikushi": async () => isExamPublished("mokuzo-kenchikushi") ? (await import("@/data/questions/mokuzo-kenchikushi")).QUESTIONS : [],
  kenchikushi1: async () => isExamPublished("kenchikushi1") ? (await import("@/data/questions/kenchikushi1")).KENCHIKUSHI1_QUESTIONS : [],
  "reform-mgr": async () => (await import("@/data/questions/reform-mgr")).REFORM_MGR_QUESTIONS,
  "shohi-sodan": async () => (await import("@/data/questions/shohi-sodan")).SHOHI_SODAN_QUESTIONS,
"chintai": async () => isExamPublished("chintai") ? (await import("@/data/questions/batch1/chintai.json")).default as Question[] : [],
"kyusui": async () => isExamPublished("kyusui") ? (await import("@/data/questions/batch1/kyusui.json")).default as Question[] : [],
"biru-kan": async () => isExamPublished("biru-kan") ? (await import("@/data/questions/batch1/biru-kan.json")).default as Question[] : [],
"gijutsushi1-kikai": async () => isExamPublished("gijutsushi1-kikai") ? (await import("@/data/questions/batch1/gijutsushi1-kikai.json")).default as Question[] : [],
"hoshasen-1": async () => isExamPublished("hoshasen-1") ? (await import("@/data/questions/batch1/hoshasen-1.json")).default as Question[] : [],
"hoshasen-2": async () => isExamPublished("hoshasen-2") ? (await import("@/data/questions/batch1/hoshasen-2.json")).default as Question[] : [],
"khk-kikai-kou": async () => isExamPublished("khk-kikai-kou") ? (await import("@/data/questions/batch1/khk-kikai-kou.json")).default as Question[] : [],
"khk-kikai-otsu": async () => isExamPublished("khk-kikai-otsu") ? (await import("@/data/questions/batch1/khk-kikai-otsu.json")).default as Question[] : [],
"energy-kanri": async () => isExamPublished("energy-kanri") ? (await import("@/data/questions/batch1/energy-kanri.json")).default as Question[] : [],

kanteishi: async () => isExamPublished("kanteishi") ? (await import("@/data/questions/kanteishi")).KANTEISHI_QUESTIONS : [],
kaikeishi: async () => isExamPublished("kaikeishi") ? (await import("@/data/questions/kaikeishi")).KAIKEISHI_QUESTIONS : [],
"riku-tech2": async () => isExamPublished("riku-tech2") ? (await import("@/data/questions/riku-tech2")).RIKU_TECH2_QUESTIONS : [],
"amateur2": async () => isExamPublished("amateur2") ? (await import("@/data/questions/amateur2")).AMATEUR2_QUESTIONS : [],
"maritime-radar": async () => isExamPublished("maritime-radar") ? (await import("@/data/questions/maritime-radar")).MARITIME_RADAR_QUESTIONS : [],
"amateur1": async () => isExamPublished("amateur1") ? (await import("@/data/questions/amateur1")).AMATEUR1_QUESTIONS : [],
"maritime-special1": async () => isExamPublished("maritime-special1") ? (await import("@/data/questions/maritime-special1")).MARITIME_SPECIAL1_QUESTIONS : [],
"aviation-comm": async () => isExamPublished("aviation-comm") ? (await import("@/data/questions/aviation-comm")).AVIATION_COMM_QUESTIONS : [],
"maritime1": async () => isExamPublished("maritime1") ? (await import("@/data/questions/maritime1")).MARITIME1_QUESTIONS : [],
"maritime2": async () => isExamPublished("maritime2") ? (await import("@/data/questions/maritime2")).MARITIME2_ALL_QUESTIONS : [],
"general1": async () => isExamPublished("general1") ? (await import("@/data/questions/general1")).GENERAL1_QUESTIONS : [],
"general2": async () => isExamPublished("general2") ? (await import("@/data/questions/general2")).GENERAL2_QUESTIONS : [],
"general3": async () => isExamPublished("general3") ? (await import("@/data/questions/general3")).GENERAL3_QUESTIONS : [],
"maritime3": async () => isExamPublished("maritime3") ? (await import("@/data/questions/maritime3")).MARITIME3_QUESTIONS : [],
"land-special2": async () => isExamPublished("land-special2") ? (await import("@/data/questions/land-special2")).LAND_SPECIAL2_QUESTIONS : [],
"land-special3": async () => isExamPublished("land-special3") ? (await import("@/data/questions/land-special3")).LAND_SPECIAL3_QUESTIONS : [],
"riku-tech1": async () => isExamPublished("riku-tech1") ? (await import("@/data/questions/riku-tech1")).RIKU_TECH1_QUESTIONS : [],
"maritime4": async () => isExamPublished("maritime4") ? (await import("@/data/questions/maritime4")).MARITIME4_QUESTIONS : [],
"riku-toku-kokunai": async () => isExamPublished("riku-toku-kokunai") ? (await import("@/data/questions/riku-toku-kokunai")).RIKU_TOKU_KOKUNAI_QUESTIONS : [],
"koku-toku": async () => isExamPublished("koku-toku") ? (await import("@/data/questions/koku-toku")).KOKU_TOKU_QUESTIONS : [],
"land-special1": async () => isExamPublished("land-special1") ? (await import("@/data/questions/land-special1")).LAND_SPECIAL1_QUESTIONS : [],
"kai-toku2": async () => isExamPublished("kai-toku2") ? (await import("@/data/questions/kai-toku2")).KAI_TOKU2_ALL_QUESTIONS : [],
"kai-toku3": async () => isExamPublished("kai-toku3") ? (await import("@/data/questions/kai-toku3")).KAI_TOKU3_QUESTIONS : [],
chosashi: async () => isExamPublished("chosashi") ? (await import("@/data/questions/chosashi")).CHOSASHI_QUESTIONS : [],
riyoshi: async () => isExamPublished("riyoshi") ? (await import("@/data/questions/riyoshi")).RIYOSHI_QUESTIONS : [],
ap: async () => (await import("@/data/questions/ap")).AP_QUESTIONS,
ip: async () => (await import("@/data/questions/ip")).IP_QUESTIONS,
sg: async () => (await import("@/data/questions/sg")).SG_QUESTIONS,
fe: async () => (await import("@/data/questions/fe")).FE_QUESTIONS,
sc: async () => (await import("@/data/questions/sc")).SC_QUESTIONS,
nw: async () => (await import("@/data/questions/nw")).NW_QUESTIONS,
db: async () => (await import("@/data/questions/db")).DB_QUESTIONS,
st: async () => (await import("@/data/questions/st")).ST_QUESTIONS,
sa: async () => (await import("@/data/questions/sa")).SA_QUESTIONS,
pm: async () => (await import("@/data/questions/pm")).PM_QUESTIONS,
es: async () => (await import("@/data/questions/es")).ES_QUESTIONS,
sm: async () => (await import("@/data/questions/sm")).SM_QUESTIONS,
au: async () => (await import("@/data/questions/au")).AU_QUESTIONS,
fp2: async () => (await import("@/data/questions/fp2")).FP2_QUESTIONS,
fp1: async () => (await import("@/data/questions/fp1")).FP1_QUESTIONS,
fp3: async () => (await import("@/data/questions/fp3")).FP3_QUESTIONS,
denken3: async () => (await import("@/data/questions/denken3")).DENKEN3_QUESTIONS,
denken2: async () => isExamPublished("denken2") ? (await import("@/data/questions/denken2")).DENKEN2_QUESTIONS : [],
denken1: async () => isExamPublished("denken1") ? (await import("@/data/questions/denken1")).DENKEN1_QUESTIONS : [],
takken: async () => (await import("@/data/questions/takken")).TAKKEN_QUESTIONS,
denko2: async () => isExamPublished("denko2") ? (await import("@/data/questions/denko2")).DENKO2_QUESTIONS : [],
denko1: async () => isExamPublished("denko1") ? (await import("@/data/questions/denko1")).DENKO1_QUESTIONS : [],
civil2: async () => isExamPublished("civil2") ? (await import("@/data/questions/civil2")).CIVIL2_QUESTIONS : [],
kankoji2: async () => isExamPublished("kankoji2") ? (await import("@/data/questions/kankoji2")).KANKOJI2_QUESTIONS : [],
zoen2: async () => isExamPublished("zoen2") ? (await import("@/data/questions/zoen2")).ZOEN2_QUESTIONS : [],
zoen1: async () => isExamPublished("zoen1") ? (await import("@/data/questions/zoen1")).ZOEN1_QUESTIONS : [],
tsushin2: async () => isExamPublished("tsushin2") ? (await import("@/data/questions/tsushin2")).TSUSHIN2_QUESTIONS : [],
tsushin1: async () => isExamPublished("tsushin1") ? (await import("@/data/questions/tsushin1")).TSUSHIN1_QUESTIONS : [],
kaigo: async () => isExamPublished("kaigo") ? (await import("@/data/questions/kaigo")).KAIGO_QUESTIONS : [],
civil1: async () => isExamPublished("civil1") ? (await import("@/data/questions/civil1")).CIVIL1_QUESTIONS : [],
shakai: async () => isExamPublished("shakai") ? (await import("@/data/questions/shakai")).SHAKAI_QUESTIONS : [],
seishin: async () => isExamPublished("seishin") ? (await import("@/data/questions/seishin")).SEISHIN_QUESTIONS : [],
tohan: async () => isExamPublished("tohan") ? (await import("@/data/questions/tohan")).TOHAN_QUESTIONS : [],
kanri: async () => isExamPublished("kanri") ? (await import("@/data/questions/kanri")).KANRI_QUESTIONS : [],
eisei1: async () => isExamPublished("eisei1") ? (await import("@/data/questions/eisei1")).EISEI1_QUESTIONS : [],
eisei2: async () => isExamPublished("eisei2") ? (await import("@/data/questions/eisei2")).EISEI2_QUESTIONS : [],
soukan: async () => isExamPublished("soukan") ? (await import("@/data/questions/soukan")).SOUKAN_QUESTIONS : [],
hoikushi: async () => isExamPublished("hoikushi") ? (await import("@/data/questions/hoikushi")).HOIKUSHI_QUESTIONS : [],
mankan: async () => isExamPublished("mankan") ? (await import("@/data/questions/mankan")).MANKAN_QUESTIONS : [],
kashikin: async () => isExamPublished("kashikin") ? (await import("@/data/questions/kashikin")).KASHIKIN_QUESTIONS : [],
sharoushi: async () => isExamPublished("sharoushi") ? (await import("@/data/questions/sharoushi")).SHAROUSHI_QUESTIONS : [],
"chusho-kigyo-shindanshi": async () => isExamPublished("chusho-kigyo-shindanshi") ? (await import("@/data/questions/chusho-kigyo-shindanshi")).CHUSHO_KIGYO_SHINDANSHI_QUESTIONS : [],
kangoshi: async () => isExamPublished("kangoshi") ? (await import("@/data/questions/kangoshi")).KANGOSHI_QUESTIONS : [],
yakuzaishi: async () => isExamPublished("yakuzaishi") ? (await import("@/data/questions/yakuzaishi")).YAKUZAISHI_QUESTIONS : [],
"ahaki-anma": async () => isExamPublished("ahaki-anma") ? (await import("@/data/questions/ahaki")).AHAKI_ANMA_QUESTIONS : [],
"ahaki-hari-kyu": async () => isExamPublished("ahaki-hari-kyu") ? (await import("@/data/questions/ahaki")).AHAKI_HARI_KYUU_QUESTIONS : [],
hokenshi: async () => isExamPublished("hokenshi") ? (await import("@/data/questions/hokenshi")).HOKENSHI_QUESTIONS : [],
josanshi: async () => isExamPublished("josanshi") ? (await import("@/data/questions/josanshi")).JOSANSHI_QUESTIONS : [],
"rigaku-ryohoshi": async () => isExamPublished("rigaku-ryohoshi") ? (await import("@/data/questions/rigaku-ryohoshi")).RIGAKU_RYOHOUSHI_QUESTIONS : [],
"sagyo-ryohoshi": async () => isExamPublished("sagyo-ryohoshi") ? (await import("@/data/questions/sagyo-ryohoshi")).SAGYO_RYOHOSHI_QUESTIONS : [],
"shino-kunrenshi": async () => isExamPublished("shino-kunrenshi") ? (await import("@/data/questions/shino-kunrenshi")).SHINO_KUNRENSHI_QUESTIONS : [],
"rinsho-kogishi": async () => isExamPublished("rinsho-kogishi") ? (await import("@/data/questions/rinsho-kogishi")).RINSHO_KOGISHI_QUESTIONS : [],
"judo-seifukushi": async () => isExamPublished("judo-seifukushi") ? (await import("@/data/questions/judo-seifukushi")).JUDO_SEIFUKUSHI_QUESTIONS : [],
"gas-kou": async () => isExamPublished("gas-kou") ? (await import("@/data/questions/gas/kou")).GAS_KOU_QUESTIONS : [],
"gas-otsu": async () => isExamPublished("gas-otsu") ? (await import("@/data/questions/gas/otsu")).GAS_OTSU_QUESTIONS : [],
"gas-hei": async () => isExamPublished("gas-hei") ? (await import("@/data/questions/gas/hei")).GAS_HEI_QUESTIONS : [],
"rinsho-kensagishi": async () => isExamPublished("rinsho-kensagishi") ? (await import("@/data/questions/rinsho-kensagishi")).RINSHO_KENSAGISHI_QUESTIONS : [],
"shinryo-hoshasengishi": async () => isExamPublished("shinryo-hoshasengishi") ? (await import("@/data/questions/shinryo-hoshasengishi")).SHINRYO_HOSHASENGISHI_QUESTIONS : [],
"shika-ishi": async () => isExamPublished("shika-ishi") ? (await import("@/data/questions/shika-ishi")).SHIKA_ISHI_QUESTIONS : [],
"kenchiku-setsubishi": async () => isExamPublished("kenchiku-setsubishi") ? (await import("@/data/questions/kenchiku-setsubishi")).KENCHIKU_SETSUBISHI_STUDY_QUESTIONS : [],
chizai2: async () => isExamPublished("chizai2") ? (await import("@/data/questions/chizai2")).CHIZAI2_QUESTIONS : [],
kisho: async () => isExamPublished("kisho") ? (await import("@/data/questions/kisho")).KISHO_QUESTIONS : [],
"jidosha-1-small-written": async () => isExamPublished("jidosha-1-small-written") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-1-small-written") : [],
"jidosha-2-gasoline": async () => isExamPublished("jidosha-2-gasoline") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-2-gasoline") : [],
"jidosha-2-diesel": async () => isExamPublished("jidosha-2-diesel") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-2-diesel") : [],
"jidosha-2-chassis": async () => isExamPublished("jidosha-2-chassis") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-2-chassis") : [],
"jidosha-2-motorcycle": async () => isExamPublished("jidosha-2-motorcycle") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-2-motorcycle") : [],
"jidosha-3-chassis": async () => isExamPublished("jidosha-3-chassis") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-3-chassis") : [],
"jidosha-3-gasoline": async () => isExamPublished("jidosha-3-gasoline") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-3-gasoline") : [],
"jidosha-3-diesel": async () => isExamPublished("jidosha-3-diesel") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-3-diesel") : [],
"jidosha-3-motorcycle": async () => isExamPublished("jidosha-3-motorcycle") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-3-motorcycle") : [],
"jidosha-body": async () => isExamPublished("jidosha-body") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-body") : [],
"jidosha-electrical": async () => isExamPublished("jidosha-electrical") ? (await import("@/data/questions/automotive")).getAutomotiveQuestions("jidosha-electrical") : [],
biyoshi: async () => (await import("@/data/questions/biyoshi")).BIYOSHI_QUESTIONS,
"kikenbutsu-otsu1": async () => (await import("@/data/questions/kikenbutsu-otsu1")).QUESTIONS,
"kikenbutsu-otsu2": async () => (await import("@/data/questions/kikenbutsu-otsu2")).QUESTIONS,
"kikenbutsu-otsu6": async () => (await import("@/data/questions/kikenbutsu-otsu6")).QUESTIONS,
jokaso: async () => isExamPublished("jokaso") ? (await import("@/data/questions/jokaso")).JOKASO_CANDIDATES : [],
"iji-shuzen": async () => isExamPublished("iji-shuzen") ? (await import("@/data/questions/iji-shuzen")).IJI_SHUZEN_QUESTIONS : [],
denki1: async () => isExamPublished("denki1") ? (await import("@/data/questions/denki1")).DENKI1_QUESTIONS : [],
shuwa: async () => isExamPublished("shuwa") ? (await import("@/data/questions/shuwa")).SHUWA_QUESTIONS : [],
"jken-katsuyo3": async () => isExamPublished("jken-katsuyo3") ? (await import("@/data/questions/jken-katsuyo3")).JKEN_KATSUYO3_QUESTIONS : [],
"jken-katsuyo2": async () => isExamPublished("jken-katsuyo2") ? (await import("@/data/questions/jken-katsuyo2")).JKEN_KATSUYO2_QUESTIONS : [],
"jken-katsuyo1": async () => isExamPublished("jken-katsuyo1") ? (await import("@/data/questions/jken-katsuyo1")).JKEN_KATSUYO1_QUESTIONS : [],
"jken-system": async () => isExamPublished("jken-system") ? (await import("@/data/questions/jken-system")).JKEN_SYSTEM_QUESTIONS : [],
shinrishi: async () => isExamPublished("shinrishi") ? (await import("@/data/questions/shinrishi")).SHINRISHI_QUESTIONS : [],
"khk-reito-3": async () => isExamPublished("khk-reito-3") ? (await import("@/data/questions/khk-reito-3")).KHK_REITO_3_QUESTIONS : [],
"khk-reito-2": async () => isExamPublished("khk-reito-2") ? (await import("@/data/questions/khk-reito-2")).KHK_REITO_2_QUESTIONS : [],
"khk-reito-1": async () => isExamPublished("khk-reito-1") ? (await import("@/data/questions/khk-reito-1")).KHK_REITO_1_QUESTIONS : [],
"sekou-kenchiku2": async () => isExamPublished("sekou-kenchiku2") ? (await import("@/data/questions/sekou-kenchiku2")).SEKOU_KENCHIKU2_QUESTIONS : [],
denki2: async () => isExamPublished("denki2") ? (await import("@/data/questions/denki2")).DENKI2_QUESTIONS : [],
kankoji1: async () => isExamPublished("kankoji1") ? (await import("@/data/questions/kankoji1")).KANKOJI1_QUESTIONS : [],
"yamaguchi-chori": async () => isExamPublished("yamaguchi-chori") ? (await import("@/data/questions/yamaguchi-chori")).YAMAGUCHI_CHORI_QUESTIONS : [],
"yamaguchi-seika": async () => isExamPublished("yamaguchi-seika") ? (await import("@/data/questions/yamaguchi-seika")).YAMAGUCHI_SEIKA_QUESTIONS : [],
"yamaguchi-fugu": async () => isExamPublished("yamaguchi-fugu") ? (await import("@/data/questions/yamaguchi-fugu")).YAMAGUCHI_FUGU_QUESTIONS : [],
"keiryoshi": async () => isExamPublished("keiryoshi") ? (await import("@/data/questions/keiryoshi")).getKeiryoshiCandidates("keiryoshi") : [],
"keiryoshi-nodo": async () => isExamPublished("keiryoshi-nodo") ? (await import("@/data/questions/keiryoshi")).getKeiryoshiCandidates("keiryoshi-nodo") : [],
"keiryoshi-soon": async () => isExamPublished("keiryoshi-soon") ? (await import("@/data/questions/keiryoshi")).getKeiryoshiCandidates("keiryoshi-soon") : [],
kenki2: async () => isExamPublished("kenki2") ? (await import("@/data/questions/kenki2")).KENKI2_QUESTIONS : [],
kenki1: async () => isExamPublished("kenki1") ? (await import("@/data/questions/kenki1")).KENKI1_QUESTIONS : [],
gyosei: async () => isExamPublished("gyosei") ? (await import("@/data/questions/gyosei")).GYOSEI_QUESTIONS : [],
shihoshoshi: async () => isExamPublished("shihoshoshi") ? (await import("@/data/questions/shihoshoshi")).SHIHOSHOSHI_BATCH1_QUESTIONS : [],
"career-consultant": async () => isExamPublished("career-consultant") ? (await import("@/data/questions/career-consultant")).CAREER_CONSULTANT_QUESTIONS : [],
"kanri-eiyoshi": async () => isExamPublished("kanri-eiyoshi") ? (await import("@/data/questions/kanri-eiyoshi")).KANRI_EIYOSHI_QUESTIONS : [],
"sogo-ryoko": async () => isExamPublished("sogo-ryoko") ? (await import("@/data/questions/sogo-ryoko")).SOGO_RYOKO_QUESTIONS : [],
"shiho-tanto": async () => isExamPublished("shiho-tanto") ? (await import("@/data/questions/shiho-tanto")).SHIHO_TANTO_QUESTIONS : [],
"yobi-tanto": async () => isExamPublished("yobi-tanto") ? (await import("@/data/questions/yobi-tanto")).YOBI_TANTO_QUESTIONS : [],
"sokuryoshiho": async () => isExamPublished("sokuryoshiho") ? (await import("@/data/questions/sokuryoshiho")).SOKURYOSHIHO_QUESTIONS : [],
"caremanager": async () => isExamPublished("caremanager") ? (await import("@/data/questions/caremanager")).CAREMANAGER_QUESTIONS : [],
"kikai-hozen": async () => isExamPublished("kikai-hozen") ? (await import("@/data/questions/kikai-hozen")).KIKAI_HOZEN_QUESTIONS : [],
"tsukanshi": async () => isExamPublished("tsukanshi") ? (await import("@/data/questions/tsukanshi")).TSUKANSHI_QUESTIONS : []
};

/** Load questions for one exam (lazy — only loads the requested exam's chunk). */
export async function getQuestionsForExam(exam: ExamCode): Promise<Question[]> {
  const loader = EXAM_LOADERS[exam];
  return loader ? loader() : [];
}

let allQuestionsPromise: Promise<Question[]> | undefined;

/** The release catalog is static for this process. Reuse the loaded corpus across requests. */
export async function getAllQuestionsLazy(): Promise<Question[]> {
  allQuestionsPromise ??= Promise.all(
    (Object.values(EXAM_LOADERS) as Array<() => Promise<Question[]>>).map((load) => load()),
  ).then(chunks => chunks.flat()).catch(error => {
    allQuestionsPromise = undefined;
    throw error;
  });
  // Callers may sort their pool; the cached list must retain its source order.
  return [...await allQuestionsPromise];
}

/** Exam codes that have data registered (may differ from ExamCode union). */
export function getRegisteredExamCodes(): ExamCode[] {
  return (Object.keys(EXAM_LOADERS) as ExamCode[]).filter(isExamPublished);
}

/** Question count per exam, loaded lazily. Useful for UI badges. */
export async function getQuestionCountsByExam(): Promise<Partial<Record<ExamCode, number>>> {
  const entries = await Promise.all(
    (Object.entries(EXAM_LOADERS) as Array<[ExamCode, () => Promise<Question[]>]>).filter(
      ([code]) => isExamPublished(code),
    ).map(
      async ([code, load]) => [code, (await load()).length] as const,
    ),
  );
  return Object.fromEntries(entries);
}
