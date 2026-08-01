import { getAllQuestions } from "@/lib/questions/load";
import { GLOSSARY } from "@/data/glossary";
import { getSafePdfUrl } from "@/lib/exam-config";
import { examLabel, formatYearSeason } from "@/lib/utils";
import type { ExamCode, Question, Season } from "@/lib/questions/types";
import type { RerankedCandidate } from "./types";

/**
 * クライアントに渡される構造化 citation。
 * 既存の markdown footer（[1] [title](url) 形式）に加えて、
 * 試験区分・年度・問題番号・カテゴリなどのリッチメタを 1 オブジェクトに同梱する。
 *
 * 引用カード UI / 「根拠を確認」モーダル / 関連問題ピックアップ の入力に使う。
 */
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

const SNIPPET_MAX_LEN = 320;

function shortenSnippet(text: string): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= SNIPPET_MAX_LEN) return trimmed;
  return `${trimmed.slice(0, SNIPPET_MAX_LEN)}…`;
}

function questionById(id: string): Question | undefined {
  return getAllQuestions().find((q) => q.id === id);
}

function glossaryByTerm(term: string) {
  return GLOSSARY.find((g) => g.term === term);
}

/**
 * RerankedCandidate[] を CitationMeta[] に変換する。
 * 問題系の citation には Question を逆引きしてメタを充填し、
 * クライアント側で別タブ open / モーダルプレビューを実装できるようにする。
 */
export function buildCitationMetas(
  passages: RerankedCandidate[],
): CitationMeta[] {
  return passages.map((p, i) => {
    const ordinal = i + 1;
    if (p.doc.kind === "question") {
      const questionId = p.doc.id.replace(/^q:/, "");
      const q = questionById(questionId);
      const meta: CitationMeta = {
        ordinal,
        docId: p.doc.id,
        kind: "question",
        title: p.doc.title,
        url: p.doc.url,
        // Gate through getSafePdfUrl so a decommissioned jitec 出典 (dead for
        // ~13k questions) degrades to the live IPA index, never a dead link in
        // a copilot citation card. Fall back to the internal /q url otherwise.
        fullSourceUrl: q?.sourcePdfUrl ? getSafePdfUrl(q.sourcePdfUrl) : p.doc.url,
        snippet: shortenSnippet(q?.explanation ?? p.doc.text),
        score: p.score,
        rerankScore: p.rerankScore,
        question: q
          ? {
              questionId: q.id,
              exam: q.exam,
              examLabel: examLabel(q.exam),
              year: q.year,
              season: q.season,
              yearSeasonLabel: formatYearSeason(q.year, q.season),
              qNumber: q.qNumber,
              category: q.category,
            }
          : undefined,
      };
      return meta;
    }
    const term = p.doc.id.replace(/^g:/, "");
    const g = glossaryByTerm(term);
    const meta: CitationMeta = {
      ordinal,
      docId: p.doc.id,
      kind: "glossary",
      title: p.doc.title,
      url: p.doc.url,
      fullSourceUrl: p.doc.url,
      snippet: shortenSnippet(g?.detail ?? g?.short ?? p.doc.text),
      score: p.score,
      rerankScore: p.rerankScore,
      glossary: g
        ? {
            term: g.term,
            english: g.english,
            category: g.category,
          }
        : undefined,
    };
    return meta;
  });
}

/**
 * CitationMeta[] を HTTP ヘッダ送信用に base64(JSON(UTF-8)) でエンコードする。
 * ヘッダは ASCII のみ許容なので、日本語タイトルが入っても落ちないようエンコードする。
 */
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
