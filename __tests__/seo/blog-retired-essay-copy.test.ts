import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getAllBlogPosts } from "@/data/blog";

const source = readFileSync(join(process.cwd(), "data/blog/generators.ts"), "utf8");

describe("blog copy for retired original questions", () => {
  it("does not advertise retired essays, original-question generation, or grading", () => {
    expect(source).not.toContain("/essays/");
    expect(source).not.toContain("/features/industry-essays");
    expect(source).not.toContain("類題生成ボタン");
    expect(source).not.toContain("[午後論述 AI 採点](/essay)");
    expect(source).not.toContain("[午後II論文 AI採点](/essay)");
  });

  it("links essay articles to official materials", () => {
    const posts = getAllBlogPosts();
    const pm = posts.find((post) => post.slug === "gyoushu-essay-seizou-pm");
    expect(pm?.body).toContain("[IPA 公式の午後II過去問・解答例・採点講評](/essay)");
  });

  it("does not repeat the same official-source paragraph within an article", () => {
    const repeated = getAllBlogPosts()
      .filter((post) => post.body.split("IPA が公開する午後IIの問題冊子・解答例・採点講評は").length > 2)
      .map((post) => post.slug);
    expect(repeated).toEqual([]);
  });

  it("keeps the evaluation-rank guide linked from the advanced exam pass-mark article", () => {
    const post = getAllBlogPosts().find((article) => article.slug === "koudo-goukaku-ten-ashikiri");
    expect(post?.body).toContain("/blog/koudo-ronbun-hyouka-rank");
  });
});
