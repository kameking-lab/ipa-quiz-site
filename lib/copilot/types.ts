import type { ExamCode } from "@/lib/questions/types";

/** RAG コーパスに乗る最小単位。 */
export interface CorpusDoc {
  /** ユニークな doc ID。`q:` プレフィックスは Question、`g:` は GlossaryTerm。 */
  id: string;
  kind: "question" | "glossary";
  /** UI 表示用の短いタイトル。例: "AP 2023 秋 問15 / トランザクション" */
  title: string;
  /** 出典として表示する URL。 */
  url: string;
  /** BM25 で検索対象になる本文（タイトル + 本文 + 解説 + タグを統合）。 */
  text: string;
  /** リランク・フィルタで使うメタ情報。 */
  meta: {
    exam?: ExamCode;
    category?: string;
    topicTags?: string[];
    year?: number;
  };
}

/** retriever が返す候補。 */
export interface RetrievalCandidate {
  doc: CorpusDoc;
  /** BM25 スコア。 */
  score: number;
}

/** reranker 出力。元の BM25 score とは別軸の rerankScore を持つ。 */
export interface RerankedCandidate extends RetrievalCandidate {
  rerankScore: number;
}

/** rag.ts の最終出力。route.ts はこれを使ってプロンプトを組み立てる。 */
export interface RAGResult {
  /** 採用された出典（top-N）。空配列の場合は citation を出さない。 */
  passages: RerankedCandidate[];
  /** BM25 top-1 score。citation 表示しきい値判定に使う。 */
  topScore: number;
  /** どのリランカーが動いたか。eval ログ用。 */
  rerankerUsed: "deterministic" | "llm" | "none";
}
