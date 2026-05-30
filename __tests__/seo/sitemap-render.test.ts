import { describe, expect, it } from "vitest";

import { SITE_BASE_URL } from "@/lib/seo/config";
import {
  getIndexableQuestions,
  getSitemapChunkCount,
  SITEMAP_CHUNK_SIZE,
} from "@/lib/seo/sitemap-pagination";
import {
  renderBlogSitemapXml,
  renderBooksSitemapXml,
  renderExamsSitemapXml,
  renderMainSitemapXml,
  renderQuestionsSitemapChunkXml,
  renderSitemapIndexXml,
  renderTopicsSitemapXml,
} from "@/lib/seo/sitemap-xml";

function locs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(SITE_BASE_URL, ""),
  );
}

const ALL_RENDERERS: ReadonlyArray<[string, () => string]> = [
  ["index", renderSitemapIndexXml],
  ["main", renderMainSitemapXml],
  ["exams", renderExamsSitemapXml],
  ["topics", renderTopicsSitemapXml],
  ["blog", renderBlogSitemapXml],
  ["books", renderBooksSitemapXml],
  ["questions[0]", () => renderQuestionsSitemapChunkXml(0)],
];

describe("sitemap XML well-formedness", () => {
  it.each(ALL_RENDERERS)(
    "%s starts with a single UTF-8 XML declaration",
    (_name, render) => {
      const xml = render();
      expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
      // Exactly one declaration — never a doubled/embedded prolog.
      expect((xml.match(/<\?xml/g) ?? []).length).toBe(1);
    },
  );

  it.each(ALL_RENDERERS)("%s has balanced container tags", (_name, render) => {
    const xml = render();
    const opens = (xml.match(/<loc>/g) ?? []).length;
    const closes = (xml.match(/<\/loc>/g) ?? []).length;
    expect(opens).toBe(closes);
  });

  it("urlset renderers wrap entries in matched <url> elements", () => {
    for (const render of [
      renderMainSitemapXml,
      renderExamsSitemapXml,
      renderBooksSitemapXml,
    ]) {
      const xml = render();
      expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      const urlOpens = (xml.match(/<url>/g) ?? []).length;
      const urlCloses = (xml.match(/<\/url>/g) ?? []).length;
      expect(urlOpens).toBe(urlCloses);
      // Every <url> carries exactly one <loc>.
      expect((xml.match(/<loc>/g) ?? []).length).toBe(urlOpens);
    }
  });
});

describe("renderSitemapIndexXml", () => {
  const xml = renderSitemapIndexXml();
  const indexLocs = locs(xml);

  it("uses the sitemapindex root and lists the category sitemaps", () => {
    expect(xml).toContain(
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    for (const name of ["main", "exams", "topics", "blog", "books"]) {
      expect(indexLocs).toContain(`/sitemap/${name}.xml`);
    }
  });

  it("lists exactly one question chunk per getSitemapChunkCount()", () => {
    const chunkLocs = indexLocs.filter((p) =>
      /^\/sitemap\/questions\/\d+\.xml$/.test(p),
    );
    const count = getSitemapChunkCount();
    expect(chunkLocs.length).toBe(count);
    for (let i = 0; i < count; i += 1) {
      expect(chunkLocs).toContain(`/sitemap/questions/${i}.xml`);
    }
  });

  it("excludes noindex category sitemaps (essays / success-stories)", () => {
    // /essays and /success-stories are noindex (致命傷③); listing their
    // sitemaps would contradict the crawler signal.
    expect(indexLocs).not.toContain("/sitemap/essays.xml");
    expect(indexLocs).not.toContain("/sitemap/success-stories.xml");
  });
});

describe("renderMainSitemapXml route contract", () => {
  const mainLocs = locs(renderMainSitemapXml());

  it("includes the homepage at top priority", () => {
    expect(mainLocs).toContain("");
    expect(renderMainSitemapXml()).toMatch(/<priority>1<\/priority>/);
  });

  it("includes representative public routes", () => {
    for (const path of ["/about", "/search", "/topics", "/blog", "/stats"]) {
      expect(mainLocs).toContain(path);
    }
  });

  it("omits 301-redirect routes (canonical destinations only)", () => {
    // /quiz and /support 301-redirect (next.config.ts); /quiz/stream is the
    // real route and must remain.
    expect(mainLocs).not.toContain("/quiz");
    expect(mainLocs).not.toContain("/support");
    expect(mainLocs).toContain("/quiz/stream");
  });

  it("omits noindex routes", () => {
    for (const path of [
      "/essays",
      "/success-stories",
      "/bookmarks",
      "/review",
      "/my-progress",
    ]) {
      expect(mainLocs).not.toContain(path);
    }
  });

  it("every entry carries a lastmod fallback", () => {
    const xml = renderMainSitemapXml();
    const urlCount = (xml.match(/<url>/g) ?? []).length;
    const lastmodCount = (xml.match(/<lastmod>/g) ?? []).length;
    expect(lastmodCount).toBe(urlCount);
  });
});

describe("renderBooksSitemapXml", () => {
  const xml = renderBooksSitemapXml();
  const bookLocs = locs(xml);

  it("lists the index plus one route per recommended-books exam", () => {
    expect(bookLocs).toContain("/recommended-books");
    // 13 exam-specific pages (ip..au) + the index.
    expect(bookLocs.length).toBe(14);
    for (const exam of ["ip", "sg", "fe", "ap", "sc", "nw", "db", "es", "st", "sa", "pm", "sm", "au"]) {
      expect(bookLocs).toContain(`/recommended-books/${exam}`);
    }
  });

  it("stamps every entry with a lastmod", () => {
    const urlCount = (xml.match(/<url>/g) ?? []).length;
    const lastmodCount = (xml.match(/<lastmod>/g) ?? []).length;
    expect(lastmodCount).toBe(urlCount);
  });
});

describe("renderQuestionsSitemapChunkXml pagination", () => {
  it("partitions all indexable questions across chunks without loss or overlap", () => {
    const count = getSitemapChunkCount();
    const seen: string[] = [];
    for (let i = 0; i < count; i += 1) {
      const chunkLocs = locs(renderQuestionsSitemapChunkXml(i));
      expect(chunkLocs.length).toBeLessThanOrEqual(SITEMAP_CHUNK_SIZE);
      seen.push(...chunkLocs);
    }
    expect(seen.length).toBe(getIndexableQuestions().length);
    // No URL appears in two chunks.
    expect(new Set(seen).size).toBe(seen.length);
  });

  it("returns a well-formed but empty urlset for an out-of-range chunk", () => {
    const xml = renderQuestionsSitemapChunkXml(getSitemapChunkCount());
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain("<urlset");
    expect((xml.match(/<url>/g) ?? []).length).toBe(0);
  });
});
