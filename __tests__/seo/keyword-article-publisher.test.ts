import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { ORG_ID, SITE_LOGO_IMAGE } from "@/lib/seo/structured-data";

// The keyword landing pages (app/keywords/[keyword]/page.tsx) are indexable and
// listed in the sitemap (lib/seo/sitemap-xml.ts), and emit an Article JSON-LD
// node. That node used to carry only a bare `publisher` (name/url) — no author,
// no publisher.logo, no mainEntityOfPage — which is notably less complete than
// the site's established blog Article node (app/blog/[slug]/page.tsx). These
// guards pin that the keyword Article now mirrors that established shape so the
// degraded-markup regression can't return. "崩れたら落ちる".

const SOURCE = readFileSync(
  join(process.cwd(), "app", "keywords", "[keyword]", "page.tsx"),
  "utf8",
);

describe("keyword LP Article JSON-LD matches the site Article shape", () => {
  it("imports the org @id and logo from structured-data", () => {
    expect(SOURCE).toContain(
      'import { ORG_ID, SITE_LOGO_IMAGE } from "@/lib/seo/structured-data"',
    );
  });

  it("the Article carries author, a resolvable publisher (@id+logo) and mainEntityOfPage", () => {
    expect(SOURCE).toContain('"@type": "Article"');
    // Author present (was missing).
    expect(SOURCE).toContain(
      'author: { "@type": "Organization", name: SITE_NAME, url: SITE_BASE_URL }',
    );
    // Publisher is self-resolving: @id reference PLUS inline name/url/logo.
    expect(SOURCE).toContain('"@id": ORG_ID,');
    expect(SOURCE).toContain("logo: SITE_LOGO_IMAGE,");
    // Canonical self-reference for the Article.
    expect(SOURCE).toContain('mainEntityOfPage: { "@type": "WebPage", "@id": absUrl }');
  });

  it("the shared org constants are well-formed (publisher resolves to a real logo)", () => {
    expect(ORG_ID).toMatch(/^https?:\/\/.+#organization$/);
    expect(SITE_LOGO_IMAGE).toBeTruthy();
  });
});
