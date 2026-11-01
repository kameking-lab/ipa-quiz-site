import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";

// The retired application anchor is replaced by the published price destination.
describe("/student directs readers to pricing without a dead application anchor", () => {
  const source = readFileSync(join(process.cwd(), "app/student/page.tsx"), "utf8");
  it("links to the named pricing page and exposes no retired application form", () => {
    expect(PRICE_PAGE_LINK).toEqual({ href: "/billing", label: "料金・月額プラン" });
    expect(source).toContain('href={PRICE_PAGE_LINK.href}');
    expect(source).toContain('{PRICE_PAGE_LINK.label}');
    expect(source).not.toContain('href="#apply"');
    expect(source).not.toContain('id="apply"');
    expect(source).not.toMatch(/<form\b/);
    expect(source).toContain("学生証などの資料は送らないでください");
    expect(source).toContain('href="/contact"');
  });
});
