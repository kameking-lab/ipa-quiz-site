import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import * as blog from "@/data/blog";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getRelatedBlogPosts } from "@/lib/blog/related-content";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { questionPagePath } from "@/lib/seo/question-url";
import type { ExamCode } from "@/lib/questions/types";

async function renderedQuestion(exam: ExamCode) {
  const question = getQuestionsByExamStrict(exam)[0]!;
  const [, , , yearSeason, section, qnum] = questionPagePath(question).split("/");
  const page = await QuestionPage({ params: Promise.resolve({ exam, yearSeason: yearSeason!, section: section!, qnum: qnum! }) });
  return new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
}

describe("qualification study-guide promises", () => {
  it.each(["kanri", "eisei1", "eisei2", "fp2", "denken3"] as const)("omits misleading IPA fallback guides on %s", async (exam) => {
    expect(blog.getAllBlogPosts().filter((post) => post.exam === exam)).toHaveLength(0);
    expect(getRelatedBlogPosts(exam, 4)).toEqual([]);
    const doc = await renderedQuestion(exam);
    expect(doc.querySelector('section[aria-label="この試験区分の学習ガイド"]')).toBeNull();
    expect(doc.querySelector("h1")?.textContent).toBeTruthy();
    expect(doc.querySelector(`a[href="/${exam}"]`)).not.toBeNull();
  });

  it("only returns exact-exam guides for every published non-IPA qualification", () => {
    const ipa = new Set<string>(ALL_EXAM_CODES);
    for (const exam of ALL_QUIZ_EXAM_CODES.filter((code) => !ipa.has(code))) {
      expect(getRelatedBlogPosts(exam, 100).every((post) => post.exam === exam)).toBe(true);
    }
  });

  it("keeps existing IPA-specific and common IPA guides available", async () => {
    const related = getRelatedBlogPosts("ap", 100);
    expect(related.some((post) => post.exam === "ap")).toBe(true);
    expect(related.some((post) => !post.exam)).toBe(true);
    const doc = await renderedQuestion("ap");
    const section = doc.querySelector('section[aria-label="この試験区分の学習ガイド"]');
    expect(section?.querySelectorAll('a[href^="/blog/"]').length).toBeGreaterThan(0);
    expect(section?.textContent).toContain("応用情報");
  });

  it("renders a genuine FP-specific guide while excluding generic IPA and other-exam candidates", async () => {
    const all = blog.getAllBlogPosts();
    const seed = all.find((post) => post.exam === "ap")!;
    const fpGuide = { ...seed, exam: "fp2" as const, slug: "fp2-specific-guide-fixture", title: "2級FP専用の学習ガイド" };
    const hub = all.find((post) => !post.exam && post.tags.includes("学習法"))!;
    const spy = vi.spyOn(blog, "getAllBlogPosts").mockReturnValue([fpGuide, hub, seed]);
    try {
      expect(getRelatedBlogPosts("fp2", 4).map((post) => post.slug)).toEqual([fpGuide.slug]);
      const section = (await renderedQuestion("fp2")).querySelector('section[aria-label="この試験区分の学習ガイド"]');
      expect(section?.textContent).toContain(fpGuide.title);
      expect(section?.querySelectorAll("a")).toHaveLength(1);
      expect(section?.querySelector("a")?.getAttribute("href")).toBe(`/blog/${fpGuide.slug}`);
    } finally { spy.mockRestore(); }
  });
});
