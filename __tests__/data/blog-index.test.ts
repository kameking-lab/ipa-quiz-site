import { describe, expect, it } from "vitest";

import {
  getAllBlogPosts,
  getAllBlogSlugs,
  getAllBlogSummaries,
  getBlogPostBySlug,
  getBlogPostsByExam,
  getRelatedPosts,
} from "@/data/blog";
import {
  getAvailableExams,
  getQuestionsByExamStrict,
  groupByCategory,
} from "@/lib/seo/exam-meta";

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

  it("keeps the 科目B (foundation) cluster mutually interlinked", () => {
    // The 土台=科目B pillar funnel relies on the three FE 科目B articles
    // (完全対策 / 擬似言語 / アルゴリズム苦手克服) forming a closed cluster so a
    // reader landing on any one is one click from the other two. The central
    // 完全対策 pillar previously linked outward to siblings but not back; pin
    // the reciprocity so a future relatedSlugs edit can't silently sever it.
    const cluster = [
      "fe-kamoku-b-taisaku",
      "fe-kamoku-b-pseudo-language",
      "fe-algorithm-nigate-kokufuku",
    ];
    for (const slug of cluster) {
      const related = new Set(getRelatedPosts(slug, 4).map((r) => r.slug));
      for (const sibling of cluster) {
        if (sibling === slug) continue;
        expect(related.has(sibling)).toBe(true);
      }
    }
  });

  it("keeps the AP 午後 selection rail on-topic (no cross-exam 科目B leak)", () => {
    // The route renders the related rail with getRelatedPosts(slug, 4). The
    // 応用情報 午後選択戦略 article previously carried off-topic
    // fe-kamoku-b-taisaku (基本情報 科目B — different exam, foundation cluster)
    // in slot 2, so an AP 午後 reader was sent to an unrelated FE article while
    // an on-topic AP 午後 sibling was pushed out of the 4-slot rail (the same
    // relevance leak fixed for the 科目B cluster in an earlier pass). Pin the
    // AP 午後 selection article's rail to stay on-topic: it must surface the
    // 文系選択 sibling and must not surface the 科目B pillar.
    const rail = getRelatedPosts("ap-gogo-sentaku", 4).map((r) => r.slug);
    expect(rail).toContain("ap-gogo-bunkei-sentaku");
    expect(rail).not.toContain("fe-kamoku-b-taisaku");
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

  it("every in-body /<exam>/topic/<category> deep-link resolves to a generated topic", () => {
    // Bodies may deep-link into the category pool, e.g.
    // `](/fe/topic/%E3%82%A2...)`. That route is dynamicParams=false +
    // notFound(), and its static params are groupByCategory() of the exam's
    // strict questions — so a stale/mis-encoded category renders a link that
    // 404s. The 2-letter exam-hub guard above does not cover the /topic/ tail;
    // pin every topic deep-link to a real (exam, category) pair.
    const valid = new Set<string>();
    for (const exam of getAvailableExams()) {
      for (const c of groupByCategory(getQuestionsByExamStrict(exam))) {
        valid.add(`${exam}/topic/${encodeURIComponent(c.category)}`);
      }
    }
    const topicLinkRe = /\]\(\/([a-z]{2}\/topic\/[^)]+)\)/g;
    const dead: string[] = [];
    let seen = 0;
    for (const p of ALL) {
      for (const m of p.body.matchAll(topicLinkRe)) {
        seen++;
        if (!valid.has(m[1])) dead.push(`${p.slug} -> /${m[1]}`);
      }
    }
    // Non-vacuous: at least the algorithm-pool deep-link must be exercised.
    expect(seen).toBeGreaterThan(0);
    expect(dead).toEqual([]);
  });

  it("every in-body /<exam> hub link points to an available exam", () => {
    // The biggest internal-link namespace in bodies is the exam hub `](/ap)`,
    // `](/sc)` etc. /[exam] is dynamicParams=false + notFound(), so a code not
    // in getAvailableExams() renders a link that 404s. Exam codes are the only
    // two-letter top-level route segment editors link to (the sole other
    // two-char route, /og, is an image endpoint), so a two-letter body link is
    // an exam-hub link and must resolve.
    const exams = new Set<string>(getAvailableExams());
    const examLinkRe = /\]\(\/([a-z]{2})\)/g;
    const dead: string[] = [];
    for (const p of ALL) {
      for (const m of p.body.matchAll(examLinkRe)) {
        if (!exams.has(m[1])) dead.push(`${p.slug} -> /${m[1]}`);
      }
    }
    expect(dead).toEqual([]);
  });
});
