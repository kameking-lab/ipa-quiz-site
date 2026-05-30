import { describe, it, expect, beforeEach } from "vitest";

import { createHistoryStore, type HistoryEntry } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";

beforeEach(() => {
  localStorage.clear();
});

function entry(id: string, correct = true, selected = "ア"): HistoryEntry {
  return { id, selected, correct, at: 1_700_000_000_000 };
}

describe("createHistoryStore — record / 集計", () => {
  it("空ストレージでは空履歴を返す", () => {
    const store = createHistoryStore();
    expect(store.getAllEntries()).toEqual([]);
  });

  it("record した解答を読み戻せる（追記順を保つ）", () => {
    const store = createHistoryStore();
    store.record(entry("q1"));
    store.record(entry("q2"));
    expect(store.getAllEntries().map((e) => e.id)).toEqual(["q1", "q2"]);
  });

  it("getAnsweredIds は重複を排した一意 ID を返す", () => {
    const store = createHistoryStore();
    store.record(entry("q1"));
    store.record(entry("q1"));
    store.record(entry("q2"));
    expect(store.getAnsweredIds().sort()).toEqual(["q1", "q2"]);
  });

  it("getWrongIds は同一 ID の最新正誤で誤答のみ返す", () => {
    const store = createHistoryStore();
    store.record(entry("q1", false)); // 最初は誤答
    store.record(entry("q1", true)); // 後に正答 → 誤答リストから外れる
    store.record(entry("q2", false)); // 誤答のまま
    expect(store.getWrongIds()).toEqual(["q2"]);
  });

  it("getStats は正答率を返す（0件は accuracy 0）", () => {
    const empty = createHistoryStore();
    expect(empty.getStats()).toEqual({
      total: 0,
      correct: 0,
      accuracy: 0,
      uniqueAnswered: 0,
    });

    const store = createHistoryStore();
    store.record(entry("q1", true));
    store.record(entry("q2", false));
    const stats = store.getStats();
    expect(stats.total).toBe(2);
    expect(stats.correct).toBe(1);
    expect(stats.accuracy).toBe(0.5);
    expect(stats.uniqueAnswered).toBe(2);
  });

  it("record は 2000 件上限で最古を捨てる（localStorage 無限増殖を防ぐ不変条件）", () => {
    const store = createHistoryStore();
    for (let i = 0; i < 2001; i++) {
      store.record(entry(`q${i}`));
    }
    const entries = store.getAllEntries();
    expect(entries).toHaveLength(2000);
    expect(entries[0].id).toBe("q1");
    expect(entries[entries.length - 1].id).toBe("q2000");
  });
});

describe("createHistoryStore — star", () => {
  it("toggleStar は追加で true・解除で false を返す", () => {
    const store = createHistoryStore();
    expect(store.toggleStar("q1")).toBe(true);
    expect(store.isStarred("q1")).toBe(true);
    expect(store.toggleStar("q1")).toBe(false);
    expect(store.isStarred("q1")).toBe(false);
  });
});

describe("createHistoryStore — 破損データからの回復", () => {
  it("不正 JSON は空履歴へ回復する", () => {
    localStorage.setItem(LS_KEYS.history, "{not valid json");
    expect(createHistoryStore().getAllEntries()).toEqual([]);
  });

  it("entries が配列でない場合は空履歴へ回復する", () => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: "oops", starredIds: [] }));
    expect(createHistoryStore().getAllEntries()).toEqual([]);
  });
});

describe("createHistoryStore — export / import / reset", () => {
  it("exportJson → importJson で履歴と star が往復する", () => {
    const a = createHistoryStore();
    a.record(entry("q1", false));
    a.toggleStar("q1");
    const json = a.exportJson();

    localStorage.clear();
    const b = createHistoryStore();
    expect(b.importJson(json)).toBe(true);
    expect(b.getAllEntries().map((e) => e.id)).toEqual(["q1"]);
    expect(b.getStarredIds()).toEqual(["q1"]);
  });

  it("importJson は不正 JSON を拒否し既存履歴を壊さない", () => {
    const store = createHistoryStore();
    store.record(entry("keep-me"));
    expect(store.importJson("}{")).toBe(false);
    expect(store.getAllEntries().map((e) => e.id)).toEqual(["keep-me"]);
  });

  it("importJson は entries 非配列の形式を拒否する", () => {
    const store = createHistoryStore();
    expect(store.importJson(JSON.stringify({ entries: 42 }))).toBe(false);
  });

  it("reset は履歴を消去する", () => {
    const store = createHistoryStore();
    store.record(entry("q1"));
    store.toggleStar("q1");
    store.reset();
    expect(store.getAllEntries()).toEqual([]);
    expect(store.getStarredIds()).toEqual([]);
  });
});
