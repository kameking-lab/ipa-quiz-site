import { describe, expect, it } from "vitest";

import { getAllBlogPosts, getBlogPostBySlug } from "@/data/blog";

// The free AI-copilot quota is owned by lib/constants/ai-quota.ts
// (FREE_AI_DAILY_LIMIT = 10). The constant's own comment records that some
// marketing copy used to overstate it as「1日30回」and was corrected to derive
// from the SSOT. The kakomon-ai-roadmap-2026 article still hardcoded
//「AI コパイロット 1 日 30 回（無料枠）」— a 3× overstatement that drifted from
// the enforced number. These tests guard the whole blog corpus so a stale
// quota literal can never reappear ("崩れたら落ちる").
describe("blog copy: AI quota claims derive from the SSOT, never a stale literal", () => {
  const posts = getAllBlogPosts();

  it("no published article advertises the stale「30 回」free-quota claim", () => {
    // The drift was always「<n> 回（無料」phrasing in an AI-copilot context.
    // AI_QUOTA_COPY_SHORT renders as「初回 10 回無料（…」(回無料, not 回（無料),
    // so this pattern targets only the hardcoded-quota mistake.
    const offenders = posts
      .filter((p) => /\d+\s*回（無料/.test(p.body))
      .map((p) => p.slug);
    expect(offenders).toEqual([]);
  });

  it("the roadmap distinguishes published content from generation and links to current terms", () => {
    const post = getBlogPostBySlug("kakomon-ai-roadmap-2026");
    expect(post).toBeDefined();
    expect(post!.body).toContain("(/billing)");
    expect(post!.body).toContain("連続演習には無料枠と月額プランがあります");
    expect(post!.body).toContain("AIの残り回数と提供状態は利用画面で確認できます");
    expect(post!.body).not.toContain("初回 10 回");
    expect(post!.body).not.toContain("30 回");
  });
  it("no generated article promotes the retired 300-yen offer or unsupported morning-efficiency multiplier", () => {
    const offenders = posts.filter(post => /月\s*300\s*円|全試験・全機能|学習効率は\s*2[〜～]3\s*倍|効率は\s*2[〜～]3\s*倍/.test(post.body));
    expect(offenders.map(post => post.slug)).toEqual([]);
  });
});
