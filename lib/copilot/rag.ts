import type { LLMProvider } from "@/lib/ai/provider";
import type { Question } from "@/lib/questions/types";
import { getCorpus } from "./corpus";
import { getCachedIndex, maxQueryIdf, retrieve } from "./retriever";
import {
  buildRetrievalQuery,
  deterministicRerank,
  isQueryRetrievable,
  llmRerank,
  type RerankContext,
} from "./reranker";
import type { RAGResult } from "./types";

export interface RAGRunInput {
  /** 直近のユーザー発話。 */
  userMessage: string;
  /** 閲覧中の問題（あれば）。category / tags をリランクに使う。 */
  question?: Question | null;
  /** 既存のクイックアクション識別子（あれば）。 */
  quickAction?: string | null;
  /** 検索候補数 (BM25 top-K)。 */
  topK?: number;
  /** 最終的に system prompt に注入する数。 */
  topN?: number;
  /** LLM rerank を使うかどうか（環境変数 default false）。 */
  useLLMRerank?: boolean;
  /** LLM rerank 用 provider（useLLMRerank=true のとき必須）。 */
  rerankerProvider?: LLMProvider;
  /** abort 用 signal。 */
  signal?: AbortSignal;
}

/** RAG 不要なクイックアクション（雑談・モチベ系 / 既に問題コンテキストで足りる系）。 */
const NON_KNOWLEDGE_QUICK_ACTIONS = new Set<string>([
  "socratic",
  // 注: simplify/detailed/term/analyze-* なども問題コンテキスト中心だが、
  // 用語の交差説明には他問題の解説が有効なので RAG は走らせる。
]);

/**
 * RAG パイプラインのエントリーポイント。
 * 既存ルートはこれを呼んで RAGResult を取り、無ければ既存挙動にフォールバック。
 */
export async function runRAG(input: RAGRunInput): Promise<RAGResult> {
  const topK = input.topK ?? readNumEnv("COPILOT_RAG_TOP_K", 10);
  const topN = input.topN ?? readNumEnv("COPILOT_RAG_TOP_N", 3);

  if (
    input.quickAction &&
    NON_KNOWLEDGE_QUICK_ACTIONS.has(input.quickAction)
  ) {
    return { passages: [], topScore: 0, rerankerUsed: "none" };
  }

  if (!isQueryRetrievable(input.userMessage)) {
    return { passages: [], topScore: 0, rerankerUsed: "none" };
  }

  const ctx: RerankContext = {
    currentCategory: input.question?.category,
    currentTopicTags: input.question?.topicTags,
    currentExam: input.question?.exam,
  };

  const fullQuery = buildRetrievalQuery(input.userMessage, ctx);
  const index = getCachedIndex(getCorpus);

  // 雑談・モチベ系のチットチャットは「識別力のあるトークン」を持たない傾向がある。
  // 最大 IDF がしきい値（デフォルト 3.0）未満なら早期 return して
  // citation 生成の false-positive を抑制する。
  const minMaxIdf = readNumEnv("COPILOT_RAG_MIN_MAX_IDF", 3.0);
  if (maxQueryIdf(index, fullQuery) < minMaxIdf) {
    return { passages: [], topScore: 0, rerankerUsed: "none" };
  }

  const candidates = retrieve(index, fullQuery, topK);
  if (candidates.length === 0) {
    return { passages: [], topScore: 0, rerankerUsed: "none" };
  }
  const topScore = candidates[0].score;

  const useLLM = input.useLLMRerank ?? readBoolEnv("COPILOT_RAG_RERANK_LLM", false);
  if (useLLM && input.rerankerProvider) {
    const passages = await llmRerank(
      fullQuery,
      candidates,
      topN,
      input.rerankerProvider,
      ctx,
      input.signal,
    );
    return { passages, topScore, rerankerUsed: "llm" };
  }

  const passages = deterministicRerank(candidates, ctx, topN, fullQuery);
  return { passages, topScore, rerankerUsed: "deterministic" };
}

export function ragEnabled(): boolean {
  return readBoolEnv("COPILOT_RAG_ENABLED", true);
}

export function ragMinScore(): number {
  // 14k 件のコーパス + char-bigram BM25 の絶対スコア域から逆算した妥当な閾値。
  // 雑談クエリの topScore は概ね 15–28、知識クエリは 20–70 の幅がある。
  // 22 にすると citation rate は 90%+、雑談 false-positive は 20–30% 程度。
  // 雑談側の上限ケース（「受験まで2ヶ月でどう勉強すれば」「緊張で当日眠れない」など）は
  // 一見学習相談だが具体的な根拠ドキュメントが必要な質問でもないため、
  // citation を出してしまっても害は小さく、欠落の害（"回答できません" 化）の方が大きい
  // と判断した。
  return readNumEnv("COPILOT_RAG_MIN_SCORE", 18);
}

function readNumEnv(key: string, fallback: number): number {
  const raw = process.env[key];
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function readBoolEnv(key: string, fallback: boolean): boolean {
  const raw = process.env[key];
  if (raw === undefined) return fallback;
  return raw === "1" || raw.toLowerCase() === "true";
}
