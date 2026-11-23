// ビルド時に書き出すコパイロット用ファイル（generated/copilot/）の読み書き。
//
//   manifest.json            版・コーパス指紋・件数
//   docs.bin                 検索文書のメタ。64件ずつ展開できる
//   index-directory.v8.gz    BM25 の全体統計と語ごとの位置
//   index-postings.bin       必要な語だけ展開できるポスティング
//   question-ids.json.gz     問題 ID を共通コーパスの試験別ファイル内の位置に対応づける
//
// 実行時に全問題データ（約 150MB の JS）を読まずに済ませるための仕組み。
// 書き出し側（scripts/build-copilot-index.ts）が、読み戻した結果とデータ本体からの
// 組み立て結果の一致を確かめてから書く。

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import { openQuestionCorpus } from "@/lib/questions/corpus-files";
import type { ExamCode, Question } from "@/lib/questions/types";
import { buildQuestionDoc } from "./corpus-docs";
import { COPILOT_PREBUILT_DIR, INDEX_DIRECTORY_FILE, INDEX_POSTINGS_FILE, openPackedIndex, serializeIndex } from "./index-artifact";
import type { InvertedIndex, SearchIndex } from "./retriever";
import type { CopilotSource } from "./source";
import type { CorpusDoc } from "./types";

export { COPILOT_PREBUILT_DIR } from "./index-artifact";
const FORMAT_VERSION = 3;
const DOCS_FILE = "docs.bin";
const DOCS_PER_BLOCK = 64;
const DOC_BLOCK_CACHE_SIZE = 128;
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

  write(join(dir, DOCS_FILE), packDocs(index.docs));
  const { directory, postings } = serializeIndex(index, fingerprint);
  write(join(dir, INDEX_DIRECTORY_FILE), directory);
  write(join(dir, INDEX_POSTINGS_FILE), postings);

  const manifest: Manifest = {
    version: FORMAT_VERSION,
    fingerprint,
    questionCount: Object.values(questionIds).reduce((total, ids) => total + ids.length, 0),
    docCount: index.docs.length,
  };
  write(join(dir, "manifest.json"), JSON.stringify(manifest));
  return { bytes };
}

function isManifest(value: unknown): value is Manifest {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return v.version === FORMAT_VERSION && typeof v.fingerprint === "string" &&
    typeof v.questionCount === "number" && Number.isSafeInteger(v.questionCount) && v.questionCount >= 0 &&
    typeof v.docCount === "number" && Number.isSafeInteger(v.docCount) && v.docCount >= 0;
}

/**
 * 書き出したファイルを開く。manifest が無い・版が違う場合は null（呼び出し側がデータ本体へ戻る）。
 * 索引・文書は index() の初回に、問題は該当する試験を初めて引いたときに読む。
 */
export function openPrebuiltCopilotSource(rootDir: string = process.cwd()): CopilotSource | null {
  // next.config.ts explicitly traces generated/copilot for this route. rootDir
  // is also supplied by the build verifier and tests.
  const dir = join(/*turbopackIgnore: true*/ rootDir, COPILOT_PREBUILT_DIR);
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

  const loadIndex = async (): Promise<SearchIndex> => {
    const started = performance.now();
    const read = async (file: string) => {
      const data = await readFile(/*turbopackIgnore: true*/ join(dir, file));
      return { data, ms: performance.now() - started };
    };
    const [docs, directory, postings] = await Promise.all([
      read(DOCS_FILE),
      read(INDEX_DIRECTORY_FILE),
      read(INDEX_POSTINGS_FILE),
    ]);
    // 全資格の統計だけを復元し、語のポスティングと文書のメタは検索中に必要な分だけ開く。
    const decodeStarted = performance.now();
    const getDoc = openPackedDocs(docs.data, manifest.docCount, getQuestion);
    const restored = openPackedIndex(
      { directory: directory.data, postings: postings.data },
      manifest.fingerprint,
      manifest.docCount,
      getDoc,
    );
    if (!restored) throw new Error("copilot prebuilt index does not match its manifest");
    const done = performance.now();
    console.info("[copilot] prebuilt index loaded", {
      ms: done - started, docs: manifest.docCount,
      docsReadMs: docs.ms, directoryReadMs: directory.ms, postingsReadMs: postings.ms,
      directoryDecodeMs: done - decodeStarted,
    });
    return restored;
  };

  let index: Promise<SearchIndex> | undefined;
  return {
    kind: "prebuilt",
    getQuestion,
    index: () => index ??= loadIndex().catch((error: unknown) => {
      index = undefined;
      throw error;
    }),
  };
}

function packDocs(docs: CorpusDoc[]): Buffer {
  const blockCount = Math.ceil(docs.length / DOCS_PER_BLOCK);
  const offsets = Buffer.alloc((blockCount + 1) * 4);
  const blocks: Buffer[] = [offsets];
  let offset = offsets.length;
  for (let block = 0; block < blockCount; block++) {
    offsets.writeUInt32LE(offset, block * 4);
    const start = block * DOCS_PER_BLOCK;
    const stored: StoredDoc[] = docs.slice(start, start + DOCS_PER_BLOCK).map((doc) => ({
      id: doc.id,
      kind: doc.kind,
      title: doc.title,
      url: doc.url,
      meta: doc.meta,
      textLength: doc.text.length,
      ...(doc.kind === "glossary" ? { text: doc.text } : {}),
    }));
    const packed = gzipSync(JSON.stringify(stored));
    blocks.push(packed);
    offset += packed.length;
  }
  offsets.writeUInt32LE(offset, blockCount * 4);
  return Buffer.concat(blocks, offset);
}

function openPackedDocs(data: Buffer, docCount: number, getQuestion: CopilotSource["getQuestion"]): SearchIndex["getDoc"] {
  const blockCount = Math.ceil(docCount / DOCS_PER_BLOCK);
  const headerBytes = (blockCount + 1) * 4;
  if (data.length < headerBytes || data.readUInt32LE(0) !== headerBytes ||
      data.readUInt32LE(blockCount * 4) !== data.length) {
    throw new Error("invalid copilot document directory");
  }
  const blocks = new Map<number, CorpusDoc[]>();
  const text = lazyTextDescriptor(getQuestion);
  return (docIdx) => {
    if (docIdx < 0 || docIdx >= docCount) throw new Error("invalid copilot document index");
    const blockId = Math.floor(docIdx / DOCS_PER_BLOCK);
    let block = blocks.get(blockId);
    if (!block) {
      const start = data.readUInt32LE(blockId * 4);
      const end = data.readUInt32LE((blockId + 1) * 4);
      if (start < headerBytes || end <= start || end > data.length) {
        throw new Error("invalid copilot document block range");
      }
      const stored = JSON.parse(gunzipSync(data.subarray(start, end)).toString("utf8")) as StoredDoc[];
      if (stored.length !== Math.min(DOCS_PER_BLOCK, docCount - blockId * DOCS_PER_BLOCK)) {
        throw new Error("copilot prebuilt document block count mismatch");
      }
      for (const doc of stored) {
        if (doc.text === undefined) Object.defineProperty(doc, "text", text);
      }
      block = stored as CorpusDoc[];
      if (blocks.size >= DOC_BLOCK_CACHE_SIZE) blocks.delete(blocks.keys().next().value!);
      blocks.set(blockId, block);
    }
    return block[docIdx % DOCS_PER_BLOCK];
  };
}

function lazyTextDescriptor(getQuestion: (id: string) => Question | undefined): PropertyDescriptor {
  return {
    enumerable: true,
    configurable: true,
    get(this: CorpusDoc): string {
      const question = getQuestion(this.id.replace(/^q:/, ""));
      const text = question ? buildQuestionDoc(question).text : "";
      Object.defineProperty(this, "text", { value: text, enumerable: true, writable: true, configurable: true });
      return text;
    },
  };
}
