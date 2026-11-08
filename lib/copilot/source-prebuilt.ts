// ビルド時に書き出すコパイロット用ファイル（generated/copilot/）の読み書き。
//
//   manifest.json            版・コーパス指紋・件数
//   docs.json.gz             検索文書のメタ（問題文書の本文は持たず、問題から都度組み立てる）
//   index.bin                BM25 索引（index-artifact.ts の形式）
//   questions/NNN.json.gz    問題本体を ID のハッシュで 256 分割したもの
//
// 実行時に全問題データ（約 150MB の JS）を読まずに済ませるための仕組み。
// 書き出し側（scripts/build-copilot-index.ts）が、読み戻した結果とデータ本体からの
// 組み立て結果の一致を確かめてから書く。

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import type { Question } from "@/lib/questions/types";
import { buildQuestionDoc } from "./corpus-docs";
import { deserializeIndex, serializeIndex } from "./index-artifact";
import type { InvertedIndex } from "./retriever";
import type { CopilotSource } from "./source";
import type { CorpusDoc } from "./types";

export const COPILOT_PREBUILT_DIR = "generated/copilot";
const FORMAT_VERSION = 1;
const SHARD_COUNT = 256;

interface Manifest {
  version: number;
  fingerprint: string;
  shardCount: number;
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

function shardOf(id: string): number {
  // FNV-1a 32bit
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) % SHARD_COUNT;
}

function shardFile(dir: string, shard: number): string {
  return join(dir, "questions", `${String(shard).padStart(3, "0")}.json.gz`);
}

/** ビルド時: 問題・文書・索引を書き出す。 */
export function writePrebuiltCopilotFiles(
  rootDir: string,
  questions: readonly Question[],
  index: InvertedIndex,
  fingerprint: string,
): { bytes: number } {
  const dir = join(rootDir, COPILOT_PREBUILT_DIR);
  mkdirSync(join(dir, "questions"), { recursive: true });
  let bytes = 0;
  const write = (file: string, data: Uint8Array | string) => {
    writeFileSync(file, data);
    bytes += typeof data === "string" ? Buffer.byteLength(data) : data.length;
  };

  const shards: Record<string, Question>[] = Array.from({ length: SHARD_COUNT }, () => ({}));
  for (const q of questions) shards[shardOf(q.id)][q.id] = q;
  shards.forEach((shard, i) => write(shardFile(dir, i), gzipSync(JSON.stringify(shard), { level: 9 })));

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
    shardCount: SHARD_COUNT,
    questionCount: questions.length,
    docCount: docs.length,
  };
  write(join(dir, "manifest.json"), JSON.stringify(manifest));
  return { bytes };
}

function isManifest(value: unknown): value is Manifest {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return v.version === FORMAT_VERSION && typeof v.fingerprint === "string" &&
    v.shardCount === SHARD_COUNT && Number.isInteger(v.questionCount) && Number.isInteger(v.docCount);
}

/**
 * 書き出したファイルを開く。manifest が無い・版が違う場合は null（呼び出し側がデータ本体へ戻る）。
 * 索引・文書は index() の初回に、問題は該当シャードを初めて引いたときに読む。
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

  const shards = new Map<number, Map<string, Question>>();
  const getQuestion = (id: string): Question | undefined => {
    const shard = shardOf(id);
    let entries = shards.get(shard);
    if (!entries) {
      const parsed = JSON.parse(gunzipSync(readFileSync(shardFile(dir, shard))).toString("utf8")) as Record<string, Question>;
      entries = new Map(Object.entries(parsed));
      shards.set(shard, entries);
    }
    return entries.get(id);
  };

  let index: InvertedIndex | null = null;
  const loadIndex = (): InvertedIndex => {
    if (index) return index;
    const started = Date.now();
    const stored = JSON.parse(gunzipSync(readFileSync(join(dir, "docs.json.gz"))).toString("utf8")) as StoredDoc[];
    if (stored.length !== manifest.docCount) throw new Error("copilot prebuilt docs count mismatch");
    const docs = stored.map((s) => toCorpusDoc(s, getQuestion));
    // 索引と文書は同じビルドで書かれている。指紋は両ファイルの突き合わせに使う
    // （全文から計算し直すと全シャードを読むことになるため）。
    const restored = deserializeIndex(readFileSync(join(dir, "index.bin")), docs, {
      fingerprint: manifest.fingerprint,
      verifyTokenization: false,
    });
    if (!restored) throw new Error("copilot prebuilt index does not match its manifest");
    index = restored;
    console.info("[copilot] prebuilt index loaded", { ms: Date.now() - started, docs: docs.length });
    return index;
  };

  return { kind: "prebuilt", getQuestion, index: loadIndex };
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
