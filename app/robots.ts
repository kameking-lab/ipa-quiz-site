import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { EXAM_LABELS } from "@/lib/utils";
import { QUALIFICATION_HUBS, qualificationHubPath } from "@/lib/exam-qualification-hubs";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

// New qualifications can be published before the short-label dictionary is
// extended. Keep their exact introduction URL in the policy as well.
const EXAM_INTRODUCTION_PATHS = [...new Set([
  ...Object.keys(EXAM_LABELS),
  ...QUALIFICATION_CATALOG.filter(entry => entry.status === "live" && entry.examCode).map(entry => entry.examCode!),
])].map(exam => `/${exam}$`);

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
          // Public noindex pages (/api-docs, /demo/*) must remain crawlable
          // so crawlers can actually read their noindex directives.
        ],
      },
      {
        // Owner policy (2026-11-17): training may use public introductions,
        // not the question/explanation corpus. `$` is essential: /sc alone
        // would also allow /sc/2025-autumn and /sc/topic/... by prefix match.
        // A specific group does not inherit the wildcard group's rules.
        userAgent: ["GPTBot", "ClaudeBot", "Applebot-Extended"],
        allow: [
          "/$",
          "/ipa$",
          "/qualifications$",
          "/e-learning/exams$",
          ...QUALIFICATION_HUBS.map(hub => `${qualificationHubPath(hub.slug)}$`),
          ...EXAM_INTRODUCTION_PATHS,
          "/blog$",
          "/blog/",
          "/about$",
        ],
        disallow: ["/", "/q/", "/api/", "/admin/", "/auth/"],
      },
      {
        userAgent: ["Amazonbot", "Bytespider", "CCBot"],
        disallow: "/",
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
