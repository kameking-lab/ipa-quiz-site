import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { getAllBlogSummaries } from "@/data/blog";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { findQuestionByRoute } from "@/lib/seo/question-url";
import { findTopicByAnySlug } from "@/lib/seo/topics";
import { SITE_BASE_URL } from "@/lib/seo/config";
import {
  renderExamsSitemapXml,
  renderBlogSitemapXml,
  renderQuestionsSitemapChunkXml,
  renderTopicsSitemapXml,
} from "@/lib/seo/sitemap-xml";
import { getSitemapChunkCount } from "@/lib/seo/sitemap-pagination";
import type { ExamCode } from "@/lib/questions/types";

function locs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(SITE_BASE_URL, ""),
  );
}

const blogSlugs = new Set(getAllBlogSummaries().map((p) => p.slug));

/**
 * Resolvability of a data-driven sitemap URL against the SAME logic its page
 * uses to decide notFound(). Static app routes are not data-driven and are out
 * of scope here (they are hand-maintained). Phase 12: GSC reported a large 404
 * count from earlier sitemaps; this guards against the generator ever emitting
 * a URL that the route would 404.
 */
function isResolvable(path: string): boolean {
  // /q/{exam}/{year-season}/{section}/{qnum}
  const q = /^\/q\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)$/.exec(path);
  if (q) {
    const found = findQuestionByRoute(ALL_QUESTIONS, {
      exam: q[1],
      yearSeason: q[2],
      section: q[3],
      qnum: q[4],
    });
    return Boolean(found && !found.needsReview);
  }
  // /{exam}/{year-season}
  const ys = /^\/([a-z]{2})\/(\d{4}-(?:spring|autumn|cbt))$/.exec(path);
  if (ys) {
    const [, exam, key] = ys;
    return getQuestionsByExamStrict(exam as ExamCode).some(
      (x) => `${x.year}-${x.season}` === key,
    );
  }
  // /{exam}/topic/{category}
  const cat = /^\/([a-z]{2})\/topic\/(.+)$/.exec(path);
  if (cat) {
    const [, exam] = cat;
    const category = decodeURIComponent(cat[2]);
    return getQuestionsByExamStrict(exam as ExamCode).some((x) => x.category === category);
  }
  // /{exam}
  const exam = /^\/([a-z]{2})$/.exec(path);
  if (exam) return getQuestionsByExamStrict(exam[1] as ExamCode).length > 0;
  // /topics/{slug}
  const topic = /^\/topics\/(.+)$/.exec(path);
  if (topic) return Boolean(findTopicByAnySlug(decodeURIComponent(topic[1])));
  // /blog/{slug}
  const blog = /^\/blog\/(.+)$/.exec(path);
  if (blog) return blogSlugs.has(decodeURIComponent(blog[1]));
  // Anything else (static app routes, /recommended-books*) is out of scope.
  return true;
}

describe("sitemap data-driven URLs all resolve (no 404s emitted)", () => {
  it("every question URL resolves to an answerable, non-needsReview question", () => {
    const chunks = getSitemapChunkCount();
    const bad: string[] = [];
    for (let i = 0; i < chunks; i += 1) {
      for (const p of locs(renderQuestionsSitemapChunkXml(i))) {
        if (!isResolvable(p)) bad.push(p);
      }
    }
    expect(bad).toEqual([]);
  });

  it("every exam hub / year-season / category URL resolves", () => {
    const bad = locs(renderExamsSitemapXml()).filter((p) => !isResolvable(p));
    expect(bad).toEqual([]);
  });

  it("every topic and blog URL resolves", () => {
    const bad = [
      ...locs(renderTopicsSitemapXml()),
      ...locs(renderBlogSitemapXml()),
    ].filter((p) => !isResolvable(p));
    expect(bad).toEqual([]);
  });
});
