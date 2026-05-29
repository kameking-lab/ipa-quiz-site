import { describe, expect, it } from "vitest";

import robots from "@/app/robots";

describe("robots()", () => {
  const rules = robots().rules;
  const rule = Array.isArray(rules) ? rules[0] : rules;
  const disallow = Array.isArray(rule.disallow)
    ? rule.disallow
    : rule.disallow
      ? [rule.disallow]
      : [];
  const allow = Array.isArray(rule.allow)
    ? rule.allow
    : rule.allow
      ? [rule.allow]
      : [];

  it("no longer disallows /account/ (consistent with the header link)", () => {
    expect(disallow).not.toContain("/account/");
  });

  it("still disallows sensitive sections", () => {
    expect(disallow).toContain("/api/");
    expect(disallow).toContain("/admin/");
    expect(disallow).toContain("/auth/");
  });

  it("allows /api/og despite disallowing /api/ (SNS og:image scrapers)", () => {
    // og:image はサイト全ページで /api/og(/result) を指す。Disallow: /api/ の
    // 配下にあるため、SNS スクレイパがカード画像を取得できるよう longest-match
    // で勝つ Allow を必ず併記する。これが外れると SNS シェア画像が全滅する。
    expect(disallow).toContain("/api/");
    expect(allow).toContain("/api/og");
    // Allow の経路長 > 一致する Disallow の経路長（longest-match で Allow 勝ち）
    const matchedDisallow = disallow
      .filter((d) => "/api/og".startsWith(d))
      .sort((a, b) => b.length - a.length)[0];
    expect("/api/og".length).toBeGreaterThan((matchedDisallow ?? "").length);
  });

  it("advertises the sitemap index", () => {
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
  });

  it("emits no non-standard Host directive (deprecated 2018)", () => {
    expect(robots().host).toBeUndefined();
  });
});
