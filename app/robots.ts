import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // /api/og(/result) は全ページの og:image 生成エンドポイント。
        // Disallow: /api/ だけだと Twitterbot / facebookexternalhit /
        // LinkedInBot 等の SNS スクレイパが robots.txt を尊重して og:image を
        // 取得できず、SNS シェア時のカード画像がサイト全体で欠落する。
        // より長く一致する Allow を置き全 SNS の longest-match 規則で許可する
        // （/api/ 配下の他エンドポイントは引き続き Disallow のまま）。
        allow: ["/", "/api/og"],
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
