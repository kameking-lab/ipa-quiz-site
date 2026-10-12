import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { getAllBlogPosts, getBlogPostBySlug } from "@/data/blog";
import { BLOG_ARTICLE_ALIASES } from "@/lib/blog/article-aliases";
import baseline from "@/__tests__/fixtures/worked-guide-body-sha256-20261011.json";

function post(slug: string) {
  const value = getBlogPostBySlug(slug);
  if (!value) throw new Error(`Missing post: ${slug}`);
  return value;
}

describe("bounded study-content consolidation", () => {
  it("preserves the bodies of all 13 completed worked guides", () => {
    expect(baseline.guides).toHaveLength(13);
    for (const entry of baseline.guides) expect(createHash("sha256").update(post(entry.slug).body).digest("hex"), entry.slug).toBe(entry.bodySha256);
  });

  it("moves both duplicate practice URLs to the qualification's completed worked guide", () => {
    expect(getAllBlogPosts()).toHaveLength(179);
    for (const exam of ["nw", "db"]) {
      expect(getBlogPostBySlug(`${exam}-yoru-tokurensyu`)).toBeUndefined();
      expect(BLOG_ARTICLE_ALIASES[`${exam}-yoru-tokurensyu`]).toBe(`${exam}-hinnshutsu-ronten-toppu10`);
      expect(post(`${exam}-hinnshutsu-ronten-toppu10`).body).toContain("/blog/ipa-shiken-data-driven-revision");
    }
    for (const value of getAllBlogPosts()) {
      expect(value.body).not.toContain("/blog/nw-yoru-tokurensyu");
      expect(value.body).not.toContain("/blog/db-yoru-tokurensyu");
    }
  });

  it("offers a common method with direct NW/DB applications without invented CSV or measured population claims", () => {
    const common = post("ipa-shiken-data-driven-revision").body;
    expect(common).toContain("/blog/nw-hinnshutsu-ronten-toppu10");
    expect(common).toContain("/blog/db-hinnshutsu-ronten-toppu10");
    expect(common).toContain("mode=review&exam=nw&session=am2");
    expect(common).toContain("mode=review&exam=db&session=am2");
    expect(common).not.toContain("CSV");
    expect(common).not.toContain("高い相関があります");
    expect(common).not.toContain("3 連続正解できない分野が真の弱点");
  });

  it("prioritizes observed mistakes instead of pretending low-frequency SA topics can safely be discarded", () => {
    const sa = post("sa-cyokusen-1kagetsu").body;
    expect(sa).toContain("論点別出題頻度を集計していない");
    expect(sa).toContain("条件の読み落とし");
    expect(sa).not.toContain("出題頻度が低く、優先度を下げても問題ありません");
    expect(sa).not.toContain("過去 5 年で 1 度しか出題");
    expect(post("nw-goukaku-benkyouhou").body).not.toContain("丸暗記で乗り切れる");
  });

  it("uses the same 26-week calculation in the FE plan and FAQ", () => {
    const fe = post("fe-goukaku-benkyouhou").body;
    expect(fe.match(/週約8〜12時間/g)).toHaveLength(2);
    expect(fe).toContain("200÷26≒7.7、300÷26≒11.5");
    expect(fe).not.toContain("週 12〜20 時間");
  });
});
