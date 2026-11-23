// Build-time BM25 files. The directory contains the corpus-wide ranking statistics
// and byte ranges into the postings file. Each term's postings can be decoded
// independently, in the original document order.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { deserialize, serialize } from "node:v8";
import { deflateRawSync, gunzipSync, gzipSync, inflateRawSync } from "node:zlib";
import { indexFromArrays, type InvertedIndex, type SearchIndex } from "./retriever";
import { tokenize } from "./tokenize";
import type { CorpusDoc } from "./types";

export const COPILOT_PREBUILT_DIR = "generated/copilot";
export const INDEX_DIRECTORY_FILE = "index-directory.v8.gz";
export const INDEX_POSTINGS_FILE = "index-postings.bin";
const FORMAT_VERSION = 2;
const COMPRESS_AT_BYTES = 8192;
const POSTINGS_CACHE_BYTES = 8 * 1024 * 1024;

interface IndexFiles {
  directory: Buffer;
  postings: Buffer;
}

interface IndexDirectory {
  version: number;
  fingerprint: string;
  termIds: Map<string, number>;
  offsets: Uint32Array;
  byteOffsets: Uint32Array;
  docLen: Uint32Array;
  avgDocLen: number;
  glossaryDocIndices: number[];
}

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
  private buffer = Buffer.alloc(1 << 16);
  length = 0;

  private ensure(extra: number): void {
    if (this.length + extra <= this.buffer.length) return;
    const next = Buffer.allocUnsafe(Math.max(this.buffer.length * 2, this.length + extra));
    this.buffer.copy(next, 0, 0, this.length);
    this.buffer = next;
  }

  varint(value: number): void {
    this.ensure(5);
    while (value >= 0x80) {
      this.buffer[this.length++] = (value & 0x7f) | 0x80;
      value >>>= 7;
    }
    this.buffer[this.length++] = value;
  }

  append(bytes: Buffer): void {
    this.ensure(bytes.length);
    bytes.copy(this.buffer, this.length);
    this.length += bytes.length;
  }

  bytes(): Buffer {
    return this.buffer.subarray(0, this.length);
  }
}

export function serializeIndex(index: InvertedIndex, fingerprint = corpusFingerprint(index.docs)): IndexFiles {
  const term = new ByteWriter();
  const postings = new ByteWriter();
  const byteOffsets = new Uint32Array(index.offsets.length);
  for (let id = 0; id < index.termIds.size; id++) {
    term.length = 0;
    let previousDoc = 0;
    for (let p = index.offsets[id]; p < index.offsets[id + 1]; p++) {
      const doc = index.postingDocs[p];
      term.varint(doc - previousDoc);
      term.varint(index.postingTfs[p]);
      previousDoc = doc;
    }
    const raw = term.bytes();
    const compressed = raw.length >= COMPRESS_AT_BYTES;
    postings.varint(compressed ? 1 : 0);
    postings.append(compressed ? deflateRawSync(raw) : raw);
    if (postings.length > 0xffffffff) throw new Error("copilot postings file is too large");
    byteOffsets[id + 1] = postings.length;
  }
  const directory: IndexDirectory = {
    version: FORMAT_VERSION,
    fingerprint,
    termIds: index.termIds,
    offsets: index.offsets,
    byteOffsets,
    docLen: index.docLen,
    avgDocLen: index.avgDocLen,
    glossaryDocIndices: [...index.glossaryDocIndices],
  };
  return { directory: gzipSync(serialize(directory)), postings: postings.bytes() };
}

export function openPackedIndex(
  files: IndexFiles,
  fingerprint: string,
  docCount: number,
  getDoc: SearchIndex["getDoc"],
): SearchIndex | null {
  const directory = deserialize(gunzipSync(files.directory)) as IndexDirectory;
  if (directory.version !== FORMAT_VERSION || directory.fingerprint !== fingerprint ||
      directory.docLen.length !== docCount || directory.offsets.length !== directory.termIds.size + 1 ||
      directory.byteOffsets.length !== directory.offsets.length ||
      directory.byteOffsets[directory.termIds.size] !== files.postings.length) return null;
  const { termIds, offsets, byteOffsets, docLen, avgDocLen, glossaryDocIndices } = directory;

  const cached = new Map<number, ReturnType<SearchIndex["getPostings"]>>();
  let cachedBytes = 0;
  const getPostings = (termId: number) => {
    const hit = cached.get(termId);
    if (hit) {
      cached.delete(termId);
      cached.set(termId, hit);
      return hit;
    }

    const start = byteOffsets[termId];
    const end = byteOffsets[termId + 1];
    const length = offsets[termId + 1] - offsets[termId];
    const mode = files.postings[start];
    if (end <= start || length <= 0 || length > docCount || (mode !== 0 && mode !== 1)) {
      throw new Error("invalid copilot posting range");
    }
    const bytes = files.postings.subarray(start + 1, end);
    const raw = mode === 1 ? inflateRawSync(bytes, { maxOutputLength: length * 10 }) : bytes;
    const postings = decodePostings(raw, length, docCount);
    const size = postings.docs.byteLength + postings.tfs.byteLength;
    if (size <= POSTINGS_CACHE_BYTES) {
      while (cachedBytes + size > POSTINGS_CACHE_BYTES) {
        const [oldTerm, old] = cached.entries().next().value!;
        cachedBytes -= old.docs.byteLength + old.tfs.byteLength;
        cached.delete(oldTerm);
      }
      cached.set(termId, postings);
      cachedBytes += size;
    }
    return postings;
  };
  return { termIds, offsets, docLen, avgDocLen, glossaryDocIndices, getDoc, getPostings };
}

function decodePostings(raw: Buffer, length: number, docCount: number) {
  let cursor = 0;
  const readVarint = (): number => {
    if (cursor < raw.length) {
      const first = raw[cursor++];
      if (first < 0x80) return first;
      let result = first & 0x7f;
      for (let shift = 7; cursor < raw.length && shift <= 28; shift += 7) {
        const byte = raw[cursor++];
        if (shift === 28 && byte > 0x0f) break;
        result |= (byte & 0x7f) << shift;
        if (byte < 0x80) return result >>> 0;
      }
    }
    throw new Error("corrupt copilot index varint");
  };

  const docs = new Uint32Array(length);
  const tfs = new Uint32Array(length);
  let previousDoc = 0;
  for (let i = 0; i < length; i++) {
    previousDoc += readVarint();
    if (previousDoc >= docCount) throw new Error("invalid copilot posting document");
    docs[i] = previousDoc;
    tfs[i] = readVarint();
  }
  if (cursor !== raw.length) throw new Error("copilot posting length mismatch");
  return { docs, tfs };
}

export interface DeserializeOptions {
  fingerprint?: string;
  verifyTokenization?: boolean;
}

/** Dev may reuse an existing build, after checking it against current source text. */
export function deserializeIndex(
  files: IndexFiles,
  docs: CorpusDoc[],
  options: DeserializeOptions = {},
): InvertedIndex | null {
  const index = openPackedIndex(files, options.fingerprint ?? corpusFingerprint(docs), docs.length, (i) => docs[i]);
  if (!index) return null;
  const samples = options.verifyTokenization === false ? 0 : Math.min(docs.length, 16);
  for (let s = 0; s < samples; s++) {
    const i = Math.floor((s * docs.length) / samples);
    if (tokenize(docs[i].text).length !== index.docLen[i]) return null;
  }
  const postingCount = index.offsets[index.termIds.size];
  const postingDocs = new Uint32Array(postingCount);
  const postingTfs = new Uint32Array(postingCount);
  for (const id of index.termIds.values()) {
    const postings = index.getPostings(id);
    postingDocs.set(postings.docs, index.offsets[id]);
    postingTfs.set(postings.tfs, index.offsets[id]);
  }
  return indexFromArrays({
    termIds: index.termIds, offsets: index.offsets, docLen: index.docLen,
    avgDocLen: index.avgDocLen, docs, postingDocs, postingTfs,
  });
}

export function loadPrebuiltIndex(docs: CorpusDoc[]): InvertedIndex | null {
  const started = performance.now();
  try {
    const dir = join(process.cwd(), COPILOT_PREBUILT_DIR);
    const index = deserializeIndex({
      directory: readFileSync(join(dir, INDEX_DIRECTORY_FILE)),
      postings: readFileSync(join(dir, INDEX_POSTINGS_FILE)),
    }, docs);
    if (index) {
      console.info("[copilot] prebuilt index loaded", { ms: performance.now() - started, docs: docs.length });
    }
    return index;
  } catch (err) {
    console.warn("[copilot] prebuilt index unavailable; building at runtime", {
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}
