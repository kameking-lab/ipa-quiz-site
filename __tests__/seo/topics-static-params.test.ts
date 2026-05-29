import { describe, expect, it } from "vitest";

import { generateStaticParams } from "@/app/topics/[slug]/page";
import { getAllTopics } from "@/lib/seo/topics";

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
