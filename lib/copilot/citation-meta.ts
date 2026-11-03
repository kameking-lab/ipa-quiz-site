import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import "server-only";
import type { CitationMeta } from "./header-codec";
import { getAllQuestions } from "@/lib/questions/load";
import { GLOSSARY } from "@/data/glossary";
import { getSafePdfUrl } from "@/lib/exam-config";
import type { Question } from "@/lib/questions/types";
import type { RerankedCandidate } from "./types";

/**
 * クライアントに渡される構造化 citation。
 * 既存の markdown footer（[1] [title](url) 形式）に加えて、
 * 試験区分・年度・問題番号・カテゴリなどのリッチメタを 1 オブジェクトに同梱する。
 *
 * 引用カード UI / 「根拠を確認」モーダル / 関連問題ピックアップ の入力に使う。
 */

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
              examLabel: questionSourceExam(q),
              year: q.year,
              season: q.season,
              yearSeasonLabel: questionSourceEdition(q),
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

export { encodeCitationsHeader, decodeCitationsHeader } from "./header-codec";
export type { CitationMeta } from "./header-codec";
