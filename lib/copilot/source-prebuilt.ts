// ビルド時に書き出すコパイロット用ファイル（generated/copilot/）の読み書き。
//
//   manifest.json            版・コーパス指紋・件数
//   docs.json.gz             検索文書のメタ（問題文書の本文は持たず、問題から都度組み立てる）
//   index.bin                BM25 索引（index-artifact.ts の形式）
//   question-ids.json.gz     問題 ID を共通コーパスの試験別ファイル内の位置に対応づける
//
// 実行時に全問題データ（約 150MB の JS）を読まずに済ませるための仕組み。
// 書き出し側（scripts/build-copilot-index.ts）が、読み戻した結果とデータ本体からの
// 組み立て結果の一致を確かめてから書く。

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { setImmediate as yieldToEventLoop } from "node:timers/promises";
import { promisify } from "node:util";
import { gunzip, gunzipSync, gzipSync } from "node:zlib";
import { openQuestionCorpus } from "@/lib/questions/corpus-files";
import type { ExamCode, Question } from "@/lib/questions/types";
import { buildQuestionDoc } from "./corpus-docs";
import { deserializeIndexAsync, serializeIndex } from "./index-artifact";
import type { InvertedIndex } from "./retriever";
import type { CopilotSource } from "./source";
import type { CorpusDoc } from "./types";

export const COPILOT_PREBUILT_DIR = "generated/copilot";
const FORMAT_VERSION = 2;
const DOC_BATCH = 4096;
const unzipDocs = promisify(gunzip);
type QuestionIdsByExam = Partial<Record<ExamCode, string[]>>;

interface Manifest {
  version: number;
  fingerprint: string;
  questionCount: number;
  docCount: number;
}

interface StoredDoc {
  id: string;
  kind: CorpusDoc["kind"];
  title: string;
  url: string;
  meta: CorpusDoc["meta"];
  textLength: number;
  /** 用語集の文書だけ本文を持つ（問題文書は問題から組み立てる）。 */
  text?: string;
}

/** ビルド時: 問題の位置・文書・索引を書き出す。 */
export function writePrebuiltCopilotFiles(
  rootDir: string,
  questionsByExam: Partial<Record<ExamCode, readonly Question[]>>,
  index: InvertedIndex,
  fingerprint: string,
): { bytes: number } {
  const dir = join(rootDir, COPILOT_PREBUILT_DIR);
  mkdirSync(dir, { recursive: true });
  let bytes = 0;
  const write = (file: string, data: Uint8Array | string) => {
    writeFileSync(file, data);
    bytes += typeof data === "string" ? Buffer.byteLength(data) : data.length;
  };

  const questionIds = Object.fromEntries(
    Object.entries(questionsByExam).map(([exam, questions]) => [exam, questions.map(q => q.id)]),
  ) as QuestionIdsByExam;
  write(join(dir, "question-ids.json.gz"), gzipSync(JSON.stringify(questionIds), { level: 9 }));

  const docs: StoredDoc[] = index.docs.map((doc) => ({
    id: doc.id,
    kind: doc.kind,
    title: doc.title,
    url: doc.url,
    meta: doc.meta,
    textLength: doc.text.length,
    ...(doc.kind === "glossary" ? { text: doc.text } : {}),
  }));
  write(join(dir, "docs.json.gz"), gzipSync(JSON.stringify(docs), { level: 9 }));
  write(join(dir, "index.bin"), serializeIndex(index));

  const manifest: Manifest = {
    version: FORMAT_VERSION,
    fingerprint,
    questionCount: Object.values(questionIds).reduce((total, ids) => total + ids.length, 0),
    docCount: docs.length,
  };
  write(join(dir, "manifest.json"), JSON.stringify(manifest));
  return { bytes };
}

function isManifest(value: unknown): value is Manifest {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return v.version === FORMAT_VERSION && typeof v.fingerprint === "string" &&
    Number.isInteger(v.questionCount) && Number.isInteger(v.docCount);
}

/**
 * 書き出したファイルを開く。manifest が無い・版が違う場合は null（呼び出し側がデータ本体へ戻る）。
 * 索引・文書は index() の初回に、問題は該当する試験を初めて引いたときに読む。
 */
export function openPrebuiltCopilotSource(rootDir: string = process.cwd()): CopilotSource | null {
  const dir = join(rootDir, COPILOT_PREBUILT_DIR);
  let manifest: Manifest;
  try {
    const manifestFile = join(dir, "manifest.json");
    if (!existsSync(manifestFile)) return null;
    const parsed: unknown = JSON.parse(readFileSync(manifestFile, "utf8"));
    if (!isManifest(parsed)) return null;
    manifest = parsed;
  } catch {
    return null;
  }

  const corpus = openQuestionCorpus(rootDir);
  const idsByExam = JSON.parse(gunzipSync(readFileSync(join(dir, "question-ids.json.gz"))).toString("utf8")) as QuestionIdsByExam;
  const locations = new Map<string, { exam: ExamCode; offset: number }>();
  let count = 0;
  for (const [exam, ids] of Object.entries(idsByExam)) {
    ids.forEach((id, offset) => locations.set(id, { exam: exam as ExamCode, offset }));
    count += ids.length;
  }
  if (count !== manifest.questionCount) throw new Error("copilot prebuilt question count mismatch");
  const getQuestion = (id: string): Question | undefined => {
    const location = locations.get(id);
    if (!location) return undefined;
    const question = corpus.staticExamFile(location.exam)[location.offset];
    if (question?.id !== id) throw new Error("copilot prebuilt question does not match its corpus");
    return question;
  };

  const loadIndex = async (): Promise<InvertedIndex> => {
    const started = Date.now();
    const [docsJson, indexBytes] = await Promise.all([
      readFile(join(dir, "docs.json.gz")).then(unzipDocs),
      readFile(join(dir, "index.bin")),
    ]);
    const stored = JSON.parse(docsJson.toString("utf8")) as StoredDoc[];
    if (stored.length !== manifest.docCount) throw new Error("copilot prebuilt docs count mismatch");
    const docs: CorpusDoc[] = new Array(stored.length);
    for (let i = 0; i < stored.length; i++) {
      docs[i] = toCorpusDoc(stored[i], getQuestion);
      if (i % DOC_BATCH === DOC_BATCH - 1) await yieldToEventLoop();
    }
    // 索引と文書は同じビルドで書かれている。指紋は両ファイルの突き合わせに使う
    // （全文から計算し直すと全試験の問題を読むことになるため）。
    const restored = await deserializeIndexAsync(indexBytes, docs, {
      fingerprint: manifest.fingerprint,
      verifyTokenization: false,
    });
    if (!restored) throw new Error("copilot prebuilt index does not match its manifest");
    console.info("[copilot] prebuilt index loaded", { ms: Date.now() - started, docs: docs.length });
    return restored;
  };

  let index: Promise<InvertedIndex> | undefined;
  return {
    kind: "prebuilt",
    getQuestion,
    index: () => index ??= loadIndex().catch((error: unknown) => {
      index = undefined;
      throw error;
    }),
  };
}

function toCorpusDoc(stored: StoredDoc, getQuestion: (id: string) => Question | undefined): CorpusDoc {
  const base = {
    id: stored.id,
    kind: stored.kind,
    title: stored.title,
    url: stored.url,
    meta: stored.meta,
    textLength: stored.textLength,
  };
  if (stored.text !== undefined) return { ...base, text: stored.text };
  // 問題文書の本文は、使われたときに問題から組み立てる（getCorpus と同じ buildQuestionDoc）。
  const doc = base as CorpusDoc;
  Object.defineProperty(doc, "text", {
    enumerable: true,
    configurable: true,
    get(): string {
      const question = getQuestion(stored.id.replace(/^q:/, ""));
      const text = question ? buildQuestionDoc(question).text : "";
      Object.defineProperty(doc, "text", { value: text, enumerable: true, writable: true, configurable: true });
      return text;
    },
  });
  return doc;
}
