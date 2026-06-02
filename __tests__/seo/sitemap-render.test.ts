/// <reference types="vite/client" />
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

/**
 * sitemap index の各エントリは、実際に配信する route handler
 * （app/sitemap/<name>.xml/route.ts）と 1:1 対応していなければならない:
 *   - index に載るが route が無い  → クローラが sitemap で 404（dead 子 sitemap）。
 *   - route があるが index に載らない → その子 sitemap がどこからも発見されない
 *     （orphan＝URL群がクロール対象から漏れる）。
 * `sitemap-render` は index の中身を、`sitemap-resolvability` は loc の解決可否を
 * 守るが、「index ↔ 配信ルートの存在対応」自体はどのテストも守っていなかった。
 * 新しい子 sitemap ルートを足して index 登録を忘れる/その逆を CI で落とす。
 */
describe("sitemap index ↔ 配信ルートの存在対応", () => {
  const indexLocs = locs(renderSitemapIndexXml());

  // app/sitemap/**/route.ts を列挙（キーのみ＝import せず＝server-only 依存を踏まない）。
  // 兄弟の app/sitemap.xml/route.ts（index 自身）は app/sitemap/ 配下でないので非対象。
  const routeKeys = Object.keys(
    import.meta.glob("../../app/sitemap/**/route.ts"),
  );

  // route キー → 配信 loc。動的（[id] 等）は接頭辞のみ返す。
  function routeToChild(
    key: string,
  ): { dynamic: true; prefix: string } | { dynamic: false; loc: string } | null {
    const m = key.match(/\/sitemap\/(.+)\/route\.ts$/);
    if (!m) return null;
    const sub = m[1]; // "main.xml" | "books.xml" | "questions/[id]"
    if (sub.includes("[")) return { dynamic: true, prefix: sub.split("/[")[0] };
    return { dynamic: false, loc: `/sitemap/${sub}` };
  }

  const childRoutes = routeKeys
    .map(routeToChild)
    .filter((r): r is NonNullable<typeof r> => r !== null);
  const staticRouteLocs = childRoutes
    .filter((r): r is { dynamic: false; loc: string } => !r.dynamic)
    .map((r) => r.loc);

  function isQuestionChunk(loc: string): boolean {
    return /^\/sitemap\/questions\/\d+\.xml$/.test(loc);
  }

  it("配信ルートを十分数検出している（空振り防止）", () => {
    // main / exams / topics / blog / books + questions/[id] = 6 想定。
    expect(childRoutes.length).toBeGreaterThanOrEqual(5);
  });

  it("全ての static 子 sitemap ルートが index に登録されている（orphan なし）", () => {
    const orphans = staticRouteLocs.filter((loc) => !indexLocs.includes(loc));
    expect(orphans).toEqual([]);
  });

  it("index の各 static エントリに配信ルートが存在する（dead エントリなし）", () => {
    const dead = indexLocs
      .filter((loc) => !isQuestionChunk(loc))
      .filter((loc) => !staticRouteLocs.includes(loc));
    expect(dead).toEqual([]);
  });

  it("question チャンクは動的ルート（questions/[id]）が配信している", () => {
    const hasChunks = indexLocs.some(isQuestionChunk);
    const hasQuestionsDynamic = childRoutes.some(
      (r) => r.dynamic && r.prefix === "questions",
    );
    // index がチャンクを載せるなら、それを配信する動的ルートが必ず要る。
    expect(hasChunks).toBe(true);
    expect(hasQuestionsDynamic).toBe(true);
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
