import { describe, expect, it } from "vitest";

import { generateStaticParams } from "@/app/topics/[slug]/page";
import { getAllTopics, getQuestionsByTopic } from "@/lib/seo/topics";

/**
 * /topics 索引ページは「その他のトピック」節で getAllTopics() の全トピックを
 * /topics/{slug} へリンクする。一方 /topics/[slug] は dynamicParams=false の
 * ため、generateStaticParams() が返したスラッグ以外はハード 404 になる。
 *
 * 過去にここが getHubTopics(80, 4)（count>=4 のハブのみ）に限定されており、
 * ロングテール（count<4）のトピックが索引からリンクされているのに 404 を返す
 * 内部リンク切れが発生していた。索引のリンク先 = 静的生成セット を保証する。
 */
describe("/topics/[slug] static params cover every linked topic", () => {
  it("generateStaticParams covers all topics the /topics index links", async () => {
    const params = await generateStaticParams();
    const generated = new Set(params.map((p) => p.slug));
    const missing = getAllTopics()
      .map((t) => t.slug)
      .filter((slug) => !generated.has(slug));
    expect(missing).toEqual([]);
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
