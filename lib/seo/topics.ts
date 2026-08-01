import { ALL_QUESTIONS } from "@/data/questions";
import type { Question } from "@/lib/questions/types";

/**
 * topicTag を URL slug に正規化する。
 * 日本語タグはそのまま encodeURIComponent するが、ハイフンや空白の扱いを統一。
 */
export function topicTagToSlug(tag: string): string {
  return tag.trim().replace(/\s+/g, "-");
}

export function topicSlugToTag(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, " ").trim();
}

export interface TopicSummary {
  /** 表示用タグ名（オリジナル） */
  tag: string;
  /** URL に使う slug */
  slug: string;
  /** タグを持つ問題数 */
  count: number;
}

let cachedAllTopics: TopicSummary[] | null = null;
const TOPIC_TO_QUESTIONS = new Map<string, Question[]>();

function buildIndex(): void {
  if (cachedAllTopics) return;
  const counts = new Map<string, number>();
  for (const q of ALL_QUESTIONS) {
    // needsReview questions 404 at /q/* (their page notFound()s), so they must
    // never enter the topic index — /topics/[slug] links every pooled question
    // and would otherwise ship dead links. Placeholder questions are kept (the
    // page badges them 「解説準備中」 and links to a real noindex 200 page).
    if (q.needsReview) continue;
    const tags = q.topicTags.length > 0 ? q.topicTags : [q.category];
    for (const t of tags) {
      const trimmed = t.trim();
      if (!trimmed) continue;
      counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
      const list = TOPIC_TO_QUESTIONS.get(trimmed);
      if (list) list.push(q);
      else TOPIC_TO_QUESTIONS.set(trimmed, [q]);
    }
  }
  cachedAllTopics = [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: topicTagToSlug(tag), count }))
    .sort((a, b) =>
      b.count !== a.count ? b.count - a.count : a.tag.localeCompare(b.tag, "ja"),
    );
}

export function getAllTopics(): TopicSummary[] {
  buildIndex();
  return cachedAllTopics!;
}

/**
 * 個別 hub ページとして公開するトップ N トピック。
 * 余りに少件数のロングテールはハブページではなく検索でカバー。
 */
export function getHubTopics(maxCount: number = 30, minQuestions: number = 4): TopicSummary[] {
  return getAllTopics()
    .filter((t) => t.count >= minQuestions)
    .slice(0, maxCount);
}

export function getQuestionsByTopic(tag: string): Question[] {
  buildIndex();
  // キャッシュ内部配列の参照をそのまま返すと、呼び出し側の .sort() などの
  // 破壊的操作が共有キャッシュを汚染する（長寿命サーバでリクエスト跨ぎの順序破壊）。
  // 浅いコピーを返してキャッシュを不変に保つ（要素 Question は共有のままで安全）。
  const list = TOPIC_TO_QUESTIONS.get(tag.trim());
  return list ? [...list] : [];
}

export function findTopicByAnySlug(slug: string): TopicSummary | undefined {
  const target = slug.trim();
  return getAllTopics().find(
    (t) => t.slug === target || t.tag === topicSlugToTag(target),
  );
}

/**
 * トピックタグのリンク先 URL を返す。
 * 専用ハブページ（/topics/{slug}）が存在するタグはそこへ、存在しないタグ
 * （用語集・特集記事の編集タグで、どの問題にも付与されていないもの）は
 * 検索へフォールバックする。/topics/[slug] は dynamicParams=false のため、
 * 実在しないタグへのリンクは 404 になる。これを防ぐためのヘルパ。
 */
export function topicLinkHref(tag: string): string {
  const slug = topicTagToSlug(tag);
  return findTopicByAnySlug(slug)
    ? `/topics/${encodeURIComponent(slug)}`
    : `/search?q=${encodeURIComponent(tag)}`;
}
