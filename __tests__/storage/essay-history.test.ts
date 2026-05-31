import { describe, it, expect, beforeEach } from "vitest";
import {
  readEssayHistory,
  appendEssayHistory,
  clearEssayHistory,
  readEssayDraft,
  writeEssayDraft,
  clearEssayDraft,
  type EssayDraft,
} from "@/lib/storage/essay-history";
import type { EssayHistoryEntry } from "@/lib/essay/types";

/**
 * essay-history.ts は午後論文添削（C軸）の採点履歴リストと下書きの永続化。
 * 履歴は「新着先頭・最大 50 件」の不変条件に依存し、崩れると履歴が無限肥大化
 * したり順序が逆転する。下書きは questionId 単位で分離されねばならない。
 */
function makeEntry(id: string): EssayHistoryEntry {
  return {
    id,
    questionId: `st-2024a-pm2-${id}`,
    exam: "st",
    industry: "it",
    rank: "B",
    passProbability: 0.6,
    totalScore: 70,
    gradedAt: "2024-04-01T00:00:00.000Z",
    submission: { ア: "あ", イ: "い", ウ: "う" },
  };
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("readEssayHistory", () => {
  it("未保存なら空配列", () => {
    expect(readEssayHistory()).toEqual([]);
  });

  it("配列でない保存値は空配列にフォールバック", () => {
    window.localStorage.setItem("ipa-quiz:essay-history:v1", JSON.stringify({ not: "array" }));
    expect(readEssayHistory()).toEqual([]);
  });

  it("破損 JSON は空配列（fail-soft）", () => {
    window.localStorage.setItem("ipa-quiz:essay-history:v1", "{broken");
    expect(readEssayHistory()).toEqual([]);
  });
});

describe("appendEssayHistory", () => {
  it("新しいエントリを先頭に積む（新着順）", () => {
    appendEssayHistory(makeEntry("a"));
    appendEssayHistory(makeEntry("b"));
    const all = readEssayHistory();
    expect(all.map((e) => e.id)).toEqual(["b", "a"]);
  });

  it("最大 50 件で打ち切り、最古を捨てる", () => {
    for (let i = 0; i < 55; i++) appendEssayHistory(makeEntry(`e${i}`));
    const all = readEssayHistory();
    expect(all).toHaveLength(50);
    // 最新 (e54) が先頭、最古 5 件 (e0..e4) は退避済み
    expect(all[0].id).toBe("e54");
    expect(all.some((e) => e.id === "e4")).toBe(false);
    expect(all[all.length - 1].id).toBe("e5");
  });

  it("clearEssayHistory で全消去", () => {
    appendEssayHistory(makeEntry("a"));
    clearEssayHistory();
    expect(readEssayHistory()).toEqual([]);
  });
});

describe("essay draft (questionId 単位)", () => {
  const draft: EssayDraft = {
    industry: "finance",
    ア: "本文ア",
    イ: "本文イ",
    ウ: "本文ウ",
    updatedAt: "2024-04-01T00:00:00.000Z",
  };

  it("未保存なら null", () => {
    expect(readEssayDraft("q1")).toBeNull();
  });

  it("書いた下書きを同じ questionId で読み戻せる", () => {
    writeEssayDraft("q1", draft);
    expect(readEssayDraft("q1")).toEqual(draft);
  });

  it("下書きは questionId ごとに分離される", () => {
    writeEssayDraft("q1", draft);
    expect(readEssayDraft("q2")).toBeNull();
  });

  it("clearEssayDraft は対象 questionId のみ消す", () => {
    writeEssayDraft("q1", draft);
    writeEssayDraft("q2", { ...draft, industry: "retail" });
    clearEssayDraft("q1");
    expect(readEssayDraft("q1")).toBeNull();
    expect(readEssayDraft("q2")?.industry).toBe("retail");
  });

  it("破損下書きは null（fail-soft）", () => {
    window.localStorage.setItem("ipa-quiz:essay-draft:q1", "{broken");
    expect(readEssayDraft("q1")).toBeNull();
  });
});
