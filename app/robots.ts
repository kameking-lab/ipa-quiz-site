import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/auth/",
          // /account/* is intentionally crawlable but noindex (see
          // app/account/layout.tsx). The header "学習進捗" link points at
          // /account/dashboard, so Disallow-ing it here contradicted the
          // site's own internal navigation (review C-3). noindex keeps the
          // pages out of the index without blocking the crawl path.
          "/chat/share",
          // 開発者向け Public API β ドキュメントは検索インデックス対象外
          "/api-docs",
          // 内部レビュー・一時公開ページは検索インデックス対象外
          "/final-review-v3",
          "/strategy-discussion-v2",
          // デモページは検索インデックス対象外（主要動線からの遷移用）
          "/demo/",
        ],
      },
    ],
    // Point only at the sitemap index. The index references every category
    // sitemap (main, exams, topics, blog, books, questions/*) so crawlers
    // discover them transitively. Listing each child here would double-submit
    // URLs. (essays/success-stories child sitemaps are intentionally excluded
    // from the index — those pages are noindex.)
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
    // NOTE: no `host` directive. It was a non-standard Yandex-only field,
    // unsupported by Google and deprecated by Yandex in 2018 (C-3). Emitting it
    // is noise; the canonical host is already conveyed via rel=canonical.
  };
}
