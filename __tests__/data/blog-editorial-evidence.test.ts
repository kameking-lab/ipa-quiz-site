import { describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
import { buildOverviewPost, buildLastMonthPost, buildFrequentTopicsPost, buildPracticePost, buildAnalysisPost } from "@/data/blog/generators";
import { EXAM_PROFILES } from "@/data/blog/exam-data";
import { isBlogAdEligible, publicBlogDates, type ArticleReviewEvidence } from "@/lib/blog/editorial";
import type { ExamCode } from "@/lib/questions/types";
import { renderBlogSitemapXml } from "@/lib/seo/sitemap-xml";
import { generateMetadata } from "@/app/blog/[slug]/page";
const builds=[buildOverviewPost,buildLastMonthPost,buildFrequentTopicsPost,buildPracticePost,buildAnalysisPost];
describe("editorial evidence", () => {
  it("all 65 retain their routes and sources without automatic freshness or measured claims", () => {
    const posts=(Object.keys(EXAM_PROFILES) as ExamCode[]).flatMap((e,i)=>builds.map(build=>build(e,i)));
    expect(posts).toHaveLength(65);
    for(const p of posts){
      expect(p.editorialKind).toBe("study-guide"); expect(p.sourceUrls?.length).toBeGreaterThan(0);
      expect(p.title).not.toMatch(/年最新|頻出論点トップ|最新分析/);
      expect(p.body).not.toMatch(/合格者に共通|合格者の共通パターン|頻度順にまとめ|直近 2 年に出題が増加|合格率は、無計画|およそ 6 割の得点/);
      expect(publicBlogDates(p).published).toBeUndefined(); expect(isBlogAdEligible(p)).toBe(false);
      expect(getBlogPostBySlug(p.slug)).toBeDefined();
    }
  });
  it("calendar roll-over cannot refresh titles or editorial dates", () => {
    const before=buildOverviewPost("fe",0);
    vi.useFakeTimers(); vi.setSystemTime(new Date("2030-01-01"));
    expect(buildOverviewPost("fe",0)).toEqual(before); vi.useRealTimers();
  });
  it("a verified exact-body review is required, not mere source links", () => {
    const post=buildOverviewPost("fe",0);
    const evidence:ArticleReviewEvidence={slug:post.slug,bodySha256:createHash("sha256").update(post.body).digest("hex"),sourceUrls:["https://www.ipa.go.jp/shiken/"],contentComplete:true,claimsVerified:true,reviewedAt:"2026-10-08",reviewReceipt:"reports/article-specific-review.json"};
    expect(isBlogAdEligible(post)).toBe(false); expect(isBlogAdEligible(post,evidence)).toBe(true);
    expect(isBlogAdEligible({...post,body:post.body+"changed"},evidence)).toBe(false);
    expect(isBlogAdEligible(post,{...evidence,sourceUrls:[]})).toBe(false);
    expect(isBlogAdEligible(post,{...evidence,reviewReceipt:""})).toBe(false);
    expect(isBlogAdEligible(post,{...evidence,claimsVerified:false} as never)).toBe(false);
    expect(isBlogAdEligible(post,{...evidence,contentComplete:false} as never)).toBe(false);
  });
  it("unknown publication dates stay out of metadata and sitemap lastmod", async () => {
    const p=getBlogPostBySlug("fe-kamoku-b-kakomon-nai")!;
    const meta=await generateMetadata({params:Promise.resolve({slug:p.slug})});
    expect((meta.openGraph as {publishedTime?:string}).publishedTime).toBeUndefined();
    const xml=renderBlogSitemapXml(); expect((xml.match(/<loc>/g)??[]).length).toBe(getAllBlogSlugs().length);
    expect(xml).not.toContain("2026-01-01");
    expect(publicBlogDates({editorialDates:{firstPublishedAt:null}})).toEqual({published:undefined,modified:undefined});
  });
  it("FE distinguishes partially published actual questions from samples",()=>{
    const p=getBlogPostBySlug("fe-kamoku-b-kakomon-nai")!;
    expect(p.body).toContain("2025年7月4日");expect(p.body).toContain("2026年7月1日");
    expect(p.body.match(/20問中6問/g)).toHaveLength(2);expect(p.body).toContain("2022年12月26日");
    expect(p.body).not.toContain("唯一の公式素材");expect(p.body).not.toContain("本試験問題は公開されていません");
    expect(isBlogAdEligible(p)).toBe(false);
  });
});
