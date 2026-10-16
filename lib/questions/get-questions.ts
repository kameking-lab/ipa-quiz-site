import type { ExamCode, Question } from "./types";
import { isExamPublished } from "@/lib/qualifications/catalog";

// Bundler-friendly lazy loaders — each exam chunk is only loaded on demand.
// To add a new exam: (1) create data/questions/{exam}/index.ts, (2) uncomment the loader.
const EXAM_LOADERS: Partial<Record<ExamCode, () => Promise<Question[]>>> = {
  "riku-tech2": async () => isExamPublished("riku-tech2") ? (await import("@/data/questions/riku-tech2")).RIKU_TECH2_QUESTIONS : [],
  "amateur2": async () => isExamPublished("amateur2") ? (await import("@/data/questions/amateur2")).AMATEUR2_QUESTIONS : [],
  "maritime-radar": async () => isExamPublished("maritime-radar") ? (await import("@/data/questions/maritime-radar")).MARITIME_RADAR_QUESTIONS : [],
  "amateur1": async () => isExamPublished("amateur1") ? (await import("@/data/questions/amateur1")).AMATEUR1_QUESTIONS : [],
  "maritime-special1": async () => isExamPublished("maritime-special1") ? (await import("@/data/questions/maritime-special1")).MARITIME_SPECIAL1_QUESTIONS : [],
  "aviation-comm": async () => isExamPublished("aviation-comm") ? (await import("@/data/questions/aviation-comm")).AVIATION_COMM_QUESTIONS : [],
  "maritime2": async () => isExamPublished("maritime2") ? (await import("@/data/questions/maritime2")).MARITIME2_ALL_QUESTIONS : [],
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
  "rinsho-kensagishi": async () => isExamPublished("rinsho-kensagishi") ? (await import("@/data/questions/rinsho-kensagishi")).RINSHO_KENSAGISHI_QUESTIONS : [],
  "shinryo-hoshasengishi": async () => isExamPublished("shinryo-hoshasengishi") ? (await import("@/data/questions/shinryo-hoshasengishi")).SHINRYO_HOSHASENGISHI_QUESTIONS : [],
  "shika-ishi": async () => isExamPublished("shika-ishi") ? (await import("@/data/questions/shika-ishi")).SHIKA_ISHI_QUESTIONS : [],
};

/** Load questions for one exam (lazy — only loads the requested exam's chunk). */
export async function getQuestionsForExam(exam: ExamCode): Promise<Question[]> {
  const loader = EXAM_LOADERS[exam];
  return loader ? loader() : [];
}

/** Load questions for all registered exams (for cross-exam random / topic modes). */
export async function getAllQuestionsLazy(): Promise<Question[]> {
  const chunks = await Promise.all(
    (Object.values(EXAM_LOADERS) as Array<() => Promise<Question[]>>).map((load) => load()),
  );
  return chunks.flat();
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
