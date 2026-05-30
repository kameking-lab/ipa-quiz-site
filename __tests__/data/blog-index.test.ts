import { describe, expect, it } from "vitest";

import {
  getAllBlogPosts,
  getAllBlogSlugs,
  getAllBlogSummaries,
  getBlogPostBySlug,
  getBlogPostsByExam,
  getRelatedPosts,
} from "@/data/blog";

// Characterization tests for the blog post registry (data/blog/index.ts),
// consumed by the /blog routes: getAllBlogSlugs feeds generateStaticParams,
// getBlogPostBySlug renders the post page, getRelatedPosts powers the
// "related posts" rail. The post set is built deterministically at module load
// from the generators, so we pin structural invariants (uniqueness, ordering,
// relevance, limit/self-exclusion) rather than brittle exact content.

const ALL = getAllBlogPosts();

describe("getAllBlogPosts / getAllBlogSlugs", () => {
  it("produces a non-empty set with unique slugs (no silent BY_SLUG collisions)", () => {
    const slugs = getAllBlogSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    // A duplicate slug would be silently dropped by the BY_SLUG Map and break
    // getBlogPostBySlug for one of them — assert the slug space is collision-free.
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBe(ALL.length);
  });
});

describe("getAllBlogSummaries", () => {
  it("returns one summary per post, newest first, with no body field", () => {
    const summaries = getAllBlogSummaries();
    expect(summaries.length).toBe(ALL.length);
    for (let i = 1; i < summaries.length; i++) {
      expect(
        summaries[i - 1].publishedAt.localeCompare(summaries[i].publishedAt),
      ).toBeGreaterThanOrEqual(0);
    }
    // Summary is a projection — it must not leak the heavy body.
    expect(summaries[0]).not.toHaveProperty("body");
  });
});

describe("getBlogPostBySlug", () => {
  it("round-trips a real slug and returns undefined for an unknown one", () => {
    const slug = getAllBlogSlugs()[0];
    expect(getBlogPostBySlug(slug)?.slug).toBe(slug);
    expect(getBlogPostBySlug("no-such-slug-xyz")).toBeUndefined();
  });
});

describe("getBlogPostsByExam", () => {
  it("returns only posts for that exam, newest first", () => {
    const exam = ALL.find((p) => p.exam)?.exam;
    expect(exam).toBeTruthy();
    const posts = getBlogPostsByExam(exam as string);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.exam === exam)).toBe(true);
    for (let i = 1; i < posts.length; i++) {
      expect(
        posts[i - 1].publishedAt.localeCompare(posts[i].publishedAt),
      ).toBeGreaterThanOrEqual(0);
    }
  });

  it("returns an empty array for an exam with no posts", () => {
    expect(getBlogPostsByExam("not-an-exam")).toEqual([]);
  });
});

describe("getRelatedPosts", () => {
  it("returns an empty array for an unknown slug", () => {
    expect(getRelatedPosts("no-such-slug-xyz")).toEqual([]);
  });

  it("never exceeds the limit, never includes the target, and has no duplicates", () => {
    for (const limit of [1, 3, 5]) {
      for (const target of ALL) {
        const related = getRelatedPosts(target.slug, limit);
        expect(related.length).toBeLessThanOrEqual(limit);
        expect(related.some((r) => r.slug === target.slug)).toBe(false);
        expect(new Set(related.map((r) => r.slug)).size).toBe(related.length);
      }
    }
  });

  it("has a known off-by-one at limit=0: at most one explicit relation can leak", () => {
    // The in-loop `>= limit` cap check runs AFTER the push, so limit=0 returns
    // 0 or 1 (an explicit head), not strictly []. No production caller passes 0
    // (routes use the default 3); pinned so a future tightening is a conscious
    // change rather than a silent one.
    for (const target of ALL) {
      expect(getRelatedPosts(target.slug, 0).length).toBeLessThanOrEqual(1);
    }
  });

  it("every related post is explicit, shares the exam, or shares a tag", () => {
    for (const target of ALL) {
      const explicit = new Set(target.relatedSlugs ?? []);
      for (const r of getRelatedPosts(target.slug, 3)) {
        const relevant =
          explicit.has(r.slug) ||
          r.exam === target.exam ||
          r.tags.some((t) => target.tags.includes(t));
        expect(relevant).toBe(true);
      }
    }
  });

  it("prioritises resolvable explicit relatedSlugs at the front of the result", () => {
    const slugSet = new Set(getAllBlogSlugs());
    const target = ALL.find(
      (p) => (p.relatedSlugs ?? []).some((s) => slugSet.has(s) && s !== p.slug),
    );
    // Only meaningful if the generated data actually wires explicit relations.
    if (!target) return;
    const resolvableExplicit = (target.relatedSlugs ?? []).filter(
      (s) => slugSet.has(s) && s !== target.slug,
    );
    const related = getRelatedPosts(target.slug, 3);
    const expectedFront = resolvableExplicit.slice(0, related.length);
    expect(related.slice(0, expectedFront.length).map((r) => r.slug)).toEqual(
      expectedFront,
    );
  });
});

describe("explicit relatedSlugs integrity (no dead internal-link intent)", () => {
  // getRelatedPosts silently *drops* any relatedSlugs entry that does not
  // resolve to an existing post, so a typo'd or stale explicit relation never
  // surfaces as a test failure — it just quietly removes a curated internal
  // link (an SEO/UX loss). Per-generator round-trips were pinned for the
  // exam-keyed generators, but the cross-generator slug space (which
  // buildGeneralPosts references) had no global guard. Pin it here: every
  // explicit relation must resolve to another real post.
  const slugSet = new Set(getAllBlogSlugs());

  it("every relatedSlugs entry resolves to an existing post", () => {
    const dangling: string[] = [];
    for (const p of ALL) {
      for (const s of p.relatedSlugs ?? []) {
        if (!slugSet.has(s)) dangling.push(`${p.slug} -> ${s}`);
      }
    }
    expect(dangling).toEqual([]);
  });

  it("no post lists itself as a related post", () => {
    const selfRefs = ALL.filter((p) =>
      (p.relatedSlugs ?? []).includes(p.slug),
    ).map((p) => p.slug);
    expect(selfRefs).toEqual([]);
  });

  it("every in-body /blog/<slug> cross-link resolves to an existing post", () => {
    // Bodies carry hand-authored markdown cross-links like `](/blog/foo-bar)`.
    // A typo'd slug renders a 200-looking link that 404s on click — a dead
    // internal link that erodes crawl/UX. The /[exam] practice CTA is pinned
    // per generator, but body-to-body /blog/ links had no guard.
    const linkRe = /\]\(\/blog\/([a-z0-9-]+)\)/g;
    const dead: string[] = [];
    for (const p of ALL) {
      for (const m of p.body.matchAll(linkRe)) {
        if (!slugSet.has(m[1])) dead.push(`${p.slug} -> /blog/${m[1]}`);
      }
    }
    expect(dead).toEqual([]);
  });
});
