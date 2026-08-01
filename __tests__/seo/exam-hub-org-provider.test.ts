import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { ORG_ID, buildOrgNode } from "@/lib/seo/structured-data";

// The exam hub (app/[exam]/page.tsx) emits a Course node whose `provider` is an
// `@id` reference to ORG_ID. Google evaluates each page's structured data
// independently and does NOT follow an `@id` to the home page to resolve it, so
// unless the full EducationalOrganization node (name/logo/sameAs) is ALSO present
// in this document's @graph, the Course.provider has no resolvable name on all 13
// indexable exam hubs (sitemap priority 0.9). These guards pin that the full org
// node is defined here and that its @id matches what the provider references, so
// the dangling-provider regression can't return. "崩れたら落ちる".

const SOURCE = readFileSync(
  join(process.cwd(), "app", "[exam]", "page.tsx"),
  "utf8",
);

describe("exam hub Course.provider resolves to a defined Organization node", () => {
  it("buildOrgNode() defines a full node under the same @id the provider references", () => {
    const org = buildOrgNode() as Record<string, unknown>;
    expect(org["@id"]).toBe(ORG_ID);
    expect(org["@type"]).toBe("EducationalOrganization");
    // The fields that make the provider resolvable for rich results.
    expect(typeof org.name).toBe("string");
    expect((org.name as string).length).toBeGreaterThan(0);
    expect(org.logo).toBeTruthy();
    expect(Array.isArray(org.sameAs)).toBe(true);
  });

  it("includes the full Organization node in the exam hub @graph", () => {
    // Reverting the fix (dropping buildOrgNode() from the graph) fails here.
    expect(SOURCE).toContain("import { ORG_ID, buildOrgNode }");
    expect(SOURCE).toContain("buildOrgNode(),");
  });

  it("the Course provider is an @id reference to ORG_ID", () => {
    expect(SOURCE).toContain('"@type": "Course"');
    expect(SOURCE).toContain('"@id": ORG_ID,');
  });
});
