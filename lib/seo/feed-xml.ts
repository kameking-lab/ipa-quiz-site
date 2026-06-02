import { getAllBlogSummaries } from "@/data/blog";
import { SITE_BASE_URL, SITE_NAME, SITE_TAGLINE } from "./config";

// ブログの RSS 2.0 フィード。127本の記事に対しフィードが存在せず、
// フィードリーダー／アグリゲータからのコンテンツ発見口が皆無だった
// 取り残しを解消する（集客＝コンテンツ配信の発見性向上）。
// sitemap-xml.ts と同じく getAllBlogSummaries()（新着順）を単一情報源とし、
// 既存のクロール資産（/blog 索引・sitemap/blog.xml）と整合する。
export const FEED_PATH = "/feed.xml";

const FEED_TITLE = `${SITE_NAME} ブログ`;
const FEED_DESCRIPTION = `${SITE_TAGLINE}。IPA 情報処理技術者試験の午後AI採点・基本情報 科目B 対策・勉強法の最新記事。`;

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ISO 文字列 → RFC-822（RSS の pubDate / lastBuildDate が要求する形式）。
// publishedAt/updatedAt は全て ISO 文字列ゆえ Date でパース可能。
function toRfc822(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toUTCString();
}

export function renderBlogFeedXml(): string {
  const posts = getAllBlogSummaries(); // 新着順（publishedAt 降順）
  const selfUrl = `${SITE_BASE_URL}${FEED_PATH}`;
  const lastBuild =
    posts.length > 0 ? toRfc822(posts[0].updatedAt ?? posts[0].publishedAt) : "";

  const items = posts
    .map((p) => {
      const url = `${SITE_BASE_URL}/blog/${p.slug}`;
      const pub = toRfc822(p.updatedAt ?? p.publishedAt);
      const parts = [
        `<title>${xmlEscape(p.title)}</title>`,
        `<link>${xmlEscape(url)}</link>`,
        `<guid isPermaLink="true">${xmlEscape(url)}</guid>`,
        `<description>${xmlEscape(p.description)}</description>`,
      ];
      if (pub) parts.push(`<pubDate>${pub}</pubDate>`);
      for (const t of p.tags) parts.push(`<category>${xmlEscape(t)}</category>`);
      return `  <item>\n    ${parts.join("\n    ")}\n  </item>`;
    })
    .join("\n");

  const channelMeta = [
    `<title>${xmlEscape(FEED_TITLE)}</title>`,
    `<link>${xmlEscape(`${SITE_BASE_URL}/blog`)}</link>`,
    `<description>${xmlEscape(FEED_DESCRIPTION)}</description>`,
    `<language>ja</language>`,
    `<atom:link href="${xmlEscape(selfUrl)}" rel="self" type="application/rss+xml" />`,
  ];
  if (lastBuild) channelMeta.push(`<lastBuildDate>${lastBuild}</lastBuildDate>`);

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  ${channelMeta.join("\n  ")}
${items}
</channel>
</rss>
`;
}
