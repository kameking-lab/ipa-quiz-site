import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  isBookmarked,
  toggleBookmark,
  updateBookmarkTags,
  getBookmark,
  getAllBookmarks,
  clearAllBookmarks,
  exportBookmarks,
  importBookmarks,
  mergeServerBookmarks,
  MAX_TAGS_PER_BOOKMARK,
} from "@/lib/storage/bookmarks";
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
    topicTags: ["アルゴリズム"],
    difficulty: 3,
    question: "テスト問題です。",
    choices: { ア: "選択肢ア", イ: "選択肢イ", ウ: "選択肢ウ", エ: "選択肢エ" },
    answer: "ア",
    explanation: "解説テキストです。",
    hasImage: false,
    sourcePdfUrl: "https://example.com/test.pdf",
    license: "IPA-public",
    ...overrides,
  };
}

beforeEach(() => {
  clearAllBookmarks();
});

describe("isBookmarked", () => {
  it("returns false when nothing is stored", () => {
    expect(isBookmarked("ap-2023s-am-q1")).toBe(false);
  });

  it("returns true after bookmarking", () => {
    const q = makeQuestion("ap-2023s-am-q1");
    toggleBookmark(q);
    expect(isBookmarked("ap-2023s-am-q1")).toBe(true);
  });
});

describe("toggleBookmark", () => {
  it("adds a bookmark and returns true", () => {
    const q = makeQuestion("ap-2023s-am-q1");
    const result = toggleBookmark(q);
    expect(result).toBe(true);
    expect(isBookmarked("ap-2023s-am-q1")).toBe(true);
  });

  it("removes an existing bookmark and returns false", () => {
    const q = makeQuestion("ap-2023s-am-q1");
    toggleBookmark(q);
    const result = toggleBookmark(q);
    expect(result).toBe(false);
    expect(isBookmarked("ap-2023s-am-q1")).toBe(false);
  });

  it("stores denormalized question metadata", () => {
    const q = makeQuestion("ap-2023s-am-q1", {
      question: "長い問題テキスト".repeat(20),
    });
    toggleBookmark(q);
    const entry = getBookmark("ap-2023s-am-q1");
    expect(entry).toBeDefined();
    expect(entry!.exam).toBe("ap");
    expect(entry!.year).toBe(2023);
    expect(entry!.qNumber).toBe(1);
    expect(entry!.questionSnippet.length).toBeLessThanOrEqual(80);
  });

  it("initializes with empty tags", () => {
    const q = makeQuestion("ap-2023s-am-q1");
    toggleBookmark(q);
    const entry = getBookmark("ap-2023s-am-q1");
    expect(entry!.tags).toEqual([]);
  });
});

describe("updateBookmarkTags", () => {
  it("updates tags on an existing bookmark", () => {
    const q = makeQuestion("ap-2023s-am-q1");
    toggleBookmark(q);
    updateBookmarkTags("ap-2023s-am-q1", ["苦手", "ネットワーク"]);
    expect(getBookmark("ap-2023s-am-q1")!.tags).toEqual(["苦手", "ネットワーク"]);
  });

  it("is a no-op when the question is not bookmarked", () => {
    updateBookmarkTags("nonexistent", ["tag"]);
    expect(getBookmark("nonexistent")).toBeUndefined();
  });

  it(`enforces MAX_TAGS_PER_BOOKMARK (${MAX_TAGS_PER_BOOKMARK})`, () => {
    const q = makeQuestion("ap-2023s-am-q1");
    toggleBookmark(q);
    const tooMany = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"];
    updateBookmarkTags("ap-2023s-am-q1", tooMany);
    expect(getBookmark("ap-2023s-am-q1")!.tags.length).toBe(MAX_TAGS_PER_BOOKMARK);
  });
});

describe("getAllBookmarks", () => {
  it("returns empty array when nothing is stored", () => {
    expect(getAllBookmarks()).toEqual([]);
  });

  it("returns bookmarks sorted newest-first", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-01-01T00:00:00Z"));
    const q1 = makeQuestion("ap-2023s-am-q1", { qNumber: 1 });
    toggleBookmark(q1);

    vi.setSystemTime(new Date("2023-01-01T00:00:01Z"));
    const q2 = makeQuestion("ap-2023s-am-q2", { qNumber: 2 });
    toggleBookmark(q2);

    vi.useRealTimers();

    const all = getAllBookmarks();
    expect(all[0].questionId).toBe("ap-2023s-am-q2");
    expect(all[1].questionId).toBe("ap-2023s-am-q1");
  });
});

describe("clearAllBookmarks", () => {
  it("removes all bookmarks", () => {
    toggleBookmark(makeQuestion("ap-2023s-am-q1"));
    toggleBookmark(makeQuestion("ap-2023s-am-q2", { qNumber: 2 }));
    clearAllBookmarks();
    expect(getAllBookmarks()).toEqual([]);
  });
});

describe("exportBookmarks / importBookmarks", () => {
  it("round-trips bookmarks", () => {
    const q = makeQuestion("ap-2023s-am-q1");
    toggleBookmark(q);
    updateBookmarkTags("ap-2023s-am-q1", ["重要"]);

    const json = exportBookmarks();
    clearAllBookmarks();
    expect(getAllBookmarks()).toHaveLength(0);

    const ok = importBookmarks(json);
    expect(ok).toBe(true);
    expect(getAllBookmarks()).toHaveLength(1);
    expect(getBookmark("ap-2023s-am-q1")!.tags).toEqual(["重要"]);
  });

  it("returns false for invalid JSON", () => {
    expect(importBookmarks("not-valid-json")).toBe(false);
  });

  it("returns false when entries field is missing", () => {
    expect(importBookmarks('{"foo":"bar"}')).toBe(false);
  });
});

describe("mergeServerBookmarks", () => {
  it("adds server entries and keeps newer local edits (last-write-wins)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-06-01T00:00:00Z"));
    toggleBookmark(makeQuestion("ap-2023s-am-q1"));
    vi.useRealTimers();
    const localAt = getBookmark("ap-2023s-am-q1")!.bookmarkedAt;

    mergeServerBookmarks([
      // Stale server copy of an entry the user edited more recently → ignored.
      { questionId: "ap-2023s-am-q1", tags: ["stale"], bookmarkedAt: localAt - 1000 },
      // New server-only entry → added.
      { questionId: "ap-2023s-am-q2", tags: ["server"], bookmarkedAt: localAt + 1000 },
    ]);

    expect(getBookmark("ap-2023s-am-q1")!.tags).toEqual([]);
    expect(getBookmark("ap-2023s-am-q2")!.tags).toEqual(["server"]);
  });
});

// The store reads from a module-level empty object on the "no stored key" path.
// If that object is shared by reference and callers mutate it in place, it gets
// permanently corrupted — and clearAllBookmarks() then writes the corrupted copy
// back. These tests use localStorage.clear() (key fully absent) to exercise that
// path, unlike the suite-wide beforeEach which writes an empty object.
describe("shared-empty footgun (first-session regression)", () => {
  it("clear-all truly empties even when the first bookmark was added on absent storage", () => {
    window.localStorage.clear(); // brand-new user: bookmarks key does not exist
    toggleBookmark(makeQuestion("ap-2023s-am-q1")); // empty-path write
    toggleBookmark(makeQuestion("ap-2023s-am-q2", { qNumber: 2 }));
    expect(getAllBookmarks()).toHaveLength(2);

    clearAllBookmarks();
    // Buggy version writes the corrupted shared empty back → first bookmark survives.
    expect(getAllBookmarks()).toEqual([]);
    expect(isBookmarked("ap-2023s-am-q1")).toBe(false);
  });
});
