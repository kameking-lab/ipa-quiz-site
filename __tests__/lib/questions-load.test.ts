import { describe, it, expect } from "vitest";
import {
  getAllQuestions,
  getQuestionsByExam,
  getQuestionById,
  getAvailableYears,
  getAvailableCategories,
  getAvailableTopicTags,
} from "@/lib/questions/load";

// load.ts は年度別/分野別/タグ別の選択肢（ファセット）を実データから導出する。
// 並び順(年=降順/カテゴリ・タグ=昇順)・重複排除・exam 絞り込みの不変条件が崩れると、
// 一覧 UI のファセット順や母数が静かにずれる。実データへの不変条件で回帰固定する（source 無変更）。

const ALL = getAllQuestions();

describe("getQuestionById / getQuestionsByExam", () => {
  it("先頭問題を id で引け、未知 id は undefined", () => {
    const first = ALL[0];
    expect(getQuestionById(first.id)).toBe(first);
    expect(getQuestionById("does-not-exist-xyz")).toBeUndefined();
  });

  it("exam 絞り込みは全件が当該 exam・未知 exam は空配列", () => {
    const ap = getQuestionsByExam("ap");
    expect(ap.length).toBeGreaterThan(0);
    expect(ap.every((q) => q.exam === "ap")).toBe(true);
    // 型外の未知 exam（?? [] のガード）
    expect(getQuestionsByExam("zz" as never)).toEqual([]);
  });
});

describe("getAvailableYears", () => {
  it("降順・重複なし・全件 number", () => {
    const years = getAvailableYears();
    expect(years.length).toBeGreaterThan(0);
    expect(new Set(years).size).toBe(years.length);
    expect(years.every((y) => typeof y === "number")).toBe(true);
    expect([...years].sort((a, b) => b - a)).toEqual(years);
  });

  it("exam 指定はその exam の年度の部分集合", () => {
    const all = new Set(getAvailableYears());
    for (const y of getAvailableYears("ap")) {
      expect(all.has(y)).toBe(true);
    }
  });
});

describe("getAvailableCategories", () => {
  it("昇順・重複なし", () => {
    const cats = getAvailableCategories();
    expect(cats.length).toBeGreaterThan(0);
    expect(new Set(cats).size).toBe(cats.length);
    expect([...cats].sort()).toEqual(cats);
  });

  it("exam 指定は全カテゴリの部分集合", () => {
    const all = new Set(getAvailableCategories());
    for (const c of getAvailableCategories("ap")) {
      expect(all.has(c)).toBe(true);
    }
  });
});

describe("getAvailableTopicTags", () => {
  // 注: 現状サンプルデータは topicTags 未付与（topic-tagger は未書込み・CLAUDE.md フェーズ
  // ロードマップ参照）のため本ファセットは空配列が現挙動。タグ付与が入れば自然に増える。
  // ここでは「flatMap→dedup→昇順」の不変条件のみ固定する（空でも成立）。
  it("昇順・重複なし（flatMap 後も一意）", () => {
    const tags = getAvailableTopicTags();
    expect(new Set(tags).size).toBe(tags.length);
    expect([...tags].sort()).toEqual(tags);
  });
});
