import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import BlogArticlePage from "@/app/blog/[slug]/page";
import { getBlogPostBySlug } from "@/data/blog";
import { deriveSessionPool } from "@/lib/questions/session-pool";

const post = (slug: string) => getBlogPostBySlug(slug)!;
const doc = (html: string) => new DOMParser().parseFromString(html, "text/html");

describe("reviewed article corrections", () => {
  it("preserves SQL stars in fenced code instead of Markdown emphasis", () => {
    const document = doc(renderToStaticMarkup(<BlogMarkdown>{post("db-sql-taisaku").body}</BlogMarkdown>));
    const blocks = [...document.querySelectorAll("pre code")];
    expect(blocks).toHaveLength(3);
    expect(blocks[0].textContent?.match(/COUNT\(\*\)/g)).toHaveLength(2);
    expect(document.querySelector("pre em")).toBeNull();
    expect(blocks[2].textContent).toContain("GROUP BY c.id, c.name");
  });

  it("offers an initial common-paper exercise without requiring previous mistakes", () => {
    const body = post("koudo-gozen1-taisaku").body;
    const firstQuiz = body.match(/\]\((\/quiz\?[^)]+)\)/)![1];
    const url = new URL(firstQuiz, "https://local.test");
    expect(url.searchParams.get("exam")).toBe("sc");
    expect(url.searchParams.get("session")).toBe("am1");
    expect(url.searchParams.get("mode")).toBe("random");
    localStorage.clear();
    expect(deriveSessionPool(["unseen-common-question"], "random")).toEqual(["unseen-common-question"]);
  });

  it.each(["nw", "db"])("%s keeps its 90-minute plan consistent through the FAQ", exam => {
    const body = post(`${exam}-gogo-jikan-haibun`).body;
    expect(body).not.toContain("1問50分");
    expect(body).toContain("選択5分・40分×2問・見直し5分");
    expect(body).not.toContain("8割以上");
  });

  it("distinguishes SG's combined score and certificate replacement", () => {
    const score = post("cbt-goukaku-happyou-score-report").body;
    expect(score).toContain("| [SG](/sg) | 総合評価点 |");
    expect(score).not.toContain("正式発表は翌月中旬");
    const resume = post("it-shikaku-rirekisho-kakikata").body;
    expect(resume).toContain("簡易書留");
    expect(resume).toContain("合格証書は再発行できません");
    expect(resume).not.toContain("普通郵便");
  });

  it("puts instructional exercises after the lesson and omits unrelated exercises on reference articles", async () => {
    for (const slug of ["it-shikaku-rirekisho-kakikata", "cbt-goukaku-happyou-score-report", "ipa-shiken-moushikomi-nagare"]) {
      const document = doc(renderToStaticMarkup(await BlogArticlePage({ params: Promise.resolve({ slug }) })));
      expect(document.querySelector("#article-body")).not.toBeNull();
      expect(document.querySelector("#article-practice")).toBeNull();
    }
    const html = renderToStaticMarkup(await BlogArticlePage({ params: Promise.resolve({ slug: "db-sql-taisaku" }) }));
    expect(html.indexOf('id="article-practice"')).toBeGreaterThan(html.indexOf('id="article-body"'));
    const document = doc(html);
    expect(document.querySelectorAll("#article-practice")).toHaveLength(1);
  });

  it("routes SC knowledge practice to SC and teaches answer revision without grading claims", () => {
    const body = post("sc-ronbun-taisaku").body;
    expect(body).toContain("mode=random&exam=sc&session=am2");
    expect(body).not.toContain("](/quiz?mode=random)");
    expect(body).toContain("Aさんのアカウントを営業部グループから削除する");
    expect(body).not.toContain("採点者が探す部分点キーワード");
  });
});
