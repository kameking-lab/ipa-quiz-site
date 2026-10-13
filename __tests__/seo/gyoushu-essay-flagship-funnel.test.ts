import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "@/data/blog";

const slugs = [
  "gyoushu-essay-kinyuu-strategy",
  "gyoushu-essay-seizou-pm",
  "gyoushu-essay-koukyou-sa",
];

describe("industry essay articles point to genuine IPA materials", () => {
  for (const slug of slugs) {
    it(slug, () => {
      const post = getBlogPostBySlug(slug);
      expect(post).toBeDefined();
      expect(post!.body).toContain("[IPA 公式の午後II過去問・解答例・採点講評](/essay)");
      expect(post!.body).not.toContain("/features/industry-essays");
      expect(post!.body).not.toContain("AI 採点");
    });
  }
});
