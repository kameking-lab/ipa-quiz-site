import { describe, expect, it } from "vitest";

import { extractRecentlyViewedIds } from "@/lib/search/recently-viewed";

describe("extractRecentlyViewedIds", () => {
  it("reads the current history storage shape and de-duplicates IDs", () => {
    expect(
      extractRecentlyViewedIds({
        entries: [
          { id: "ap-q1", selected: "ア", correct: true, at: 1 },
          { id: "ap-q1", selected: "イ", correct: false, at: 2 },
          { id: "ip-q2", selected: "ウ", correct: true, at: 3 },
        ],
        starredIds: [],
      }),
    ).toEqual(["ap-q1", "ip-q2"]);
  });

  it("keeps legacy arrays readable and rejects malformed entries", () => {
    expect(extractRecentlyViewedIds([{ id: "ap-q1" }, null, { id: 3 }])).toEqual([
      "ap-q1",
    ]);
    expect(extractRecentlyViewedIds({ entries: "broken" })).toEqual([]);
    expect(extractRecentlyViewedIds(null)).toEqual([]);
  });
});
