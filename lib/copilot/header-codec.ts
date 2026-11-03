import type { ExamCode, Season } from "@/lib/questions/types";

export interface CitationMeta {
  /** 表示順の通し番号（[1] に対応）。 */
  ordinal: number;
  /** corpus doc ID（`q:<id>` or `g:<term>`）。 */
  docId: string;
  kind: "question" | "glossary";
  /** UI 表示用のタイトル。corpus.title と同じ。 */
  title: string;
  /** クリック先 URL（新規タブで開く）。 */
  url: string;
  /** モーダルに表示する短いプレビュー本文（最大 320 文字）。 */
  snippet: string;
  /** モーダルの「全文を見る」リンク先（基本 url と同じ）。 */
  fullSourceUrl: string;
  /** BM25 スコアと rerankScore（デバッグ・並び替え用）。 */
  score: number;
  rerankScore: number;
  /** 問題引用のときのみセットされるメタ。 */
  question?: {
    questionId: string;
    exam: ExamCode;
    examLabel: string;
    year: number;
    season: Season;
    yearSeasonLabel: string;
    qNumber: number;
    category: string;
  };
  /** 用語集引用のときのみセットされるメタ。 */
  glossary?: {
    term: string;
    english?: string;
    category?: string;
  };
}


export function encodeCitationsHeader(metas: CitationMeta[]): string {
  if (metas.length === 0) return "";
  const json = JSON.stringify(metas);
  // Node.js runtime 想定: Buffer 使用。Edge runtime でも Buffer は polyfill されている。
  return Buffer.from(json, "utf8").toString("base64");
}

/** クライアント側で X-RAG-Citations ヘッダを CitationMeta[] に戻す。 */
export function decodeCitationsHeader(header: string | null): CitationMeta[] {
  if (!header) return [];
  try {
    const json =
      typeof atob === "function"
        ? decodeURIComponent(
            Array.prototype.map
              .call(atob(header), (c: string) =>
                `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`,
              )
              .join(""),
          )
        : Buffer.from(header, "base64").toString("utf8");
    const parsed = JSON.parse(json) as CitationMeta[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}


export interface RelatedQuestion {
  questionId: string;
  exam: ExamCode;
  examLabel: string;
  year: number;
  season: Season;
  yearSeasonLabel: string;
  qNumber: number;
  category: string;
  /** 問題文の冒頭プレビュー（180 文字）。 */
  preview: string;
  /** 問題ページ URL（正規の indexable な静的 /q/* ページ）。 */
  url: string;
  /** BM25 スコア（並び順保持用）。 */
  score: number;
}


export function encodeRelatedHeader(items: RelatedQuestion[]): string {
  if (items.length === 0) return "";
  const json = JSON.stringify(items);
  return Buffer.from(json, "utf8").toString("base64");
}

/** クライアント側で X-Related-Questions ヘッダを RelatedQuestion[] に戻す。 */
export function decodeRelatedHeader(header: string | null): RelatedQuestion[] {
  if (!header) return [];
  try {
    const json =
      typeof atob === "function"
        ? decodeURIComponent(
            Array.prototype.map
              .call(atob(header), (c: string) =>
                `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`,
              )
              .join(""),
          )
        : Buffer.from(header, "base64").toString("utf8");
    const parsed = JSON.parse(json) as RelatedQuestion[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}
