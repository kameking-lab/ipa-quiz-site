import { getAllQuestions } from "@/lib/questions/load";
import { examLabel, formatYearSeason } from "@/lib/utils";
import type { ExamCode, Season } from "@/lib/questions/types";
import { getCorpus } from "./corpus";
import { getCachedIndex, retrieve } from "./retriever";
import { buildRetrievalQuery, isQueryRetrievable, type RerankContext } from "./reranker";

/**
 * クライアントに渡される「関連問題」サジェスト。
 * AI コパイロットの回答下部に「この質問に関連する問題」セクションを
 * 描画するために使う。引用に採用された出典は除外する。
 */
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
  /** 演習開始用 URL（クイズプレイヤー）。 */
  url: string;
  /** BM25 スコア（並び順保持用）。 */
  score: number;
}

const PREVIEW_MAX_LEN = 180;

function shortenPreview(text: string): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= PREVIEW_MAX_LEN) return trimmed;
  return `${trimmed.slice(0, PREVIEW_MAX_LEN)}…`;
}

interface TopicFields {
  category: string;
  topicTags: string[];
}

/**
 * Whether a candidate shares the viewed question's category or any topic tag.
 * Used to gate out cross-domain BM25 matches (即修正④: 可変長符号化 の類題に
 * 音声サンプリングが出る、のような分野破綻を防ぐ).
 */
export function sharesTopicOrCategory(
  candidate: TopicFields,
  currentCategory?: string,
  currentTopicTags?: string[],
): boolean {
  if (currentCategory && candidate.category === currentCategory) return true;
  if (currentTopicTags && currentTopicTags.length > 0) {
    const set = new Set(currentTopicTags);
    return candidate.topicTags.some((t) => set.has(t));
  }
  return false;
}

/**
 * Score multiplier that lifts same-category / shared-topicTag candidates so
 * BM25 surface-token overlap alone cannot outrank a true subfield match.
 */
export function topicRelevanceMultiplier(
  candidate: TopicFields,
  currentCategory?: string,
  currentTopicTags?: string[],
): number {
  let mult = 1;
  if (currentCategory && candidate.category === currentCategory) mult *= 1.5;
  if (currentTopicTags && currentTopicTags.length > 0) {
    const set = new Set(currentTopicTags);
    const overlap = candidate.topicTags.filter((t) => set.has(t)).length;
    if (overlap > 0) mult *= 1 + 0.2 * overlap;
  }
  return mult;
}

interface FindRelatedInput {
  userMessage: string;
  /** 閲覧中の問題（あれば exam / category を関連度判定に使う + 自身を除外）。 */
  currentQuestionId?: string;
  currentExam?: ExamCode;
  currentCategory?: string;
  currentTopicTags?: string[];
  /** RAG citation に既に使われた docId 集合（重複を避ける）。 */
  excludeDocIds: ReadonlySet<string>;
  /** 返却件数。デフォルト 4。 */
  limit?: number;
}

/**
 * BM25 retriever を再利用して「関連問題」を取得する。
 * - kind === "question" のみ
 * - 既に citation に採用された docId は除外
 * - 閲覧中の自問題（currentQuestionId）も除外
 * - 同一試験区分の問題を弱優先（exam マッチで +5%）
 *
 * 注: 新規 embedding API は導入せず、既存の BM25 index を再利用する。
 *     CLAUDE.md §10「新規外部 API の導入」は承認必須のため、暫定設計として BM25 ベース。
 */
export function findRelatedQuestions(input: FindRelatedInput): RelatedQuestion[] {
  const limit = input.limit ?? 4;
  if (!isQueryRetrievable(input.userMessage)) return [];

  const ctx: RerankContext = {
    currentCategory: input.currentCategory,
    currentTopicTags: input.currentTopicTags,
    currentExam: input.currentExam,
  };
  const query = buildRetrievalQuery(input.userMessage, ctx);
  const index = getCachedIndex(getCorpus);

  // citation top-N 用より少し広めに取り、フィルタ後に limit へ落とす。
  const candidates = retrieve(index, query, Math.max(limit * 4, 12));
  if (candidates.length === 0) return [];

  const allQuestions = getAllQuestions();
  const questionMap = new Map(allQuestions.map((q) => [q.id, q]));

  // When a question is being viewed, gate to its subfield: prefer candidates
  // that share the category or a topic tag, so a surface-token BM25 hit from a
  // different subfield can't be presented as a 類題 (即修正④).
  const hasContext =
    Boolean(input.currentCategory) ||
    (input.currentTopicTags?.length ?? 0) > 0;

  const scored: { item: RelatedQuestion; onTopic: boolean }[] = [];
  for (const c of candidates) {
    if (c.doc.kind !== "question") continue;
    if (input.excludeDocIds.has(c.doc.id)) continue;
    const qid = c.doc.id.replace(/^q:/, "");
    if (input.currentQuestionId && qid === input.currentQuestionId) continue;
    const q = questionMap.get(qid);
    if (!q) continue;
    // 解説が極端に短い問題は学習教材として弱いため、関連サジェストには含めない。
    if (!q.explanation || q.explanation.trim().length < 40) continue;
    // 同一試験区分は弱優先 + 同分野 / 細分野タグ一致を強優先。
    const examBoost = input.currentExam === q.exam ? 1.05 : 1;
    const topicBoost = topicRelevanceMultiplier(
      q,
      input.currentCategory,
      input.currentTopicTags,
    );
    const onTopic = sharesTopicOrCategory(
      q,
      input.currentCategory,
      input.currentTopicTags,
    );
    scored.push({
      onTopic,
      item: {
        questionId: q.id,
        exam: q.exam,
        examLabel: examLabel(q.exam),
        year: q.year,
        season: q.season,
        yearSeasonLabel: formatYearSeason(q.year, q.season),
        qNumber: q.qNumber,
        category: q.category,
        preview: shortenPreview(q.question),
        url: `/quiz?id=${encodeURIComponent(q.id)}`,
        score: c.score * examBoost * topicBoost,
      },
    });
  }

  // With context, drop off-topic candidates entirely — *unless* none are
  // on-topic (sparse subfield), in which case fall back to the full set so the
  // section is not silently empty.
  const onTopicOnly = scored.filter((s) => s.onTopic);
  const pool =
    hasContext && onTopicOnly.length > 0 ? onTopicOnly : scored;

  return pool
    .map((s) => s.item)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** HTTP ヘッダ送信用 base64 エンコード。 */
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
