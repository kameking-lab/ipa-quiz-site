import { SITE_BASE_URL } from "./config";
import { questionPagePath } from "./question-url";
import {
  SITEMAP_CHUNK_SIZE,
  getIndexableQuestions,
  getSitemapChunkCount,
} from "./sitemap-pagination";

interface UrlEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: string;
  priority?: number;
}

const STATIC_ROUTES: UrlEntry[] = [
  { url: SITE_BASE_URL, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_BASE_URL}/modes/year`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/modes/topic`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_BASE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_BASE_URL}/operator`, changeFrequency: "yearly", priority: 0.2 },
];

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

export function renderSitemapIndexXml(): string {
  const count = getSitemapChunkCount();
  const now = new Date().toISOString();
  const items = Array.from(
    { length: count },
    (_, i) =>
      `  <sitemap><loc>${SITE_BASE_URL}/sitemap/${i}.xml</loc><lastmod>${now}</lastmod></sitemap>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>
`;
}

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
      ? STATIC_ROUTES.map((r) => ({ ...r, lastModified: now }))
      : [];

  const items = [...base, ...questionEntries].map(renderUrl).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`;
}
