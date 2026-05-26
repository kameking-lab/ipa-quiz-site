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

  it("no longer disallows /account/ (consistent with the header link)", () => {
    expect(disallow).not.toContain("/account/");
  });

  it("still disallows sensitive sections", () => {
    expect(disallow).toContain("/api/");
    expect(disallow).toContain("/admin/");
    expect(disallow).toContain("/auth/");
  });

  it("advertises the sitemap index", () => {
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
  });
});
