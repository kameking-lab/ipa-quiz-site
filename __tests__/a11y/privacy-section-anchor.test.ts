import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// /transparency links its affiliate disclosure to /privacy#8 ("プライバシーポリシー
// Section 8" = アフィリエイトリンクの使用について). That fragment must resolve to a
// real DOM id on /privacy, or the link lands at the top of /privacy instead of the
// affiliate section — a soft dead-anchor. The privacy page renders every section
// through the shared <Section number=.../> helper, so the helper must emit
// id={number} (making #1..#8 all addressable) with scroll-mt so the jumped-to
// heading is not hidden under the sticky SiteHeader.
describe("/transparency#8 affiliate link resolves to a real privacy anchor", () => {
  const transparency = readFileSync(
    join(process.cwd(), "app/transparency/page.tsx"),
    "utf8",
  );
  const privacy = readFileSync(join(process.cwd(), "app/privacy/page.tsx"), "utf8");

  it("transparency references /privacy#8", () => {
    expect(transparency).toContain('href="/privacy#8"');
  });

  it("the privacy page defines section number 8", () => {
    expect(privacy).toContain('number="8"');
  });

  it("the shared Section helper renders id={number} with scroll-mt", () => {
    expect(privacy).toMatch(/<section id=\{number\} className="[^"]*scroll-mt-\d+[^"]*"/);
  });
});
