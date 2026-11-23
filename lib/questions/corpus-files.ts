import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";
import { deserialize } from "node:v8";
import type { ExamCode, Question } from "./types";

export const QUESTION_CORPUS_DIR = "generated/question-corpus";
export const STATIC_CORPUS_FILE = "static-corpus.v8.gz";
const POOL_FILENAME = /^[a-f0-9]{64}\.(json|v8)\.gz$/;
export interface QuestionCorpusManifest {
  version: 1;
  staticExams: Partial<Record<ExamCode, { file: string; count: number }>>;
  lazyExams: Partial<Record<ExamCode, { file: string; count: number }>>;
  staticCorpus?: { file: string; count: number };
}

export function openQuestionCorpus(root = process.cwd()) {
  const dir = join(root, QUESTION_CORPUS_DIR);
  const manifest = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")) as QuestionCorpusManifest;
  if (manifest.version !== 1 || !manifest.staticExams || !manifest.lazyExams) {
    throw new Error("Invalid question corpus; run pnpm questions:write");
  }
  const files = new Map<string, Question[]>();
  const staticCorpus = manifest.staticCorpus;
  if (staticCorpus && staticCorpus.file !== STATIC_CORPUS_FILE && !POOL_FILENAME.test(staticCorpus.file)) {
    throw new Error("Invalid question corpus snapshot filename");
  }
  // Some functions ship only the per-exam files.
  const hasSnapshot = staticCorpus && existsSync(join(dir, staticCorpus.file));
  let staticPools: Partial<Record<ExamCode, Question[]>> | undefined;
  function read(entry: { file: string; count: number } | undefined): Question[] {
    if (!entry) return [];
    if (entry.file !== STATIC_CORPUS_FILE && !POOL_FILENAME.test(entry.file)) {
      throw new Error("Invalid question corpus filename");
    }
    const cached = files.get(entry.file);
    if (cached) return cached;
    const bytes = gunzipSync(readFileSync(join(dir, entry.file)));
    const questions = (entry.file.endsWith(".v8.gz") ? deserialize(bytes) : JSON.parse(bytes.toString("utf8"))) as Question[];
    if (!Array.isArray(questions) || questions.length !== entry.count) throw new Error("Question corpus count mismatch");
    files.set(entry.file, questions);
    return questions;
  }
  function staticExam(exam: ExamCode): Question[] {
    if (!manifest.staticExams[exam]) return [];
    if (!hasSnapshot) return read(manifest.staticExams[exam]);
    if (!staticPools) {
      // A static registry always needs the entire corpus. One read avoids
      // hundreds of synchronous file opens on a cold question-page request.
      const all = read(staticCorpus);
      const pools: Partial<Record<ExamCode, Question[]>> = {};
      let offset = 0;
      for (const code of Object.keys(manifest.staticExams) as ExamCode[]) {
        const entry = manifest.staticExams[code]!;
        if (!POOL_FILENAME.test(entry.file) || !Number.isSafeInteger(entry.count) || entry.count < 0) {
          throw new Error("Invalid question corpus entry");
        }
        const pool = files.get(entry.file) ?? all.slice(offset, offset + entry.count);
        if (pool.length !== entry.count) throw new Error("Question corpus count mismatch");
        // Preserve shared object identity when an exam was loaded lazily first.
        for (let i = 0; i < pool.length; i++) all[offset + i] = pool[i];
        files.set(entry.file, pool);
        pools[code] = pool;
        offset += entry.count;
      }
      if (offset !== all.length) throw new Error("Question corpus count mismatch");
      staticPools = pools;
    }
    return staticPools[exam] ?? [];
  }
  return {
    staticCodes: () => Object.keys(manifest.staticExams) as ExamCode[],
    lazyCodes: () => Object.keys(manifest.lazyExams) as ExamCode[],
    staticExam,
    staticExamFile: (exam: ExamCode) => read(manifest.staticExams[exam]),
    lazyExam: (exam: ExamCode) => read(manifest.lazyExams[exam]),
    lazyCount: (exam: ExamCode) => manifest.lazyExams[exam]?.count ?? 0,
  };
}

let corpus: ReturnType<typeof openQuestionCorpus> | undefined;
export function getQuestionCorpus() {
  return corpus ??= openQuestionCorpus();
}
