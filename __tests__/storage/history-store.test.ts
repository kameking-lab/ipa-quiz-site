import { describe, it, expect, beforeEach } from "vitest";

import { createHistoryStore, type HistoryEntry } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";

beforeEach(() => {
  localStorage.clear();
});

function entry(questionId: string, correct = true): HistoryEntry {
  return { questionId, correct, at: 1_700_000_000_000 };
}

describe("createHistoryStore — load / record", () => {
  it("空ストレージでは空履歴を返す", () => {
    const store = createHistoryStore();
    expect(store.load().entries).toEqual([]);
  });

  it("record した解答を読み戻せる", () => {
    const store = createHistoryStore();
    store.record(entry("ap-2023h-am-q1", true));
    const data = store.load();
    expect(data.entries).toHaveLength(1);
    expect(data.entries[0].questionId).toBe("ap-2023h-am-q1");
    expect(data.entries[0].correct).toBe(true);
  });

  it("解答は追記順に蓄積される", () => {
    const store = createHistoryStore();
    store.record(entry("q1"));
    store.record(entry("q2"));
    expect(store.load().entries.map((e) => e.questionId)).toEqual(["q1", "q2"]);
  });

  it("MAX_ENTRIES(2000) を超えると最古を捨てて上限を保つ", () => {
    const store = createHistoryStore();
    // 2001 件記録すると最古の q0 が落ち、末尾 2000 件が残る不変条件。
    for (let i = 0; i < 2001; i++) {
      store.record(entry(`q${i}`));
    }
    const entries = store.load().entries;
    expect(entries).toHaveLength(2000);
    expect(entries[0].questionId).toBe("q1");
    expect(entries[entries.length - 1].questionId).toBe("q2000");
  });
});

describe("createHistoryStore — 破損データからの回復", () => {
  it("不正 JSON は空履歴へ回復する", () => {
    localStorage.setItem(LS_KEYS.history, "{not valid json");
    expect(createHistoryStore().load().entries).toEqual([]);
  });

  it("entries が配列でない場合は空履歴へ回復する", () => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: "oops", version: 1 }));
    expect(createHistoryStore().load().entries).toEqual([]);
  });
});

describe("createHistoryStore — export / import / clear", () => {
  it("exportJson → importJson で履歴が往復する", () => {
    const a = createHistoryStore();
    a.record(entry("ap-2023h-am-q1", false));
    const json = a.exportJson();

    localStorage.clear();
    const b = createHistoryStore();
    expect(b.importJson(json)).toEqual({ ok: true });
    expect(b.load().entries.map((e) => e.questionId)).toEqual(["ap-2023h-am-q1"]);
  });

  it("importJson は不正 JSON を拒否し既存履歴を壊さない", () => {
    const store = createHistoryStore();
    store.record(entry("keep-me"));
    const res = store.importJson("}{");
    expect(res.ok).toBe(false);
    expect(store.load().entries.map((e) => e.questionId)).toEqual(["keep-me"]);
  });

  it("importJson は entries 非配列の形式を拒否する", () => {
    const store = createHistoryStore();
    const res = store.importJson(JSON.stringify({ entries: 42 }));
    expect(res.ok).toBe(false);
    expect(res.error).toBeDefined();
  });

  it("clear は履歴を消去する", () => {
    const store = createHistoryStore();
    store.record(entry("q1"));
    store.clear();
    expect(store.load().entries).toEqual([]);
  });
});
