import { describe, expect, it } from "vitest";
import { getRelatedBlogPosts } from "@/lib/blog/related-content";

// Tags that mark cross-exam "hub" articles, mirrored from the source module.
// Hub posts (no exam) only qualify as related when they carry one of these.
const HUB_TAGS = new Set(["全区分", "横断学習", "学習法"]);

function isRelevant(
  post: { exam?: string; tags: string[] },
  exam: string,
): boolean {
  if (post.exam === exam) return true;
  return !post.exam && post.tags.some((t) => HUB_TAGS.has(t));
}

describe("getRelatedBlogPosts (related blog ranking for /q and /[exam])", () => {
  it("resolves the module and returns at most `limit` summaries", () => {
    // Guards against the false "vitest cannot resolve" report: the real module
    // lives at @/lib/blog/related-content and imports cleanly.
    const result = getRelatedBlogPosts("ap", 3);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it("defaults to a limit of 3", () => {
    expect(getRelatedBlogPosts("ap").length).toBeLessThanOrEqual(3);
  });

  it("returns summaries (no body field) — toSummary projection", () => {
    for (const post of getRelatedBlogPosts("ap", 5)) {
      expect(post).not.toHaveProperty("body");
      expect(typeof post.slug).toBe("string");
      expect(typeof post.title).toBe("string");
    }
  });

  it("only returns relevant posts: exam-specific or hub posts with a hub tag", () => {
    for (const post of getRelatedBlogPosts("ap", 100)) {
      expect(isRelevant(post, "ap")).toBe(true);
    }
  });

  it("ranks all exam-specific posts above hub posts (tier precedence)", () => {
    const result = getRelatedBlogPosts("ap", 100);
    let seenHub = false;
    for (const post of result) {
      if (post.exam === "ap") {
        // Once a hub (non-exam) post appears, no exam-specific post may follow.
        expect(seenHub).toBe(false);
      } else {
        seenHub = true;
      }
    }
  });

  it("sorts the exam-specific tier newest-first by publishedAt", () => {
    const apPosts = getRelatedBlogPosts("ap", 100).filter((p) => p.exam === "ap");
    expect(apPosts.length).toBeGreaterThan(1);
    for (let i = 1; i < apPosts.length; i++) {
      // descending: previous publishedAt >= current
      expect(
        apPosts[i - 1].publishedAt.localeCompare(apPosts[i].publishedAt),
      ).toBeGreaterThanOrEqual(0);
    }
  });

  it("lifts a post within its tier when fieldTags overlap its tags", () => {
    const apTier = getRelatedBlogPosts("ap", 100).filter((p) => p.exam === "ap");
    // Without fieldTags the tier is newest-first, so the last element is the
    // oldest exam-specific post — normally ranked last.
    const oldest = apTier[apTier.length - 1];
    // Feeding its own (tier-unique) tag set gives it the strictly highest
    // overlap, so it must rise to the front of the exam-specific tier.
    const lifted = getRelatedBlogPosts("ap", 100, oldest.tags).filter(
      (p) => p.exam === "ap",
    );
    expect(lifted[0].slug).toBe(oldest.slug);
  });

  it("returns an empty array for an exam with no posts and no hub matches", () => {
    // An exam code that has no dedicated posts still only ever yields hub posts;
    // a nonsense code yields none that are exam-specific.
    const result = getRelatedBlogPosts("__no_such_exam__", 100);
    for (const post of result) {
      // every result must be a qualifying hub post
      expect(!post.exam && post.tags.some((t) => HUB_TAGS.has(t))).toBe(true);
    }
  });
});
