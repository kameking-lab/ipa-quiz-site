import { describe, expect, it } from "vitest";

import { buildWebsiteNode } from "@/lib/seo/structured-data";

/**
 * Home WebSite SearchAction correctness (review B-2).
 *
 * The action declares the site's keyword search to crawlers. It used to point
 * at /quiz?mode=random&exam={exam_code} ("start a random quiz"), which is not a
 * search. It must target the real /search endpoint with a free-text query slot.
 */
describe("buildWebsiteNode — SearchAction targets the real keyword search", () => {
  const node = buildWebsiteNode("テスト用の説明");
  const action = node.potentialAction;

  it("is a SearchAction pointing at /search?q={search_term_string}", () => {
    expect(action["@type"]).toBe("SearchAction");
    expect(action.target.urlTemplate).toContain("/search?q={search_term_string}");
    expect(action["query-input"]).toBe("required name=search_term_string");
  });

  it("no longer points at the random-quiz URL or the exam_code slot", () => {
    expect(action.target.urlTemplate).not.toContain("mode=random");
    expect(action.target.urlTemplate).not.toContain("{exam_code}");
    expect(action["query-input"]).not.toContain("exam_code");
  });

  it("carries the provided description", () => {
    expect(node.description).toBe("テスト用の説明");
  });
});
