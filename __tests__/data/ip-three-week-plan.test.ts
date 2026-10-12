import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "@/data/blog";

describe("bounded IP three-week plan", () => {
  it("aligns the title, search description, introduction and FAQ as an adjustable plan", () => {
    const post=getBlogPostBySlug("ip-3shukan-goukaku")!;
    expect(post.title).toContain("学習計画例");
    expect(post.description).toContain("必要時間は前提知識と誤答で変わります");
    expect(post.body.match(/必要時間は前提知識と誤答で変わります/g)).toHaveLength(2);
    expect(post.body).not.toContain("合格圏に到達できます");
    expect(post.body).not.toContain("公式を1つ覚えておけば確実に得点");
    expect(post.body).not.toContain("最頻出ワード2〜3個");
    expect(post.body).toContain("用語だけでなく計算と設問条件");
    expect(post.body).toContain("正答率75%を600点や合格の保証に換算できません");
  });
  it("keeps the 21-day plan and qualification-specific practice links", () => {
    const body=getBlogPostBySlug("ip-3shukan-goukaku")!.body;
    for(const text of ["第1週（1〜7日）","第2週（8〜14日）","第3週（15〜21日）","20日目","21日目","/ip)","/quiz?mode=year&exam=ip","/quiz?mode=topic&exam=ip"]) expect(body).toContain(text);
    expect(body).toContain("用語・計算・読み違い");
  });
});
