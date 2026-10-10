import type { ExamCode, Question } from "./types";
import { isExamPublished } from "@/lib/qualifications/catalog";

// Bundler-friendly lazy loaders — each exam chunk is only loaded on demand.
// To add a new exam: (1) create data/questions/{exam}/index.ts, (2) uncomment the loader.
const EXAM_LOADERS: Partial<Record<ExamCode, () => Promise<Question[]>>> = {
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
  kangoshi: async () => isExamPublished("kangoshi") ? (await import("@/data/questions/kangoshi")).KANGOSHI_QUESTIONS : [],
  yakuzaishi: async () => isExamPublished("yakuzaishi") ? (await import("@/data/questions/yakuzaishi")).YAKUZAISHI_QUESTIONS : [],
  "ahaki-anma": async () => isExamPublished("ahaki-anma") ? (await import("@/data/questions/ahaki")).AHAKI_ANMA_QUESTIONS : [],
  "ahaki-hari-kyu": async () => isExamPublished("ahaki-hari-kyu") ? (await import("@/data/questions/ahaki")).AHAKI_HARI_KYUU_QUESTIONS : [],
  hokenshi: async () => isExamPublished("hokenshi") ? (await import("@/data/questions/hokenshi")).HOKENSHI_QUESTIONS : [],
  josanshi: async () => isExamPublished("josanshi") ? (await import("@/data/questions/josanshi")).JOSANSHI_QUESTIONS : [],
  "rigaku-ryohoshi": async () => isExamPublished("rigaku-ryohoshi") ? (await import("@/data/questions/rigaku-ryohoshi")).RIGAKU_RYOHOUSHI_QUESTIONS : [],
  "sagyo-ryohoshi": async () => isExamPublished("sagyo-ryohoshi") ? (await import("@/data/questions/sagyo-ryohoshi")).SAGYO_RYOHOSHI_QUESTIONS : [],
  "shino-kunrenshi": async () => isExamPublished("shino-kunrenshi") ? (await import("@/data/questions/shino-kunrenshi")).SHINO_KUNRENSHI_QUESTIONS : [],
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
