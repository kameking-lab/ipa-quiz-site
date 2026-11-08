import { describe, expect, it } from "vitest";

import TopicHubPage, { generateMetadata, generateStaticParams } from "@/app/topics/[slug]/page";
import { getAllTopics, getQuestionsByTopic } from "@/lib/seo/topics";

/**
 * /topics 索引ページは「その他のトピック」節で getAllTopics() の全トピックを
 * /topics/{slug} へリンクする。/topics/[slug] はビルド時に事前生成せず、初回
 * アクセス時に生成してデプロイまでキャッシュする（dynamicParams=true・
 * generateStaticParams は空）。そのため「到達できる URL = 索引のリンク先」は
 * ページ側の判定（正規スラッグとの完全一致）で保証する。
 *
 * 過去に静的生成セットが getHubTopics(80, 4) に限定され、ロングテール（count<4）
 * のトピックが索引からリンクされているのに 404 を返す内部リンク切れが発生した。
 */
describe("/topics/[slug] resolves every linked topic and nothing else", () => {
  it("prerenders nothing at build time", async () => {
    expect(await generateStaticParams()).toEqual([]);
  });

  it("every topic the /topics index links resolves (metadata and page)", async () => {
    const unresolved: string[] = [];
    for (const t of getAllTopics()) {
      const params = Promise.resolve({ slug: t.slug });
      const metadata = await generateMetadata({ params });
      if (metadata.alternates?.canonical !== `/topics/${encodeURIComponent(t.slug)}`) unresolved.push(t.slug);
    }
    expect(unresolved).toEqual([]);
    // 実ページも描画できること（代表として先頭とロングテール末尾）
    const all = getAllTopics();
    for (const t of [all[0]!, all[all.length - 1]!]) {
      await expect(TopicHubPage({ params: Promise.resolve({ slug: t.slug }) })).resolves.toBeTruthy();
    }
  });

  it("returns 404 for unknown, alias and malformed slugs", async () => {
    const spaced = getAllTopics().find((t) => t.slug.includes("-") && !t.tag.includes("-"));
    const bad = ["存在しないトピック名-xyz", "%zz", ...(spaced ? [spaced.tag] : [])];
    for (const slug of bad) {
      await expect(TopicHubPage({ params: Promise.resolve({ slug }) }), slug).rejects.toThrow();
      const metadata = await generateMetadata({ params: Promise.resolve({ slug }) });
      expect(metadata.robots, slug).toEqual({ index: false });
    }
  });
});

/**
 * getQuestionsByTopic() は内部キャッシュ TOPIC_TO_QUESTIONS の配列を返すが、
 * /topics/[slug] ページが返り値に対して直接 .sort() を呼んでいる。参照をそのまま
 * 返すと破壊的操作が共有キャッシュを汚染し、長寿命サーバでリクエストを跨いで
 * トピックの問題順序が破壊される。getter はコピーを返してキャッシュを不変に保つ。
 */
describe("getQuestionsByTopic returns an isolated copy", () => {
  it("caller mutation does not corrupt the shared cache", () => {
    const tag = getAllTopics()[0].tag;
    const first = getQuestionsByTopic(tag);
    expect(first.length).toBeGreaterThan(1);
    const snapshot = first.map((q) => q.id);

    // 呼び出し側がインプレースで配列を破壊（/topics/[slug] の .sort() を模す）
    first.reverse();

    const second = getQuestionsByTopic(tag);
    expect(second.map((q) => q.id)).toEqual(snapshot);
  });
});
