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
          "/account/",
          "/chat/share",
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
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
    host: SITE_BASE_URL,
  };
}
