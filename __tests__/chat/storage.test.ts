import { describe, it, expect, beforeEach } from "vitest";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  listLocalSessions,
  deleteFromLocalStorage,
} from "@/lib/chat/storage";
import type { ChatSession } from "@/lib/chat/types";

/**
 * chat/storage.ts は AI 会話履歴（フェーズ2）の LocalStorage 永続層。
 * saveToLocalStorage は「同 id 置換 + 先頭挿入 + 最大 50 件（最古退避）」の
 * 不変条件に依存する。崩れると履歴の重複・並び順・上限が壊れ、会話一覧が誤動作する。
 */
const KEY = "ipa-quiz:chat-sessions:v1";

function makeSession(id: string): ChatSession {
  return {
    id,
    questionId: `ap-2024a-am-q${id}`,
    examCode: "ap",
    year: 2024,
    season: "autumn",
    qNumber: 1,
    questionText: "サンプル問題",
    questionCategory: "テクノロジ系",
    messages: [{ role: "user", content: "hello", createdAt: "2024-01-01T00:00:00.000Z" }],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("listLocalSessions / read fail-soft", () => {
  it("未保存なら空配列", () => {
    expect(listLocalSessions()).toEqual([]);
  });

  it("破損 JSON は空配列（fail-soft）", () => {
    window.localStorage.setItem(KEY, "{broken");
    expect(listLocalSessions()).toEqual([]);
  });
});

describe("saveToLocalStorage", () => {
  it("保存したセッションを読み出せる", () => {
    saveToLocalStorage(makeSession("a"));
    const list = listLocalSessions();
    expect(list).toHaveLength(1);
    expect(list[0].id).toBe("a");
  });

  it("保存時に updatedAt が ISO 文字列で更新される", () => {
    saveToLocalStorage(makeSession("a"));
    const saved = loadFromLocalStorage("a");
    expect(saved).not.toBeNull();
    // 元の updatedAt から書き換えられ、パース可能な ISO 文字列であること
    expect(Number.isNaN(Date.parse(saved!.updatedAt))).toBe(false);
  });

  it("新しいセッションは先頭に挿入される", () => {
    saveToLocalStorage(makeSession("a"));
    saveToLocalStorage(makeSession("b"));
    const list = listLocalSessions();
    expect(list.map((s) => s.id)).toEqual(["b", "a"]);
  });

  it("同 id の保存は重複せず置換され先頭へ移動する", () => {
    saveToLocalStorage(makeSession("a"));
    saveToLocalStorage(makeSession("b"));
    saveToLocalStorage(makeSession("a"));
    const list = listLocalSessions();
    expect(list.map((s) => s.id)).toEqual(["a", "b"]);
    expect(list).toHaveLength(2);
  });

  it("最大 50 件で最古が退避される", () => {
    for (let i = 0; i < 55; i++) {
      saveToLocalStorage(makeSession(`s${i}`));
    }
    const list = listLocalSessions();
    expect(list).toHaveLength(50);
    // 最新(s54)が先頭、最古5件(s0..s4)は退避され s5 が末尾
    expect(list[0].id).toBe("s54");
    expect(list[list.length - 1].id).toBe("s5");
  });
});

describe("loadFromLocalStorage", () => {
  it("一致 id を返す", () => {
    saveToLocalStorage(makeSession("a"));
    expect(loadFromLocalStorage("a")?.id).toBe("a");
  });

  it("未知 id は null", () => {
    saveToLocalStorage(makeSession("a"));
    expect(loadFromLocalStorage("zzz")).toBeNull();
  });
});

describe("deleteFromLocalStorage", () => {
  it("対象 id のみ削除し他は残す", () => {
    saveToLocalStorage(makeSession("a"));
    saveToLocalStorage(makeSession("b"));
    deleteFromLocalStorage("a");
    const list = listLocalSessions();
    expect(list.map((s) => s.id)).toEqual(["b"]);
  });

  it("未知 id の削除は無害（全件保持）", () => {
    saveToLocalStorage(makeSession("a"));
    deleteFromLocalStorage("zzz");
    expect(listLocalSessions()).toHaveLength(1);
  });
});
