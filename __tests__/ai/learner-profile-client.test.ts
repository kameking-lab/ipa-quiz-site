import { describe, it, expect, beforeEach } from "vitest";
import { buildLearnerProfileFromHistory } from "@/lib/ai/learner-profile-client";
import type { HistoryEntry } from "@/lib/storage/history";

/**
 * buildLearnerProfileFromHistory は AI コパイロット（B軸）へ学習者プロファイルを
 * 渡すかを決める門番。CopilotPanel から呼ばれ、assembleCopilotPrompt の
 * 「回答5件以上で profile を注入」契約の入口になっている。
 * 守る契約:
 *  - 回答 5 件未満なら undefined（プロファイルを注入しない閾値門番）。
 *  - 5 件以上なら getStats() 由来の totalAnswered/uniqueAnswered/accuracy を返す。
 *  - weakCategories は意図的に常に空配列（クライアント軽量化・docstring 準拠）。
 * 崩れると、新規ユーザーに無意味なプロファイルが付く / 既存ユーザーの個別最適化が消える。
 */
const KEY = "ipa-quiz:history:v1";

function seed(entries: HistoryEntry[]): void {
  window.localStorage.setItem(
    KEY,
    JSON.stringify({ entries, starredIds: [] }),
  );
}

function entry(id: string, correct: boolean): HistoryEntry {
  return { id, selected: "ア", correct, at: 0 };
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("buildLearnerProfileFromHistory 閾値門番", () => {
  it("履歴なしなら undefined", () => {
    expect(buildLearnerProfileFromHistory()).toBeUndefined();
  });

  it("回答 4 件（5 件未満）なら undefined", () => {
    seed([0, 1, 2, 3].map((i) => entry(`q${i}`, true)));
    expect(buildLearnerProfileFromHistory()).toBeUndefined();
  });

  it("回答 5 件ちょうどでプロファイルを返す（境界）", () => {
    seed([0, 1, 2, 3, 4].map((i) => entry(`q${i}`, true)));
    const profile = buildLearnerProfileFromHistory();
    expect(profile).toBeDefined();
    expect(profile?.totalAnswered).toBe(5);
  });
});

describe("buildLearnerProfileFromHistory 集計", () => {
  it("total / uniqueAnswered / accuracy が getStats と整合する", () => {
    // 6 件・うち重複 1 件（q0 を 2 回）・正答 3 件 → unique=5, accuracy=3/6
    seed([
      entry("q0", true),
      entry("q0", false),
      entry("q1", true),
      entry("q2", true),
      entry("q3", false),
      entry("q4", false),
    ]);
    const profile = buildLearnerProfileFromHistory();
    expect(profile?.totalAnswered).toBe(6);
    expect(profile?.uniqueAnswered).toBe(5);
    expect(profile?.accuracy).toBeCloseTo(3 / 6, 10);
  });

  it("weakCategories は常に空配列", () => {
    seed([0, 1, 2, 3, 4].map((i) => entry(`q${i}`, true)));
    expect(buildLearnerProfileFromHistory()?.weakCategories).toEqual([]);
  });
});

describe("buildLearnerProfileFromHistory fail-soft", () => {
  it("破損 JSON なら undefined（getStats が空集計→total 0<5）", () => {
    window.localStorage.setItem(KEY, "{broken");
    expect(buildLearnerProfileFromHistory()).toBeUndefined();
  });
});
