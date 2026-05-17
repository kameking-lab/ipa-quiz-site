import type { LLMProvider } from "@/lib/ai/provider";
import { tokenize, uniqueTokens } from "./tokenize";
import type { RerankedCandidate, RetrievalCandidate } from "./types";

interface RerankContext {
  /** 現在ユーザーが見ている問題のタグ・カテゴリ。一致する候補をブースト。 */
  currentCategory?: string;
  currentTopicTags?: string[];
  currentExam?: string;
}

/**
 * 用語集タイトル（"ACID" や "B木 / B+木"）が query にトークンレベルで含まれる場合、
 * 当該 glossary 候補に「タイトル一致ボーナス」を返す。
 * - 完全一致（query が用語タイトルそのものを含む）: 1.0 を返す
 * - 部分一致: タイトルトークンの重複率を返す
 * - 一致なし: 0
 */
function glossaryTitleMatchRatio(query: string, title: string): number {
  // タイトルは "用語集: ACID (Atomicity, ...)" 形式。プレフィックスを除く。
  const stripped = title.replace(/^用語集:\s*/, "").replace(/\s*\(.*\)$/, "");
  const titleTokens = uniqueTokens(stripped);
  if (titleTokens.length === 0) return 0;
  const queryTokens = new Set(uniqueTokens(query));
  let hit = 0;
  for (const t of titleTokens) {
    if (queryTokens.has(t)) hit++;
  }
  return hit / titleTokens.length;
}

/**
 * 決定的（LLM 非依存）リランカー。
 * BM25 スコアに以下のブーストを足す:
 *   - 現在の問題のカテゴリと一致: +20%
 *   - 現在の問題のタグと一致（1 つにつき）: +5%（最大 +20%）
 *   - 用語集: ベース +50%、タイトル一致時はさらに最大 +400%（用語定義を最優先）
 *   - text が極端に長い候補は軽くペナルティ（密度向上）
 *
 * `query` を渡すと、用語集タイトル一致ボーナスが効く。
 * route.ts からは query 込みで呼ぶこと。
 */
export function deterministicRerank(
  candidates: RetrievalCandidate[],
  ctx: RerankContext,
  topN: number,
  query?: string,
): RerankedCandidate[] {
  const reranked: RerankedCandidate[] = candidates.map((c) => {
    let mult = 1.0;
    const meta = c.doc.meta;
    if (ctx.currentCategory && meta.category === ctx.currentCategory) {
      mult *= 1.2;
    }
    if (ctx.currentTopicTags && meta.topicTags) {
      const overlap = ctx.currentTopicTags.filter((t) =>
        meta.topicTags!.includes(t),
      ).length;
      mult *= 1 + Math.min(overlap, 4) * 0.05;
    }
    if (c.doc.kind === "glossary") {
      mult *= 1.5;
      if (query) {
        const ratio = glossaryTitleMatchRatio(query, c.doc.title);
        // 完全一致なら 5x、半分一致でも 3x のブースト。用語定義は最優先。
        if (ratio > 0) {
          mult *= 1 + 4 * ratio;
        }
      }
    }
    const textLen = c.doc.text.length;
    if (textLen > 4000) mult *= 0.92;
    return { ...c, rerankScore: c.score * mult };
  });
  reranked.sort((a, b) => b.rerankScore - a.rerankScore);
  return reranked.slice(0, topN);
}

/**
 * LLM ベースのリランカー（opt-in）。
 * 候補に通し番号を振り、LLM に「最も関連する 3 件の番号」を返させる。
 * 失敗時は deterministic にフォールバック。
 */
export async function llmRerank(
  query: string,
  candidates: RetrievalCandidate[],
  topN: number,
  provider: LLMProvider,
  ctx: RerankContext,
  signal?: AbortSignal,
): Promise<RerankedCandidate[]> {
  if (candidates.length === 0) return [];

  const lines: string[] = [];
  candidates.forEach((c, i) => {
    const snippet = c.doc.text.slice(0, 240).replace(/\s+/g, " ");
    lines.push(`[${i}] ${c.doc.title} -- ${snippet}`);
  });

  const system =
    "あなたは検索結果ランカーです。ユーザーのクエリに最も関連する候補の番号を、" +
    "関連度の高い順にカンマ区切りで返してください。説明文・前置き・コードブロックは禁止。" +
    `応答は最大 ${topN} 個の整数番号のみ（例: 3,1,7）。`;

  const userPrompt = [
    `クエリ: ${query}`,
    `候補:\n${lines.join("\n")}`,
    `関連度の高い順に最大 ${topN} 個の番号を返してください。`,
  ].join("\n\n");

  let raw = "";
  try {
    for await (const chunk of provider.streamChat({
      system,
      messages: [{ role: "user", content: userPrompt }],
      maxTokens: 64,
      temperature: 0,
      signal,
    })) {
      raw += chunk;
    }
  } catch {
    return deterministicRerank(candidates, ctx, topN);
  }

  const picked: number[] = [];
  for (const m of raw.match(/\d+/g) ?? []) {
    const n = Number(m);
    if (Number.isInteger(n) && n >= 0 && n < candidates.length && !picked.includes(n)) {
      picked.push(n);
      if (picked.length >= topN) break;
    }
  }
  if (picked.length === 0) {
    return deterministicRerank(candidates, ctx, topN);
  }

  // BM25 スコアと LLM 順位を合わせて rerankScore を再構成する
  // （上から線形に減衰させ、deterministic boost も少しだけ足す）
  const det = deterministicRerank(candidates, ctx, candidates.length);
  const detMap = new Map(det.map((d) => [d.doc.id, d.rerankScore]));
  return picked.map((idx, rank) => {
    const c = candidates[idx];
    const detScore = detMap.get(c.doc.id) ?? c.score;
    return {
      ...c,
      rerankScore: (topN - rank) * 10 + detScore * 0.01,
    };
  });
}

// 質問テキストに対する簡易な「クエリ用語」の補強。
// 現在閲覧中の問題のタグ／カテゴリをクエリに連結し、retrieve の精度を上げる。
export function buildRetrievalQuery(
  userMessage: string,
  ctx: RerankContext,
): string {
  const parts = [userMessage];
  if (ctx.currentCategory) parts.push(ctx.currentCategory);
  if (ctx.currentTopicTags?.length) parts.push(ctx.currentTopicTags.join(" "));
  return parts.join(" ");
}

/** クエリトークンが空（記号のみメッセージなど）かどうかの判定。 */
export function isQueryRetrievable(query: string): boolean {
  return tokenize(query).length > 0;
}

export type { RerankContext };
