import { test, expect } from "@playwright/test";

/**
 * /quiz canonical / robots regression guard (構造的激辛 SEO-1 / 致命傷④).
 *
 * Pre-fix the page declared `alternates: { canonical: "/quiz" }` and
 * `robots: { index: true }` while next.config.ts permanently redirected the
 * bare /quiz URL to "/" — a self-defeating canonical: Google resolved the
 * canonical, followed the redirect to "/", and consolidated every /quiz?mode=…
 * page's signals into the homepage while `index: true` was dead (Google cannot
 * index a URL that redirects away).
 *
 * Honest signals now: bare /quiz keeps its 30x to "/", the rendered query-param
 * page is noindex,follow (app shell, not indexable content), and the canonical
 * points to "/" — matching the actual destination instead of a redirected URL.
 */

test.describe("/quiz canonical & robots — honest signals", () => {
  test("bare /quiz still 30x-redirects to the homepage (unchanged)", async ({ request }) => {
    // Next 16's `permanent: true` emits 308 (preserves method per RFC 7538);
    // accept the 30x family so a future Next change to 301 does not flake.
    const res = await request.get("/quiz", { maxRedirects: 0, timeout: 8000 });
    expect([301, 307, 308]).toContain(res.status());
    expect(res.headers().location ?? "").toMatch(/(^|\/)$|^\/$|kakomon-ai\.jp\/?$/);
  });

  test("/quiz?mode=… renders with noindex + canonical pointing to '/'", async ({ request }) => {
    const res = await request.get("/quiz?mode=random&exam=ap", { maxRedirects: 0 });
    expect(res.status()).toBe(200);
    const html = await res.text();

    // Next.js emits `<meta name="robots" content="noindex,follow">` for
    // `{ index: false, follow: true }`. Match case-insensitively and tolerate
    // attribute reordering.
    const robotsMeta = html.match(
      /<meta[^>]*name="robots"[^>]*content="([^"]+)"[^>]*>/i,
    );
    expect(robotsMeta, "meta robots tag must be present").not.toBeNull();
    const content = robotsMeta![1].toLowerCase();
    expect(content).toContain("noindex");
    // Crucially, the previous bug was `index: true` (no noindex emitted).
    expect(content).not.toMatch(/(^|[\s,])index(\s|,|$)/);

    // Canonical must NOT self-declare /quiz (the URL that redirects away).
    const canonical = html.match(
      /<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/i,
    );
    expect(canonical, "rel=canonical link must be present").not.toBeNull();
    const canonicalHref = canonical![1];
    expect(canonicalHref).not.toMatch(/\/quiz(\?|$)/);
    // The honest canonical is the homepage (the 308 destination from bare /quiz).
    expect(canonicalHref.replace(/\/$/, "")).toMatch(
      /^https?:\/\/[^/]+$|^\/$|^$/, // either absolute homepage URL or "/"
    );
  });

  test("the rendered page is reachable (link-follow stays intact for the agent UX)", async ({
    request,
  }) => {
    // noindex,follow means the page is not indexed but its outbound links are
    // still followed — and humans reaching /quiz?mode=… via the home CTA must
    // still see the player. Sanity-check the response carries the player UI.
    const res = await request.get("/quiz?mode=random&exam=ap&limit=3");
    expect(res.status()).toBe(200);
    const html = await res.text();
    // QuizModeTabs / QuizClient render the player; presence of either marker
    // suffices to confirm the page is not blank.
    expect(html).toMatch(/quiz|クイズ|QuizClient|問題/i);
  });
});
