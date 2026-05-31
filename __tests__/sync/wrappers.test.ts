import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { syncBookmarks } from "@/lib/sync/bookmark-sync";
import { syncCustomTags } from "@/lib/sync/custom-tag-sync";
import { syncStudyPlans } from "@/lib/sync/study-plan-sync";
import { getAllBookmarks, clearAllBookmarks } from "@/lib/storage/bookmarks";
import { getCustomTags, getCustomTagColor } from "@/lib/storage/custom-tags";
import { listPlans } from "@/lib/study-plan/storage";
import type { StudyPlan } from "@/lib/study-plan/types";

/**
 * Characterization tests for the three opt-in sync wrappers
 * (bookmark-sync / custom-tag-sync / study-plan-sync). postSync itself is
 * covered by merge.test.ts; what these wrappers add is:
 *   1. routing to the correct /api/account/* endpoint, and
 *   2. the merge-only-on-`ok` gate — a non-ok status (signed-out / DB-absent /
 *      network error) must NOT merge anything into LocalStorage, so local data
 *      is never clobbered by a failed sync.
 */

function okFetch(entries: unknown[]) {
  return vi.fn().mockResolvedValue({
    status: 200,
    ok: true,
    json: async () => ({ entries, merged: entries.length, total: entries.length }),
  });
}

function lastEndpoint(mock: ReturnType<typeof vi.fn>): string {
  return mock.mock.calls[0]?.[0] as string;
}

beforeEach(() => {
  localStorage.clear();
  clearAllBookmarks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("syncBookmarks", () => {
  it("posts to the bookmark-sync endpoint and merges server bookmarks on ok", async () => {
    const fetchMock = okFetch([
      { questionId: "ap-2023h-am-q9", tags: ["重要"], bookmarkedAt: 9000, exam: "ap" },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const status = await syncBookmarks();

    expect(lastEndpoint(fetchMock)).toBe("/api/account/bookmark-sync");
    expect(status.state).toBe("ok");
    // Server-only bookmark is now present locally (merge ran).
    expect(getAllBookmarks().map((b) => b.questionId)).toContain("ap-2023h-am-q9");
  });

  it("does NOT merge server bookmarks when the server returns 401 (gate)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 401,
        ok: false,
        // Even if the body somehow carried entries, the gate must skip the merge.
        json: async () => ({ entries: [{ questionId: "ghost", bookmarkedAt: 1 }] }),
      }),
    );

    const status = await syncBookmarks();

    expect(status.state).toBe("unauthenticated");
    expect(getAllBookmarks()).toHaveLength(0);
  });
});

describe("syncCustomTags", () => {
  it("posts to the custom-tag-sync endpoint and merges the server catalog on ok", async () => {
    const fetchMock = okFetch([
      { name: "ネットワーク", color: "red", sortOrder: 1, updatedAt: Date.now() + 10_000 },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const status = await syncCustomTags();

    expect(lastEndpoint(fetchMock)).toBe("/api/account/custom-tag-sync");
    expect(status.state).toBe("ok");
    expect(getCustomTags().map((t) => t.name)).toContain("ネットワーク");
    expect(getCustomTagColor("ネットワーク")).toBe("red");
  });

  it("does NOT merge the server catalog when the server returns 503 (gate)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 503,
        ok: false,
        json: async () => ({ entries: [{ name: "ghost", color: "red", sortOrder: 1, updatedAt: 1 }] }),
      }),
    );

    const status = await syncCustomTags();

    expect(status.state).toBe("unavailable");
    expect(getCustomTags().some((t) => t.name === "ghost")).toBe(false);
  });
});

describe("syncStudyPlans", () => {
  function makePlan(id: string): StudyPlan {
    return {
      id,
      createdAt: new Date(1000).toISOString(),
      input: {} as StudyPlan["input"],
      summary: {} as StudyPlan["summary"],
      daily: [],
    };
  }

  it("posts to the study-plan-sync endpoint and merges server plans on ok", async () => {
    const fetchMock = okFetch([
      { id: "plan-a", payload: makePlan("plan-a"), progress: {}, createdAt: 1000, updatedAt: 9_000_000 },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const status = await syncStudyPlans();

    expect(lastEndpoint(fetchMock)).toBe("/api/account/study-plan-sync");
    expect(status.state).toBe("ok");
    expect(listPlans().map((p) => p.id)).toContain("plan-a");
  });

  it("filters out entries with a non-object payload before merging", async () => {
    const fetchMock = okFetch([
      { id: "plan-good", payload: makePlan("plan-good"), progress: {}, createdAt: 1000, updatedAt: 9_000_000 },
      { id: "plan-bad", payload: null, progress: {}, createdAt: 1000, updatedAt: 9_000_000 },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    await syncStudyPlans();

    const ids = listPlans().map((p) => p.id);
    expect(ids).toContain("plan-good");
    expect(ids).not.toContain("plan-bad");
  });

  it("does NOT merge server plans when the server returns 401 (gate)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 401,
        ok: false,
        json: async () => ({ entries: [{ id: "ghost", payload: makePlan("ghost"), updatedAt: 1 }] }),
      }),
    );

    const status = await syncStudyPlans();

    expect(status.state).toBe("unauthenticated");
    expect(listPlans()).toHaveLength(0);
  });
});
