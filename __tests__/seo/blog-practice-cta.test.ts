import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { getAllBlogPosts } from "@/data/blog";
import { ALL_EXAM_CODES } from "@/lib/exam-config";

// Regression guard for the blog → 演習 practice CTA in
// app/blog/[slug]/page.tsx. Every article must give the reader a one-click
// path into practice, and that link must point at a REAL route (never a 404):
//   - exam-tagged posts  → /quiz?mode=random&exam={exam}  (solve directly)
//   - hub / no-exam posts → /  (home's primary practice CTA — no exam guessing)
// The existing blog-cta-label-in-name test only checks the aria-label wording;
// this guards CTA *presence in both branches* and *route validity*.

describe("ブログ記事 → 演習 CTA — 両分岐が実在ルートを指す", () => {
  const source = readFileSync(
    join(process.cwd(), "app/blog/[slug]/page.tsx"),
    "utf8",
  );

  it("試験タグ付き記事は /quiz?mode=random&exam=… の直接演習リンクを出す", () => {
    expect(source).toContain("/quiz?mode=random&exam=${post.exam}");
    expect(source).toContain("の過去問で実戦演習する");
  });

  it("試験タグの無い記事は汎用の演習入口（ホーム /）へ誘導する", () => {
    expect(source).toContain("過去問演習を始める");
    // hub-branch button links to home, not a guessed exam route.
    expect(source).toMatch(/href="\/"[\s\S]*?過去問演習を始める/);
  });
});

describe("ブログ CTA — リンク先試験区分は実在ルートのみ (no 404)", () => {
  const examRoutes = new Set<string>(ALL_EXAM_CODES);

  it("exam を持つ全記事の exam は実在の試験区分コード（/quiz?exam=… と /{exam} が解決する）", () => {
    const posts = getAllBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
    let withExam = 0;
    for (const post of posts) {
      if (post.exam == null) continue;
      withExam++;
      // A valid exam code backs both /quiz?exam={exam} and the /{exam} hub —
      // an unknown code here would make the CTA a dead link.
      expect(examRoutes.has(post.exam), `post ${post.slug} exam=${post.exam}`).toBe(
        true,
      );
    }
    // The dataset is expected to contain at least some exam-tagged posts.
    expect(withExam).toBeGreaterThan(0);
  });
});
