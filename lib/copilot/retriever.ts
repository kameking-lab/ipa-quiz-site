import { tokenize, uniqueTokens } from "./tokenize";
import type { CorpusDoc, RetrievalCandidate } from "./types";
import { matchAliasGlossaryTerms } from "./aliases";

const BM25_K1 = 1.2;
const BM25_B = 0.75;

interface InvertedIndex {
  /** term -> postings (doc index in docs, term frequency in that doc) */
  postings: Map<string, Array<{ docIdx: number; tf: number }>>;
  /** doc index -> doc length (token count) */
  docLen: number[];
  avgDocLen: number;
  docs: CorpusDoc[];
}

/** BM25 用の転置インデックスを構築する。 */
export function buildIndex(docs: CorpusDoc[]): InvertedIndex {
  const postings = new Map<string, Map<number, number>>();
  const docLen: number[] = new Array(docs.length);

  let totalLen = 0;
  for (let i = 0; i < docs.length; i++) {
    const tokens = tokenize(docs[i].text);
    docLen[i] = tokens.length;
    totalLen += tokens.length;
    const tfMap = new Map<string, number>();
    for (const tok of tokens) {
      tfMap.set(tok, (tfMap.get(tok) ?? 0) + 1);
    }
    for (const [tok, tf] of tfMap) {
      let docMap = postings.get(tok);
      if (!docMap) {
        docMap = new Map();
        postings.set(tok, docMap);
      }
      docMap.set(i, tf);
    }
  }

  const flatPostings = new Map<string, Array<{ docIdx: number; tf: number }>>();
  for (const [tok, docMap] of postings) {
    flatPostings.set(
      tok,
      [...docMap.entries()].map(([docIdx, tf]) => ({ docIdx, tf })),
    );
  }

  return {
    postings: flatPostings,
    docLen,
    avgDocLen: docs.length === 0 ? 0 : totalLen / docs.length,
    docs,
  };
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
    const postings = index.postings.get(qt);
    if (!postings) continue;
    const n = postings.length;
    const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
    if (idf <= 0) continue;
    for (const { docIdx, tf } of postings) {
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
    const postings = index.postings.get(t);
    if (!postings) {
      // 未知語: 全文書中 0 件。Robertson の式では非常に高い IDF を返すが、
      // 「文書に出現しない」ので結局スコアに寄与しない。スキップ。
      continue;
    }
    const n = postings.length;
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
 * テストで個別 index を使いたい場合は buildIndex を直接呼ぶ。
 */
export function getCachedIndex(getDocs: () => CorpusDoc[]): InvertedIndex {
  if (CACHED_INDEX) return CACHED_INDEX;
  CACHED_INDEX = buildIndex(getDocs());
  return CACHED_INDEX;
}

export function resetIndexCache(): void {
  CACHED_INDEX = null;
}

export type { InvertedIndex };
