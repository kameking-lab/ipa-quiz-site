import { getAllBlogSummaries } from "@/data/blog";
import {
  SC_ESSAY_EXAM_CODES,
  getSCpm2Questions,
  questionToUrlParts,
} from "@/lib/essays/load";
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

// /quiz, /support, /stats are intentionally omitted: they 301 redirect to other
// pages (see next.config.ts). Sitemap should expose canonical destinations only.
const STATIC_ROUTES: UrlEntry[] = [
  { url: SITE_BASE_URL, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_BASE_URL}/modes/year`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/modes/topic`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/topics`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/glossary`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_BASE_URL}/keywords`, changeFrequency: "weekly", priority: 0.7 },
  ...KEYWORD_PAGES.map(
    (p): UrlEntry => ({
      url: `${SITE_BASE_URL}/keywords/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  ),
  { url: `${SITE_BASE_URL}/features`, changeFrequency: "monthly", priority: 0.8 },
  ...FEATURE_LANDING_PAGES.map(
    (p): UrlEntry => ({
      url: `${SITE_BASE_URL}/features/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  ),
  { url: `${SITE_BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/launch`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_BASE_URL}/api-docs`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_BASE_URL}/mock-exam`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_BASE_URL}/challenge`, changeFrequency: "daily", priority: 0.6 },
  { url: `${SITE_BASE_URL}/essay`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_BASE_URL}/ranking`, changeFrequency: "weekly", priority: 0.5 },
  { url: `${SITE_BASE_URL}/review`, changeFrequency: "weekly", priority: 0.5 },
  { url: `${SITE_BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/transparency`, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/demo/afternoon`, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/demo/essay-grading`, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_BASE_URL}/operator`, changeFrequency: "yearly", priority: 0.2 },
];

function getBlogRoutes(): UrlEntry[] {
  return getAllBlogSummaries().map((p) => ({
    url: `${SITE_BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
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
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const g of groupByYearSeason(questions)) {
      entries.push({
        url: `${SITE_BASE_URL}/${exam}/${g.key}`,
        changeFrequency: "yearly",
        priority: 0.65,
      });
    }
    for (const c of groupByCategory(questions)) {
      entries.push({
        url: `${SITE_BASE_URL}/${exam}/topic/${encodeURIComponent(c.category)}`,
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

function getEssayRoutes(): UrlEntry[] {
  const entries: UrlEntry[] = [];
  for (const exam of SC_ESSAY_EXAM_CODES) {
    entries.push({
      url: `${SITE_BASE_URL}/essays/${exam}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const q of getSCpm2Questions()) {
      const { yearSeason, section, qnum } = questionToUrlParts(q);
      entries.push({
        url: `${SITE_BASE_URL}/essays/${exam}/${yearSeason}/${section}/${qnum}`,
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }
  }
  return entries;
}

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
    `${SITE_BASE_URL}/sitemap/essays.xml`,
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
  const now = new Date().toISOString();
  return renderUrlSet(STATIC_ROUTES.map((r) => ({ ...r, lastModified: now })));
}

export function renderExamsSitemapXml(): string {
  const now = new Date().toISOString();
  return renderUrlSet(getExamHubRoutes().map((r) => ({ ...r, lastModified: now })));
}

export function renderTopicsSitemapXml(): string {
  const now = new Date().toISOString();
  return renderUrlSet(getTopicHubRoutes().map((r) => ({ ...r, lastModified: now })));
}

export function renderBlogSitemapXml(): string {
  return renderUrlSet(getBlogRoutes());
}

export function renderBooksSitemapXml(): string {
  const now = new Date().toISOString();
  return renderUrlSet(getBookRoutes().map((r) => ({ ...r, lastModified: now })));
}

export function renderQuestionsSitemapChunkXml(pageIndex: number): string {
  const now = new Date().toISOString();
  const indexable = getIndexableQuestions();
  const start = pageIndex * SITEMAP_CHUNK_SIZE;
  const slice = indexable.slice(start, start + SITEMAP_CHUNK_SIZE);
  return renderUrlSet(
    slice.map((q) => ({
      url: `${SITE_BASE_URL}${questionPagePath(q)}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  );
}

export function renderEssaysSitemapXml(): string {
  const now = new Date().toISOString();
  return renderUrlSet(getEssayRoutes().map((r) => ({ ...r, lastModified: now })));
}

/**
 * Backwards-compat: the legacy /sitemap/[id].xml route still serves a single
 * combined chunk (static + exams + topics + blog + books on chunk 0, questions
 * on every chunk). Kept so deployed crawlers transitioning to the new index
 * structure continue to receive valid XML.
 */
export function renderSitemapChunkXml(pageIndex: number): string {
  const now = new Date().toISOString();
  const indexable = getIndexableQuestions();
  const start = pageIndex * SITEMAP_CHUNK_SIZE;
  const slice = indexable.slice(start, start + SITEMAP_CHUNK_SIZE);

  const questionEntries: UrlEntry[] = slice.map((q) => ({
    url: `${SITE_BASE_URL}${questionPagePath(q)}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const base: UrlEntry[] =
    pageIndex === 0
      ? [
          ...STATIC_ROUTES.map((r) => ({ ...r, lastModified: now })),
          ...getExamHubRoutes().map((r) => ({ ...r, lastModified: now })),
          ...getTopicHubRoutes().map((r) => ({ ...r, lastModified: now })),
          ...getBookRoutes().map((r) => ({ ...r, lastModified: now })),
          ...getBlogRoutes(),
        ]
      : [];

  return renderUrlSet([...base, ...questionEntries]);
}
