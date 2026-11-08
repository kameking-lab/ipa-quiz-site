import { tokenize, uniqueTokens } from "./tokenize";
import type { CorpusDoc, RetrievalCandidate } from "./types";
import { matchAliasGlossaryTerms } from "./aliases";

const BM25_K1 = 1.2;
const BM25_B = 0.75;

/**
 * BM25 用の転置インデックス。
 *
 * 14k+ 件 × 700 万ポスティング規模なので、ポスティング 1 件ごとに JS オブジェクトを
 * 作ると冷えたサーバの初回リクエストで数秒〜十数秒かかり、ヒープも 1GB 超に膨らむ。
 * そのためポスティングは型付き配列（CSR 形式）で持つ:
 *   term id t のポスティングは postingDocs/postingTfs の [offsets[t], offsets[t+1]) 区間。
 *   区間内の docIdx は昇順（= 旧実装の挿入順と同じ）で、スコアの加算順も変わらない。
 */
interface InvertedIndex {
  /** term -> term id（初出順） */
  termIds: Map<string, number>;
  /** term id -> ポスティング区間の開始位置。長さは term 数 + 1。 */
  offsets: Uint32Array;
  /** ポスティングの doc index（docs の添字）。 */
  postingDocs: Uint32Array;
  /** ポスティングの term frequency。 */
  postingTfs: Uint32Array;
  /** doc index -> doc length (token count) */
  docLen: Uint32Array;
  avgDocLen: number;
  docs: CorpusDoc[];
}

/** その語を含む文書数（BM25 の n）。未知語は 0。 */
export function documentFrequency(index: InvertedIndex, term: string): number {
  const id = index.termIds.get(term);
  return id === undefined ? 0 : index.offsets[id + 1] - index.offsets[id];
}

/** BM25 用の転置インデックスを構築する。 */
export function buildIndex(docs: CorpusDoc[]): InvertedIndex {
  const termIds = new Map<string, number>();
  const docLen = new Uint32Array(docs.length);
  let termFreqCounts: number[] = [];

  // (term id, doc index, tf) の三つ組をいったん平たく貯めてから、term id で
  // 安定な counting sort をかけて CSR に詰める。doc は昇順に処理するので、
  // 各 term の区間内も docIdx 昇順になる。
  let capacity = 1 << 16;
  let tripleTerm: Uint32Array = new Uint32Array(capacity);
  let tripleDoc: Uint32Array = new Uint32Array(capacity);
  let tripleTf: Uint32Array = new Uint32Array(capacity);
  let tripleCount = 0;

  let totalLen = 0;
  const tfMap = new Map<number, number>();
  for (let i = 0; i < docs.length; i++) {
    const tokens = tokenize(docs[i].text);
    docLen[i] = tokens.length;
    totalLen += tokens.length;
    tfMap.clear();
    for (const tok of tokens) {
      let id = termIds.get(tok);
      if (id === undefined) {
        id = termIds.size;
        termIds.set(tok, id);
        termFreqCounts.push(0);
      }
      tfMap.set(id, (tfMap.get(id) ?? 0) + 1);
    }
    if (tripleCount + tfMap.size > capacity) {
      while (tripleCount + tfMap.size > capacity) capacity *= 2;
      tripleTerm = growUint32(tripleTerm, capacity);
      tripleDoc = growUint32(tripleDoc, capacity);
      tripleTf = growUint32(tripleTf, capacity);
    }
    for (const [id, tf] of tfMap) {
      tripleTerm[tripleCount] = id;
      tripleDoc[tripleCount] = i;
      tripleTf[tripleCount] = tf;
      tripleCount++;
      termFreqCounts[id]++;
    }
  }

  const termCount = termIds.size;
  const offsets = new Uint32Array(termCount + 1);
  for (let t = 0; t < termCount; t++) offsets[t + 1] = offsets[t] + termFreqCounts[t];
  termFreqCounts = [];

  const cursor = offsets.slice(0, termCount);
  const postingDocs = new Uint32Array(tripleCount);
  const postingTfs = new Uint32Array(tripleCount);
  for (let k = 0; k < tripleCount; k++) {
    const p = cursor[tripleTerm[k]]++;
    postingDocs[p] = tripleDoc[k];
    postingTfs[p] = tripleTf[k];
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

function growUint32(arr: Uint32Array, capacity: number): Uint32Array {
  const next = new Uint32Array(capacity);
  next.set(arr);
  return next;
}

/**
 * BM25 によるスコアリング。
 * IDF は ln(1 + (N - n + 0.5) / (n + 0.5))（Robertson のスムージング版）。
 */
export function scoreBM25(
  index: InvertedIndex,
  queryTokens: string[],
): Map<number, number> {
  const scores = new Map<number, number>();
  const N = index.docs.length;
  if (N === 0) return scores;

  for (const qt of queryTokens) {
    const id = index.termIds.get(qt);
    if (id === undefined) continue;
    const start = index.offsets[id];
    const end = index.offsets[id + 1];
    const n = end - start;
    const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
    if (idf <= 0) continue;
    for (let p = start; p < end; p++) {
      const docIdx = index.postingDocs[p];
      const tf = index.postingTfs[p];
      const dl = index.docLen[docIdx];
      const denom =
        tf + BM25_K1 * (1 - BM25_B + (BM25_B * dl) / (index.avgDocLen || 1));
      const contribution = (idf * tf * (BM25_K1 + 1)) / (denom || 1);
      scores.set(docIdx, (scores.get(docIdx) ?? 0) + contribution);
    }
  }

  return scores;
}

/** 上位 k 件を返す。 */
export function retrieve(
  index: InvertedIndex,
  query: string,
  k: number,
): RetrievalCandidate[] {
  const qTokens = uniqueTokens(query);
  if (qTokens.length === 0) return [];
  const scores = scoreBM25(index, qTokens);
  const arr: RetrievalCandidate[] = [];
  for (const [docIdx, score] of scores) {
    arr.push({ doc: index.docs[docIdx], score });
  }
  arr.sort((a, b) => b.score - a.score);
  const top = arr.slice(0, k);

  // 用語集タイトル一致のドキュメントは BM25 top-k から漏れがちなので、
  // クエリトークンが title (用語名) と一致するものを「保険」として候補に足す。
  // 重複は排除する。
  const qSet = new Set(qTokens);
  const presentIds = new Set(top.map((c) => c.doc.id));
  for (let i = 0; i < index.docs.length; i++) {
    const doc = index.docs[i];
    if (doc.kind !== "glossary") continue;
    if (presentIds.has(doc.id)) continue;
    const titleNorm = doc.title
      .replace(/^用語集:\s*/, "")
      .replace(/\s*\(.*\)$/, "");
    const tTokens = uniqueTokens(titleNorm);
    if (tTokens.length === 0) continue;
    // タイトルトークンが全てクエリに含まれていれば強く採用、過半数で弱採用
    let hit = 0;
    for (const t of tTokens) {
      if (qSet.has(t)) hit++;
    }
    const ratio = hit / tTokens.length;
    if (ratio < 0.5) continue;
    // 同一 idx のスコアを引き上げる: BM25 top の最低スコアを下回らないよう base 値を足す
    const baseScore = scores.get(i) ?? 0;
    const floor = top.length > 0 ? top[top.length - 1].score : 1;
    top.push({ doc, score: Math.max(baseScore, floor * 0.5) });
    presentIds.add(doc.id);
  }

  // エイリアス一致による glossary ピン留め。
  // 「RSA 暗号の鍵長」「クロスサイトスクリプティング」など、
  // ユーザーが略称・俗称で呼ぶ用語を強制的に top に押し上げる。
  // タイトルトークン一致が取れない paraphrase クエリの主救済策。
  const aliasedTerms = matchAliasGlossaryTerms(query);
  if (aliasedTerms.size > 0) {
    const titleToTerm = new Map<string, string>();
    for (const term of aliasedTerms) titleToTerm.set(term, term);
    for (let i = 0; i < index.docs.length; i++) {
      const doc = index.docs[i];
      if (doc.kind !== "glossary") continue;
      if (presentIds.has(doc.id)) continue;
      const titleNorm = doc.title
        .replace(/^用語集:\s*/, "")
        .replace(/\s*\(.*\)$/, "");
      if (!titleToTerm.has(titleNorm)) continue;
      // BM25 top の中央値スコア相当をベースに採用。確実に top-5 に入る水準。
      const midScore = top.length > 0 ? top[Math.floor(top.length / 2)].score : 1;
      const baseScore = scores.get(i) ?? 0;
      top.push({ doc, score: Math.max(baseScore, midScore) });
      presentIds.add(doc.id);
    }
  }

  // 並び替えなおして再度 k に切る
  top.sort((a, b) => b.score - a.score);
  return top.slice(0, k + 5); // 用語集ピン留め分のため少し余裕を持たせて返す
}

/**
 * クエリトークンの IDF の最大値を返す。
 * 「クエリがそもそも識別力のあるトークンを 1 つも持っていない」状態を検出するために使う。
 * 雑談クエリ（"勉強のやる気が出ません" など）は CJK 高頻出バイグラムだけになりがちで、
 * max IDF が低くなる。これでチットチャットを切り分ける。
 */
export function maxQueryIdf(index: InvertedIndex, query: string): number {
  const qTokens = uniqueTokens(query);
  if (qTokens.length === 0 || index.docs.length === 0) return 0;
  const N = index.docs.length;
  let maxIdf = 0;
  for (const t of qTokens) {
    const n = documentFrequency(index, t);
    if (n === 0) {
      // 未知語: 全文書中 0 件。Robertson の式では非常に高い IDF を返すが、
      // 「文書に出現しない」ので結局スコアに寄与しない。スキップ。
      continue;
    }
    const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
    if (idf > maxIdf) maxIdf = idf;
  }
  return maxIdf;
}

// ─────────────────────────────────────────────────────────────
// プロセス内シングルトン: 初回 retrieve で lazy build される
// ─────────────────────────────────────────────────────────────

let CACHED_INDEX: InvertedIndex | null = null;

/**
 * プロセス内でキャッシュされた index を取得（無ければ構築）。
 * `loadPrebuilt` を渡すと、ビルド時に作った索引を先に試し、使えない（無い・
 * コーパスと食い違う）ときだけ実行時に構築する。
 * テストで個別 index を使いたい場合は buildIndex を直接呼ぶ。
 */
export function getCachedIndex(
  getDocs: () => CorpusDoc[],
  loadPrebuilt?: (docs: CorpusDoc[]) => InvertedIndex | null,
): InvertedIndex {
  if (CACHED_INDEX) return CACHED_INDEX;
  const docs = getDocs();
  CACHED_INDEX = loadPrebuilt?.(docs) ?? buildIndex(docs);
  return CACHED_INDEX;
}

export function resetIndexCache(): void {
  CACHED_INDEX = null;
}

export type { InvertedIndex };
