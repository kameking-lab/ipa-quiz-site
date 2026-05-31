import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  toggleBookmark,
  getAllBookmarks,
  clearAllBookmarks,
  mergeServerBookmarks,
} from "@/lib/storage/bookmarks";
import {
  ensureCatalogForNames,
  mergeServerCustomTags,
  getCustomTags,
  getCustomTagColor,
} from "@/lib/storage/custom-tags";
import { postSync } from "@/lib/sync/client";
import type { Question } from "@/lib/questions/types";

function makeQuestion(id: string, overrides: Partial<Question> = {}): Question {
  return {
    id,
    exam: "ap",
    session: "am",
    year: 2023,
    season: "spring",
    qNumber: 1,
    type: "multiple-choice",
    category: "テクノロジ",
    topicTags: [],
    difficulty: 3,
    question: "テスト問題",
    choices: { ア: "ア", イ: "イ", ウ: "ウ", エ: "エ" },
    answer: "ア",
    explanation: "解説",
    hasImage: false,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
    ...overrides,
  };
}

beforeEach(() => {
  localStorage.clear();
  clearAllBookmarks();
});

describe("mergeServerBookmarks", () => {
  it("adds server-only bookmarks (union)", () => {
    mergeServerBookmarks([
      { questionId: "ap-2023h-am-q9", tags: ["重要"], bookmarkedAt: 1000, exam: "ap" },
    ]);
    const all = getAllBookmarks();
    expect(all).toHaveLength(1);
    expect(all[0].questionId).toBe("ap-2023h-am-q9");
    expect(all[0].tags).toEqual(["重要"]);
  });

  it("does not clobber a newer local bookmark (last-write-wins)", () => {
    // Local bookmark created "now" (large bookmarkedAt).
    toggleBookmark(makeQuestion("ap-2023h-am-q1"));
    const localAt = getAllBookmarks()[0].bookmarkedAt;
    mergeServerBookmarks([
      { questionId: "ap-2023h-am-q1", tags: ["古い"], bookmarkedAt: localAt - 10_000 },
    ]);
    // Local (newer) wins: tags stay empty, not overwritten by stale server copy.
    expect(getAllBookmarks()[0].tags).toEqual([]);
  });

  it("overwrites a stale local bookmark with a newer server copy", () => {
    toggleBookmark(makeQuestion("ap-2023h-am-q2"));
    // Force the local timestamp into the past so the server copy is newer.
    const data = JSON.parse(localStorage.getItem("ipa-quiz:bookmarks:v1")!);
    data.entries["ap-2023h-am-q2"].bookmarkedAt = 1000;
    localStorage.setItem("ipa-quiz:bookmarks:v1", JSON.stringify(data));
    mergeServerBookmarks([
      { questionId: "ap-2023h-am-q2", tags: ["新しい"], bookmarkedAt: 9_000_000 },
    ]);
    expect(getAllBookmarks()[0].tags).toEqual(["新しい"]);
  });
});

describe("custom tag catalog", () => {
  it("seeds catalog entries for new names with default colour", () => {
    const catalog = ensureCatalogForNames(["A", "B"]);
    expect(catalog.map((t) => t.name).sort()).toEqual(["A", "B"]);
    expect(getCustomTagColor("A")).toBe("zinc");
  });

  it("merges a server catalog last-write-wins", () => {
    ensureCatalogForNames(["重要"]);
    mergeServerCustomTags([
      { name: "重要", color: "red", sortOrder: 3, updatedAt: Date.now() + 10_000 },
    ]);
    expect(getCustomTagColor("重要")).toBe("red");
    expect(getCustomTags().find((t) => t.name === "重要")?.sortOrder).toBe(3);
  });
});

describe("postSync status mapping", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("maps 401 to unauthenticated", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 401, ok: false }));
    const { status } = await postSync("/api/account/bookmark-sync", []);
    expect(status.state).toBe("unauthenticated");
  });

  it("maps 503 to unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 503, ok: false }));
    const { status } = await postSync("/api/account/bookmark-sync", []);
    expect(status.state).toBe("unavailable");
  });

  it("returns ok with server entries on 200", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => ({ entries: [{ questionId: "x" }], merged: 1, total: 1 }),
      }),
    );
    const { status, entries } = await postSync("/api/account/bookmark-sync", []);
    expect(status.state).toBe("ok");
    expect(entries).toHaveLength(1);
  });

  it("maps a network throw to error without throwing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));
    const { status } = await postSync("/api/account/bookmark-sync", []);
    expect(status.state).toBe("error");
  });

  it("maps a generic non-401/503 HTTP failure to error with the status code", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 500, ok: false }));
    const local = [{ questionId: "local-1" }];
    const { status, entries } = await postSync("/api/account/bookmark-sync", local);
    expect(status).toEqual({ state: "error", message: "HTTP 500" });
    // The local batch is echoed back unchanged so the caller keeps its data.
    expect(entries).toBe(local);
  });

  it("falls back to local entries when the 200 body has a non-array entries field", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => ({ entries: "not-an-array", merged: 2, total: 3 }),
      }),
    );
    const local = [{ questionId: "local-1" }, { questionId: "local-2" }];
    const { status, entries } = await postSync("/api/account/bookmark-sync", local);
    expect(status).toEqual({ state: "ok", merged: 2, total: 3 });
    expect(entries).toBe(local);
  });

  it("defaults merged/total to 0 when the 200 body omits them", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => ({ entries: [] }),
      }),
    );
    const { status } = await postSync("/api/account/bookmark-sync", []);
    expect(status).toEqual({ state: "ok", merged: 0, total: 0 });
  });

  it("uses the 'network' message when a non-Error value is thrown", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue("offline"));
    const { status } = await postSync("/api/account/bookmark-sync", []);
    expect(status).toEqual({ state: "error", message: "network" });
  });
});
