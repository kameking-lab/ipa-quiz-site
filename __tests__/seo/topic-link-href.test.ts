import { describe, expect, it } from "vitest";

import { GLOSSARY } from "@/data/glossary";
import { KEYWORD_PAGES } from "@/data/keywords";
import {
  findTopicByAnySlug,
  topicLinkHref,
  topicTagToSlug,
} from "@/lib/seo/topics";

/**
 * 用語集（/glossary）と特集記事（/keywords/[keyword]）は、編集データ上の
 * relatedTopics タグを /topics/{slug} へリンクしていた。これらのタグの多くは
 * どの問題にも付与されておらず getAllTopics() に存在しないため、
 * dynamicParams=false の /topics/[slug] では 404 になっていた
 * （indexable ページからの内部リンク切れ・70 件規模）。
 *
 * topicLinkHref はハブページが在るタグだけ /topics へ、無いタグは /search へ
 * フォールバックさせる。本テストは「実在しないトピックへ /topics リンクが
 * 出ないこと（404 ゼロ）」を保証する。
 */
function curatedTags(): string[] {
  const tags: string[] = [];
  for (const p of KEYWORD_PAGES) tags.push(...(p.relatedTopics ?? []));
  for (const g of GLOSSARY) tags.push(...(g.relatedTopics ?? []));
  return tags;
}

describe("topicLinkHref — no dead /topics links from curated relatedTopics", () => {
  it("non-resolving tag falls back to /search", () => {
    expect(topicLinkHref("___definitely-not-a-real-topic___")).toMatch(
      /^\/search\?q=/,
    );
  });

  it("every curated relatedTopic that links to /topics actually resolves", () => {
    const dead: string[] = [];
    for (const tag of curatedTags()) {
      const href = topicLinkHref(tag);
      if (href.startsWith("/topics/")) {
        const slug = decodeURIComponent(href.slice("/topics/".length));
        if (!findTopicByAnySlug(slug)) dead.push(`${tag} -> ${href}`);
      }
    }
    expect(dead).toEqual([]);
  });

  it("known unmapped tags fall back to /search (not /topics)", () => {
    // これらは過去に 404 を出していた代表例（問題に未付与のタグ）
    for (const tag of ["AI", "OWASP", "XSS", "サブネット"]) {
      // データ上に存在する前提（存在しなければこのアサーションはスキップ的に真）
      if (!findTopicByAnySlug(topicTagToSlug(tag))) {
        expect(topicLinkHref(tag)).toMatch(/^\/search\?q=/);
      }
    }
  });
});
