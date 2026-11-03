import { describe, expect, it } from "vitest";

import { buildSearchPracticeUrl } from "@/lib/search/practice-url";

describe("buildSearchPracticeUrl", () => {
  it("preserves exact IDs, cross-exam scope, filters and return destination", () => {
    const href = buildSearchPracticeUrl(
      "q=SQL&difficulty=4&sort=year_desc",
      [
        { id: "ap-2024s-am-q1", exam: "ap" },
        { id: "db-2023a-am2-q2", exam: "db" },
      ],
    );
    const url = new URL(href, "https://example.test");
    expect(url.pathname).toBe("/quiz");
    expect(url.searchParams.get("source")).toBe("search");
    expect(url.searchParams.get("ids")).toBe("ap-2024s-am-q1,db-2023a-am2-q2");
    expect(url.searchParams.get("examGroup")).toBe("ap,db");
    expect(url.searchParams.get("search")).toBe("q=SQL&difficulty=4&sort=year_desc");
    expect(url.searchParams.get("returnTo")).toBe(
      "/search?q=SQL&difficulty=4&sort=year_desc",
    );
  });

  it("uses a single exam and preserves an explicit empty result", () => {
    const single = new URL(
      buildSearchPracticeUrl("q=TCP", [{ id: "nw-2024s-am2-q1", exam: "nw" }]),
      "https://example.test",
    );
    expect(single.searchParams.get("exam")).toBe("nw");
    expect(single.searchParams.has("examGroup")).toBe(false);

    const empty = new URL(buildSearchPracticeUrl("q=nohit", []), "https://example.test");
    expect(empty.searchParams.get("ids")).toBe("");
    expect(empty.searchParams.has("exam")).toBe(false);
  });
});
