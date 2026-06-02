import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { getAllBlogPosts, getBlogPostBySlug } from "@/data/blog";
import { ALL_EXAM_CODES } from "@/lib/exam-config";
import { getRecommendedBooks } from "@/data/recommended-books";

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

  // 収益導線: exam を持つ記事は /recommended-books/{exam} の書籍CTAが出る一方、
  // 試験タグの無い general 記事（高単価の論文/午後対策本へ送客したい
  // koudo-ronjutsu-* / gyoushu-essay-* など）には書籍CTAが無かった。
  // general 分岐にも書籍ハブ /recommended-books（実在の index ルート）への
  // おすすめ書籍リンクを出すことで、全記事から書籍アフィリ funnel に到達させる。
  it("試験タグの無い記事も書籍ハブ /recommended-books へのおすすめ書籍リンクを出す", () => {
    // general 分岐の既定送客先（索引・複数区分記事用の安全側）。
    expect(source).toContain('"/recommended-books"');
    // 両分岐ともに「おすすめ書籍」ラベルの書籍導線を持つ
    // (exam分岐=/recommended-books/${post.exam}, general分岐=索引 or 精密)。
    const bookCtas = source.match(/おすすめ書籍/g) ?? [];
    expect(bookCtas.length).toBeGreaterThanOrEqual(2);
  });

  // 収益精密化: 単一区分の論文記事（gyoushu-essay-*）は general 分岐でも
  // booksExam を明示し /recommended-books/{exam} の高単価 論文事例集へ直送客する。
  it("general 分岐は post.booksExam があれば /recommended-books/{exam} へ精密送客する", () => {
    expect(source).toContain(
      "post.booksExam ? `/recommended-books/${post.booksExam}` : \"/recommended-books\"",
    );
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

  // 収益精密化（booksExam）: 単一区分の論文記事だけが精密送客先を持ち、
  // その先が実在の書籍リスト（≥1冊・空ページでない）を指すことを保証する。
  it("booksExam を持つ記事は単一区分・実在の書籍リストを指す（gyoushu-essay-* = st/pm/sa）", () => {
    const mapping: Record<string, string> = {
      "gyoushu-essay-kinyuu-strategy": "st",
      "gyoushu-essay-seizou-pm": "pm",
      "gyoushu-essay-koukyou-sa": "sa",
    };
    for (const [slug, exam] of Object.entries(mapping)) {
      const post = getBlogPostBySlug(slug);
      expect(post, `post ${slug} は存在する`).toBeTruthy();
      expect(post!.booksExam, `${slug} の精密送客先`).toBe(exam);
      // 行き先が実在ルート（有効な exam コード）かつ空ページでない（≥1冊）。
      expect(examRoutes.has(exam)).toBe(true);
      expect(
        getRecommendedBooks(exam as (typeof ALL_EXAM_CODES)[number]).length,
        `${exam} の書籍は≥1冊`,
      ).toBeGreaterThan(0);
    }
  });

  // 安全側: 複数区分を扱う論文/午後記事は booksExam を設定せず索引へ送る
  // （誤マッピング＝誇大送客を防ぐ）。
  it("複数区分を扱う記事は booksExam を設定しない（索引へ送る）", () => {
    for (const slug of [
      "koudo-ronjutsu-kakikata-kotsu",
      "koudo-ronbun-hyouka-rank",
      "gogo-kijutsu-buhanten",
    ]) {
      const post = getBlogPostBySlug(slug);
      expect(post, `post ${slug} は存在する`).toBeTruthy();
      expect(post!.booksExam, `${slug} は精密送客しない`).toBeUndefined();
    }
  });
});
