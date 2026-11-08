// ビルド時に作った BM25 索引をファイルに書き出し、実行時は読むだけにするための仕組み。
//
// 背景: 冷えたサーバの初回コパイロット要求で、全問題（3.6 万文書・700 万ポスティング）
// の索引を組み立てていた。本番の冷えた状態では最初の文字が出るまで約 25 秒かかり、
// 大半がこの組み立てだった。索引はデータが同じなら毎回同じなので、ビルド時に作る。
//
// 形式（全体を gzip）:
//   "CPIX" | version(u32) | headerLen(u32) | header(JSON) | terms(UTF-8, "\n" 区切り)
//   | docLen(varint) | 語ごとのポスティング数(varint) | ポスティング(docIdx 差分 varint, tf varint)
//
// 安全側の設計: ファイルが無い・壊れている・今のコーパスと食い違う場合は null を返し、
// 呼び出し側は従来どおり実行時に構築する（検索結果は同じで、遅いだけ）。

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import { tokenize } from "./tokenize";
import type { InvertedIndex } from "./retriever";
import type { CorpusDoc } from "./types";

const MAGIC = "CPIX";
const FORMAT_VERSION = 1;

/** リポジトリ直下からの相対パス。next.config.ts の outputFileTracingIncludes と揃える。 */
export const COPILOT_INDEX_RELATIVE_PATH = "generated/copilot-index.bin";

interface ArtifactHeader {
  fingerprint: string;
  docCount: number;
  termCount: number;
  postingCount: number;
  termsBytes: number;
  docLenBytes: number;
  countsBytes: number;
  postingsBytes: number;
}

/** コーパスの中身（ID と本文）から決まる指紋。データが変われば索引は使わない。 */
export function corpusFingerprint(docs: readonly CorpusDoc[]): string {
  const hash = createHash("sha256");
  for (const doc of docs) {
    hash.update(doc.id);
    hash.update("\u0000");
    hash.update(doc.text);
    hash.update("\u0001");
  }
  return hash.digest("hex");
}

class ByteWriter {
  private buf = new Uint8Array(1 << 20);
  length = 0;

  private ensure(extra: number): void {
    if (this.length + extra <= this.buf.length) return;
    let cap = this.buf.length;
    while (this.length + extra > cap) cap *= 2;
    const next = new Uint8Array(cap);
    next.set(this.buf.subarray(0, this.length));
    this.buf = next;
  }

  varint(value: number): void {
    this.ensure(5);
    let v = value >>> 0;
    while (v >= 0x80) {
      this.buf[this.length++] = (v & 0x7f) | 0x80;
      v >>>= 7;
    }
    this.buf[this.length++] = v;
  }

  bytes(): Uint8Array {
    return this.buf.subarray(0, this.length);
  }
}

function u32(value: number): Uint8Array {
  const out = new Uint8Array(4);
  new DataView(out.buffer).setUint32(0, value, true);
  return out;
}

/** 索引を gzip 済みのバイト列にする（ビルド時に使う）。 */
export function serializeIndex(index: InvertedIndex): Uint8Array {
  const termCount = index.termIds.size;
  const terms: string[] = new Array(termCount);
  for (const [term, id] of index.termIds) terms[id] = term;
  const termsBytes = new TextEncoder().encode(terms.join("\n"));

  const docLen = new ByteWriter();
  for (let i = 0; i < index.docLen.length; i++) docLen.varint(index.docLen[i]);

  const counts = new ByteWriter();
  const postings = new ByteWriter();
  for (let t = 0; t < termCount; t++) {
    const start = index.offsets[t];
    const end = index.offsets[t + 1];
    counts.varint(end - start);
    let prev = 0;
    for (let p = start; p < end; p++) {
      const docIdx = index.postingDocs[p];
      postings.varint(docIdx - prev);
      postings.varint(index.postingTfs[p]);
      prev = docIdx;
    }
  }

  const header: ArtifactHeader = {
    fingerprint: corpusFingerprint(index.docs),
    docCount: index.docs.length,
    termCount,
    postingCount: index.postingDocs.length,
    termsBytes: termsBytes.length,
    docLenBytes: docLen.length,
    countsBytes: counts.length,
    postingsBytes: postings.length,
  };
  const headerBytes = new TextEncoder().encode(JSON.stringify(header));
  const parts = [
    new TextEncoder().encode(MAGIC),
    u32(FORMAT_VERSION),
    u32(headerBytes.length),
    headerBytes,
    termsBytes,
    docLen.bytes(),
    counts.bytes(),
    postings.bytes(),
  ];
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const raw = new Uint8Array(total);
  let pos = 0;
  for (const part of parts) {
    raw.set(part, pos);
    pos += part.length;
  }
  return gzipSync(raw, { level: 9 });
}

function isArtifactHeader(value: unknown): value is ArtifactHeader {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.fingerprint === "string" &&
    ["docCount", "termCount", "postingCount", "termsBytes", "docLenBytes", "countsBytes", "postingsBytes"]
      .every((key) => Number.isInteger(v[key]) && (v[key] as number) >= 0);
}

/**
 * gzip 済みバイト列から索引を復元する。`docs` は今のコーパス（getCorpus() の結果）。
 * 指紋・件数・トークン化の抜き取り検査のどれかが合わなければ null。
 */
export function deserializeIndex(
  gz: Uint8Array,
  docs: CorpusDoc[],
  fingerprint: string = corpusFingerprint(docs),
): InvertedIndex | null {
  const raw = gunzipSync(gz);
  const view = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
  if (raw.length < 12 || new TextDecoder().decode(raw.subarray(0, 4)) !== MAGIC) return null;
  if (view.getUint32(4, true) !== FORMAT_VERSION) return null;
  const headerLen = view.getUint32(8, true);
  let pos = 12;
  const parsed: unknown = JSON.parse(new TextDecoder().decode(raw.subarray(pos, pos + headerLen)));
  pos += headerLen;
  if (!isArtifactHeader(parsed)) return null;
  const header = parsed;
  if (header.docCount !== docs.length || header.fingerprint !== fingerprint) return null;
  if (pos + header.termsBytes + header.docLenBytes + header.countsBytes + header.postingsBytes !== raw.length) return null;

  const termsText = new TextDecoder().decode(raw.subarray(pos, pos + header.termsBytes));
  pos += header.termsBytes;
  const terms = header.termCount === 0 ? [] : termsText.split("\n");
  if (terms.length !== header.termCount) return null;
  const termIds = new Map<string, number>();
  for (let t = 0; t < terms.length; t++) termIds.set(terms[t], t);

  let cursor = pos;
  const readVarint = (): number => {
    let result = 0;
    let shift = 0;
    for (;;) {
      if (cursor >= raw.length || shift > 28) throw new Error("corrupt copilot index varint");
      const byte = raw[cursor++];
      result += (byte & 0x7f) * 2 ** shift;
      if (byte < 0x80) return result;
      shift += 7;
    }
  };

  const docLen = new Uint32Array(header.docCount);
  let totalLen = 0;
  for (let i = 0; i < header.docCount; i++) {
    docLen[i] = readVarint();
    totalLen += docLen[i];
  }
  if (cursor !== pos + header.docLenBytes) return null;
  pos = cursor;

  const offsets = new Uint32Array(header.termCount + 1);
  for (let t = 0; t < header.termCount; t++) offsets[t + 1] = offsets[t] + readVarint();
  if (cursor !== pos + header.countsBytes || offsets[header.termCount] !== header.postingCount) return null;

  const postingDocs = new Uint32Array(header.postingCount);
  const postingTfs = new Uint32Array(header.postingCount);
  for (let t = 0; t < header.termCount; t++) {
    let prev = 0;
    for (let p = offsets[t]; p < offsets[t + 1]; p++) {
      prev += readVarint();
      postingDocs[p] = prev;
      postingTfs[p] = readVarint();
    }
  }
  if (cursor !== raw.length) return null;

  // トークナイザが変わったのに古い索引が残っている場合を、抜き取りで検出する。
  const samples = Math.min(docs.length, 16);
  for (let s = 0; s < samples; s++) {
    const i = Math.floor((s * docs.length) / samples);
    if (tokenize(docs[i].text).length !== docLen[i]) return null;
  }

  return {
    termIds,
    offsets,
    postingDocs,
    postingTfs,
    docLen,
    avgDocLen: docs.length === 0 ? 0 : totalLen / docs.length,
    docs,
  };
}

/**
 * ビルド時に作った索引を読む。使えなければ null（呼び出し側が実行時に構築する）。
 * 失敗しても例外は投げない: 索引が無くてもコパイロットは動く（遅いだけ）。
 */
export function loadPrebuiltIndex(docs: CorpusDoc[]): InvertedIndex | null {
  const started = Date.now();
  try {
    const file = join(process.cwd(), COPILOT_INDEX_RELATIVE_PATH);
    if (!existsSync(file)) {
      console.warn("[copilot] prebuilt index missing; building at runtime");
      return null;
    }
    const index = deserializeIndex(readFileSync(file), docs);
    if (!index) {
      console.warn("[copilot] prebuilt index does not match the corpus; building at runtime");
      return null;
    }
    console.info("[copilot] prebuilt index loaded", { ms: Date.now() - started, docs: docs.length });
    return index;
  } catch (err) {
    console.warn("[copilot] prebuilt index unreadable; building at runtime", {
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}
