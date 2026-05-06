import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { getSitemapChunkCount } from "@/lib/seo/sitemap-pagination";

export default function robots(): MetadataRoute.Robots {
  const chunkCount = getSitemapChunkCount();
  const questionSitemaps = Array.from(
    { length: chunkCount },
    (_, i) => `${SITE_BASE_URL}/sitemap/questions/${i}.xml`,
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/auth/",
          "/account/",
          "/chat/share",
          // モックデータのみ表示する内部ダッシュボードは検索インデックス対象外
          "/analytics",
          // 内部レビュー・一時公開ページは検索インデックス対象外
          "/exec-review",
          "/feature-review",
          "/final-review",
          "/final-review-v3",
          "/strategy-discussion",
          "/strategy-discussion-v2",
          "/tmp/",
          "/test/",
        ],
      },
    ],
    sitemap: [
      `${SITE_BASE_URL}/sitemap.xml`,
      `${SITE_BASE_URL}/sitemap/main.xml`,
      `${SITE_BASE_URL}/sitemap/exams.xml`,
      `${SITE_BASE_URL}/sitemap/topics.xml`,
      `${SITE_BASE_URL}/sitemap/blog.xml`,
      `${SITE_BASE_URL}/sitemap/books.xml`,
      ...questionSitemaps,
    ],
    host: SITE_BASE_URL,
  };
}
