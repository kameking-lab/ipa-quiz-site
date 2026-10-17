import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "@/data/blog";
import { ESSAY_EXAM_CODES } from "@/lib/essay/load";

const articles = [
  { slug: "pm-essay-shudai-pickup", exam: "pm" },
  { slug: "st-strategy-perspective", exam: "st" },
  { slug: "au-audit-evidence-language", exam: "au" },
];

describe("essay articles guide readers to genuine IPA papers", () => {
  for (const { slug, exam } of articles) {
    it(`${slug} retains its exam topic without retired grading links`, () => {
      const post = getBlogPostBySlug(slug);
      expect(post).toBeDefined();
      expect(post!.tags).toContain("論述");
      expect(post!.tags).toContain(exam.toUpperCase());
      expect(ESSAY_EXAM_CODES).toContain(exam);
      expect(post!.body).toContain("[IPA 公式の午後II過去問・解答例・採点講評](/essay)");
      expect(post!.body).not.toContain("/essays/");
      expect(post!.body).not.toContain("[午後論述 AI 採点](/essay)");
    });
  }
});
