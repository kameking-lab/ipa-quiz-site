import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// The sitewide footer (app/layout.tsx) links "IPA著作権・出典" to /about#attribution.
// That anchor must resolve to a real DOM id on /about, or the §8 出典 link (rendered
// on every page) lands at the top of /about instead of the 出典・著作権 section —
// a sitewide soft dead-anchor. The id also needs scroll-mt-20 so the heading is not
// hidden under the sticky SiteHeader (~64px) when jumped to.
describe("footer /about#attribution links to a real, unobscured anchor", () => {
  const layout = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
  const about = readFileSync(join(process.cwd(), "app/about/page.tsx"), "utf8");

  it("the footer references /about#attribution", () => {
    expect(layout).toContain('href="/about#attribution"');
  });

  it("/about renders id=\"attribution\" with scroll-mt-20 on the 出典・著作権 heading", () => {
    expect(about).toMatch(/id="attribution" className="[^"]*scroll-mt-20[^"]*"/);
  });
});
