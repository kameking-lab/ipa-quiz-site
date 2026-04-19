import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
    host: SITE_BASE_URL,
  };
}
