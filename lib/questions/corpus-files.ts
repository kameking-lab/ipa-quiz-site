import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";
import type { ExamCode, Question } from "./types";

export const QUESTION_CORPUS_DIR = "generated/question-corpus";
export interface QuestionCorpusManifest {
  version: 1;
  staticExams: Partial<Record<ExamCode, { file: string; count: number }>>;
  lazyExams: Partial<Record<ExamCode, { file: string; count: number }>>;
}

export function openQuestionCorpus(root = process.cwd()) {
  const dir = join(root, QUESTION_CORPUS_DIR);
  const manifest = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")) as QuestionCorpusManifest;
  if (manifest.version !== 1 || !manifest.staticExams || !manifest.lazyExams) {
    throw new Error("Invalid question corpus; run pnpm questions:write");
  }
  const files = new Map<string, Question[]>();
  function read(entry: { file: string; count: number } | undefined): Question[] {
    if (!entry) return [];
    if (!/^[a-f0-9]{64}\.json\.gz$/.test(entry.file)) throw new Error("Invalid question corpus filename");
    const cached = files.get(entry.file);
    if (cached) return cached;
    const questions = JSON.parse(gunzipSync(readFileSync(join(dir, entry.file))).toString("utf8")) as Question[];
    if (!Array.isArray(questions) || questions.length !== entry.count) throw new Error("Question corpus count mismatch");
    files.set(entry.file, questions);
    return questions;
  }
  return {
    staticCodes: () => Object.keys(manifest.staticExams) as ExamCode[],
    lazyCodes: () => Object.keys(manifest.lazyExams) as ExamCode[],
    staticExam: (exam: ExamCode) => read(manifest.staticExams[exam]),
    lazyExam: (exam: ExamCode) => read(manifest.lazyExams[exam]),
    lazyCount: (exam: ExamCode) => manifest.lazyExams[exam]?.count ?? 0,
  };
}

let corpus: ReturnType<typeof openQuestionCorpus> | undefined;
export function getQuestionCorpus() {
  return corpus ??= openQuestionCorpus();
}
