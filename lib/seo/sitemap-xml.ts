import { getAllBlogSummaries } from "@/data/blog";
import { getLastUpdatedISO } from "@/lib/questions/last-updated";
import { SITE_BASE_URL } from "./config";
import {
  getAvailableExams,
  getQuestionsByExamStrict,
  groupByCategory,
  groupByYearSeason,
} from "./exam-meta";
import { questionPagePath } from "./question-url";
import {
  SITEMAP_CHUNK_SIZE,
  getIndexableQuestions,
  getSitemapChunkCount,
} from "./sitemap-pagination";
import { getHubTopics } from "./topics";
import { KEYWORD_PAGES } from "@/data/keywords";
import { FEATURE_LANDING_PAGES } from "@/data/features";

// Build date (YYYY-MM-DD). Auto-advances every deploy, so genuinely static
// pages no longer carry a hand-maintained literal that goes stale (E-5).
const STATIC_CONTENT_DATE = new Date().toISOString().slice(0, 10);
// Newest question last-updated date, computed from the data — auto-advances
// when content is regenerated instead of being a fixed literal (E-5).
const CONTENT_LAST_UPDATED = ((): string => {
  let max = "";
  for (const q of getIndexableQuestions()) {
    const d = getLastUpdatedISO(q);
    if (d > max) max = d;
  }
  return max || STATIC_CONTENT_DATE;
})();
// Hub blog article slugs from PR #241 — receive elevated priority 0.8
const HUB_BLOG_SLUGS = new Set([
  "kakumon-gakushuu-science",
  "ap-goukaku-go-koudo-senryaku",
  "ipa-shiken-kumi-awase-senryaku",
  "ipa-kyoutsuu-juyou-theme",
  "ipa-sanko-mondaishu-2026",
]);

interface UrlEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: string;
  priority?: number;
}

const RECOMMENDED_BOOKS_EXAMS = [
  "ip",
  "sg",
  "fe",
  "ap",
  "sc",
  "nw",
  "db",
  "es",
  "st",
  "sa",
  "pm",
  "sm",
  "au",
] as const;

// /quiz, /support are intentionally omitted: they 301 redirect to other pages
// (see next.config.ts). Sitemap should expose canonical destinations only.
// /stats is included below as a first-class public dashboard.
// /api-docs, /review, /my-progress, /bookmarks, /quiz/review, /chat/share,
// /demo/*, /final-review-v3, /strategy-discussion-v2, /admin/*, /account/*,
// /auth/*, /study-plan/result/[id], /offline are intentionally omitted because
// they carry `robots: { index: false }` in their page metadata or are blocked
// by robots.txt. Including them here would contradict crawler signals.
const STATIC_ROUTES: UrlEntry[] = [
  { url: SITE_BASE_URL, lastModified: STATIC_CONTENT_DATE, changeFrequency: "daily", priority: 1 },
  { url: `${SITE_BASE_URL}/search`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_BASE_URL}/modes/year`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/modes/topic`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/topics`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/glossary`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_BASE_URL}/keywords`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "weekly", priority: 0.7 },
  ...KEYWORD_PAGES.map(
    (p): UrlEntry => ({
      url: `${SITE_BASE_URL}/keywords/${p.slug}`,
      lastModified: CONTENT_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  ),
  { url: `${SITE_BASE_URL}/features`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.8 },
  ...FEATURE_LANDING_PAGES.map(
    (p): UrlEntry => ({
      url: `${SITE_BASE_URL}/features/${p.slug}`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  ),
  { url: `${SITE_BASE_URL}/why-kakomon-ai`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  // /success-stories と /essays は AI 生成の架空コンテンツで noindex（致命傷③）。
  // noindex ページを sitemap に載せるとクローラ signal が矛盾するため除外する。
  { url: `${SITE_BASE_URL}/mock-exam`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_BASE_URL}/challenge`, changeFrequency: "daily", priority: 0.6 },
  { url: `${SITE_BASE_URL}/essay`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_BASE_URL}/quiz/stream`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_BASE_URL}/study-plan`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_BASE_URL}/student`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_BASE_URL}/referral`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/ranking`, changeFrequency: "weekly", priority: 0.5 },
  { url: `${SITE_BASE_URL}/sitemap`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "weekly", priority: 0.5 },
  { url: `${SITE_BASE_URL}/faq`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/about`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/contact`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/transparency`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/community-guidelines`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/updates`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/license`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_BASE_URL}/stats`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_BASE_URL}/terms`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_BASE_URL}/privacy`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "yearly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/operator`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "yearly", priority: 0.2 },
];

function getBlogRoutes(): UrlEntry[] {
  return getAllBlogSummaries().map((p) => ({
    url: `${SITE_BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt,
    changeFrequency: "monthly",
    priority: HUB_BLOG_SLUGS.has(p.slug) ? 0.8 : 0.7,
  }));
}

function getBookRoutes(): UrlEntry[] {
  const out: UrlEntry[] = [
    { url: `${SITE_BASE_URL}/recommended-books`, changeFrequency: "monthly", priority: 0.7 },
  ];
  for (const exam of RECOMMENDED_BOOKS_EXAMS) {
    out.push({
      url: `${SITE_BASE_URL}/recommended-books/${exam}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  return out;
}

function getExamHubRoutes(): UrlEntry[] {
  const entries: UrlEntry[] = [];
  for (const exam of getAvailableExams()) {
    const questions = getQuestionsByExamStrict(exam);
    entries.push({
      url: `${SITE_BASE_URL}/${exam}`,
      lastModified: CONTENT_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const g of groupByYearSeason(questions)) {
      entries.push({
        url: `${SITE_BASE_URL}/${exam}/${g.key}`,
        lastModified: CONTENT_LAST_UPDATED,
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
    for (const c of groupByCategory(questions)) {
      entries.push({
        url: `${SITE_BASE_URL}/${exam}/topic/${encodeURIComponent(c.category)}`,
        lastModified: CONTENT_LAST_UPDATED,
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }
  }
  return entries;
}

function getTopicHubRoutes(): UrlEntry[] {
  return getHubTopics(80, 4).map((t) => ({
    url: `${SITE_BASE_URL}/topics/${encodeURIComponent(t.slug)}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
}

// NOTE: /essays and /success-stories sitemaps were removed — those pages are
// noindex (phase 10), so listing them contradicted the crawler signal. The
// orphaned /sitemap/essays.xml and /sitemap/success-stories.xml routes are
// deleted too (phase 11 / E-2).

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderUrl(entry: UrlEntry): string {
  const parts = [`<loc>${xmlEscape(entry.url)}</loc>`];
  if (entry.lastModified) parts.push(`<lastmod>${entry.lastModified}</lastmod>`);
  if (entry.changeFrequency)
    parts.push(`<changefreq>${entry.changeFrequency}</changefreq>`);
  if (entry.priority !== undefined)
    parts.push(`<priority>${entry.priority}</priority>`);
  return `  <url>${parts.join("")}</url>`;
}

function renderUrlSet(entries: UrlEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(renderUrl).join("\n")}
</urlset>
`;
}

/**
 * トップレベル sitemap index。
 * カテゴリ別 sitemap (main/exams/topics/blog/books/questions chunks) を束ねる。
 */
export function renderSitemapIndexXml(): string {
  const now = new Date().toISOString();
  const entries: string[] = [
    `${SITE_BASE_URL}/sitemap/main.xml`,
    `${SITE_BASE_URL}/sitemap/exams.xml`,
    `${SITE_BASE_URL}/sitemap/topics.xml`,
    `${SITE_BASE_URL}/sitemap/blog.xml`,
    `${SITE_BASE_URL}/sitemap/books.xml`,
    // /sitemap/essays.xml と /sitemap/success-stories.xml は意図的に外す:
    // 配下ページは noindex（致命傷③）であり、sitemap 掲載は矛盾シグナルになる。
  ];
  const chunkCount = getSitemapChunkCount();
  for (let i = 0; i < chunkCount; i += 1) {
    entries.push(`${SITE_BASE_URL}/sitemap/questions/${i}.xml`);
  }
  const items = entries
    .map(
      (loc) =>
        `  <sitemap><loc>${xmlEscape(loc)}</loc><lastmod>${now}</lastmod></sitemap>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>
`;
}

export function renderMainSitemapXml(): string {
  // STATIC_ROUTES entries already carry per-entry lastModified dates.
  // Dynamic pages (/topics index, /stats, /challenge, /blog, /ranking, /review)
  // that reflect live data get the current build timestamp as a fallback.
  const now = new Date().toISOString();
  return renderUrlSet(
    STATIC_ROUTES.map((r) => ({ lastModified: now, ...r })),
  );
}

export function renderExamsSitemapXml(): string {
  // Exam routes already carry per-entry lastModified from getExamHubRoutes().
  return renderUrlSet(getExamHubRoutes());
}

export function renderTopicsSitemapXml(): string {
  const now = new Date().toISOString();
  return renderUrlSet(getTopicHubRoutes().map((r) => ({ ...r, lastModified: now })));
}

export function renderBlogSitemapXml(): string {
  return renderUrlSet(getBlogRoutes());
}

export function renderBooksSitemapXml(): string {
  return renderUrlSet(getBookRoutes().map((r) => ({ ...r, lastModified: CONTENT_LAST_UPDATED })));
}

export function renderQuestionsSitemapChunkXml(pageIndex: number): string {
  const indexable = getIndexableQuestions();
  const start = pageIndex * SITEMAP_CHUNK_SIZE;
  const slice = indexable.slice(start, start + SITEMAP_CHUNK_SIZE);
  return renderUrlSet(
    slice.map((q) => ({
      url: `${SITE_BASE_URL}${questionPagePath(q)}`,
      lastModified: getLastUpdatedISO(q),
      changeFrequency: "yearly",
      priority: 0.5,
    })),
  );
}

