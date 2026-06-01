import { describe, expect, it } from "vitest";

import { getAllBlogPosts, getBlogPostBySlug } from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// app/blog/[slug]/page.tsx emits a FAQPage JSON-LD node when extractFaq()
// returns Q&A pairs from a post's「## よくある質問」section. These tests pin the
// extractor so the structured data stays in sync with the article bodies:
// if a FAQ section is reworded into a format the parser no longer recognises,
// or markdown leaks into the answer text, this fails ("崩れたら落ちる").

describe("blog FAQ extraction for FAQPage JSON-LD", () => {
  it("extracts every Q&A pair from a known FAQ article", () => {
    const post = getBlogPostBySlug("it-shikaku-rirekisho-kakikata");
    expect(post).toBeDefined();
    const faqs = extractFaq(post!.body);
    // The article's「よくある質問」section has 5 questions.
    expect(faqs).toHaveLength(5);
    expect(faqs[0].question).toContain("ITパスポート");
    // Question text must not retain the "Q. " marker or markdown emphasis.
    for (const f of faqs) {
      expect(f.question.startsWith("Q")).toBe(false);
      expect(f.question).not.toContain("**");
      expect(f.answer.length).toBeGreaterThan(0);
    }
  });

  it("returns an empty array for a post with no FAQ section", () => {
    const post = getAllBlogPosts().find(
      (p) => !p.body.includes("## よくある質問"),
    );
    expect(post).toBeDefined();
    expect(extractFaq(post!.body)).toEqual([]);
  });

  it("keeps every FAQ article in sync and strips markdown from answers", () => {
    const posts = getAllBlogPosts();
    let withFaqSection = 0;
    for (const post of posts) {
      const hasSection = post.body.includes("## よくある質問");
      const faqs = extractFaq(post.body);
      if (hasSection) {
        withFaqSection += 1;
        // A recognised FAQ section must yield at least one parsed pair.
        expect(faqs.length, `no FAQ parsed for ${post.slug}`).toBeGreaterThan(0);
      } else {
        expect(faqs, `unexpected FAQ for ${post.slug}`).toEqual([]);
      }
      for (const f of faqs) {
        expect(f.question.length).toBeGreaterThan(0);
        expect(f.answer.length).toBeGreaterThan(0);
        // Markdown link syntax must be reduced to its text only.
        expect(f.answer, `markdown link leaked in ${post.slug}`).not.toMatch(
          /\]\(/,
        );
        expect(f.answer).not.toContain("**");
        expect(f.answer.length).toBeLessThanOrEqual(500);
      }
    }
    // Non-vacuous: the site ships many FAQ articles; guard against a regex
    // change that silently parses none.
    expect(withFaqSection).toBeGreaterThanOrEqual(20);
  });
});
