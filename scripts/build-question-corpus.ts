import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import { serialize } from "node:v8";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getAllQuestionsLazy, getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { openQuestionCorpus, QUESTION_CORPUS_DIR, type QuestionCorpusManifest } from "@/lib/questions/corpus-files";
import type { ExamCode, Question } from "@/lib/questions/types";

async function main() {
  const root = resolve(process.cwd());
  const dir = resolve(root, QUESTION_CORPUS_DIR);
  if (dirname(dir) !== join(root, "generated") || (existsSync(dir) && lstatSync(dir).isSymbolicLink())) {
    throw new Error("Unexpected question corpus output directory");
  }
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const manifest: QuestionCorpusManifest = { version: 1, staticExams: {}, lazyExams: {} };
  const written = new Set<string>();
  let bytes = 0;
  function store(questions: Question[]) {
    // Build and runtime both use Node 22. The standard V8 wire format avoids
    // allocating a corpus-sized UTF-16 JSON string on a cold server.
    const payload = serialize(questions);
    const file = `${createHash("sha256").update(payload).digest("hex")}.v8.gz`;
    if (!written.has(file)) {
      const compressed = gzipSync(payload, { level: 6 });
      writeFileSync(join(dir, file), compressed);
      if (!gunzipSync(readFileSync(join(dir, file))).equals(payload)) {
        throw new Error(`Question corpus write mismatch: ${file}`);
      }
      bytes += compressed.length;
      written.add(file);
    }
    return { file, count: questions.length };
  }
  for (const [exam, questions] of Object.entries(QUESTIONS_BY_EXAM)) {
    manifest.staticExams[exam as ExamCode] = store(questions);
  }
  manifest.staticCorpus = store(ALL_QUESTIONS);
  const lazy = new Map<ExamCode, Question[]>();
  for (const exam of getRegisteredExamCodes()) {
    const questions = await getQuestionsForExam(exam);
    lazy.set(exam, questions);
    manifest.lazyExams[exam] = store(questions);
  }
  writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest));
  const restored = openQuestionCorpus();
  function same(actual: Question[], expected: Question[], label: string) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Question corpus mismatch: ${label}`);
  }
  same(restored.staticCodes().flatMap(restored.staticExam), ALL_QUESTIONS, "static order and content");
  for (const [exam, questions] of lazy) same(restored.lazyExam(exam), questions, exam);
  same(restored.lazyCodes().flatMap(restored.lazyExam), await getAllQuestionsLazy(), "lazy order and content");
  console.log(`[question-corpus] Verified ${ALL_QUESTIONS.length} questions, ${restored.staticCodes().length} static / ${restored.lazyCodes().length} lazy exams, ${written.size} files, ${(bytes / 1024 / 1024).toFixed(1)} MiB.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
