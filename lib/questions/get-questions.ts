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
  fp3: async () => (await import("@/data/questions/fp3")).FP3_QUESTIONS,
  denko2: async () => isExamPublished("denko2") ? (await import("@/data/questions/denko2")).DENKO2_QUESTIONS : [],
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
