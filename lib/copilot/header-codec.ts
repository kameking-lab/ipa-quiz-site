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


// Buffer を使わない（ブラウザ側のデコードでも読み込まれるため、Buffer を参照すると
// 約 30KB の Buffer ポリフィルが問題ページの JS に同梱されてしまう）。
// btoa/atob と TextEncoder/TextDecoder は Node 18+ とブラウザの両方にある。
function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function base64ToUtf8(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export function encodeCitationsHeader(metas: CitationMeta[]): string {
  if (metas.length === 0) return "";
  const json = JSON.stringify(metas);
  return utf8ToBase64(json);
}

/** クライアント側で X-RAG-Citations ヘッダを CitationMeta[] に戻す。 */
export function decodeCitationsHeader(header: string | null): CitationMeta[] {
  if (!header) return [];
  try {
    const json = base64ToUtf8(header);
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
  return utf8ToBase64(json);
}

/** クライアント側で X-Related-Questions ヘッダを RelatedQuestion[] に戻す。 */
export function decodeRelatedHeader(header: string | null): RelatedQuestion[] {
  if (!header) return [];
  try {
    const json = base64ToUtf8(header);
    const parsed = JSON.parse(json) as RelatedQuestion[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}
