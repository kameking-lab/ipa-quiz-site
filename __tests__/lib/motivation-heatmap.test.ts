import { describe, it, expect, beforeEach } from "vitest";
import {
  dateForEntry,
  rebuildHeatmapFromHistory,
  generateDayRange,
  intensityLevel,
  totalStudyDays,
  totalAnswered,
  recordStudyOnDate,
  getHeatmapMap,
  syncHeatmapWithHistory,
} from "@/lib/motivation/heatmap";
import { jstDateString } from "@/lib/streak/core";
import { LS_KEYS } from "@/lib/storage/keys";
import type { HistoryEntry } from "@/lib/storage/history";

// heatmap.ts は学習ヒートマップ（日別回答数）の集計純関数群。強度バケット・連続日範囲・
// 集計合計が崩れるとカレンダー表示や「学習日数」KPI が静かにずれる。
// 崩れたら落ちる契約として現挙動を回帰固定する（source 無変更）。

beforeEach(() => {
  window.localStorage.clear();
});

function entry(at: number): HistoryEntry {
  return { id: "ap-q1", selected: "ア", correct: true, at };
}

describe("dateForEntry", () => {
  it("タイムスタンプを JST 暦日文字列へ変換する", () => {
    const at = Date.UTC(2024, 9, 21, 3, 0, 0); // 2024-10-21 12:00 JST
    expect(dateForEntry(at)).toBe(jstDateString(new Date(at)));
  });
});

describe("rebuildHeatmapFromHistory", () => {
  it("同一 JST 日のエントリを件数に集計する", () => {
    const base = Date.UTC(2024, 9, 21, 3, 0, 0);
    const map = rebuildHeatmapFromHistory([
      entry(base),
      entry(base + 60_000),
      entry(base + 86_400_000), // 翌日
    ]);
    const day1 = dateForEntry(base);
    const day2 = dateForEntry(base + 86_400_000);
    expect(map[day1]).toBe(2);
    expect(map[day2]).toBe(1);
  });

  it("空配列は空マップ", () => {
    expect(rebuildHeatmapFromHistory([])).toEqual({});
  });
});

describe("generateDayRange", () => {
  it("末尾日を含む連続 N 日を昇順で返す", () => {
    const end = new Date(Date.UTC(2024, 9, 21, 3, 0, 0));
    const range = generateDayRange(3, end);
    expect(range).toHaveLength(3);
    expect(range[2]).toBe(jstDateString(end));
    // 連続・昇順（重複なし）
    expect(new Set(range).size).toBe(3);
    expect([...range].sort()).toEqual(range);
  });

  it("days=1 は末尾日のみ", () => {
    const end = new Date(Date.UTC(2024, 0, 1, 3, 0, 0));
    expect(generateDayRange(1, end)).toEqual([jstDateString(end)]);
  });
});

describe("intensityLevel", () => {
  it("バケット境界を固定する（0 / <5 / <15 / <30 / >=30）", () => {
    expect(intensityLevel(0)).toBe(0);
    expect(intensityLevel(-3)).toBe(0);
    expect(intensityLevel(1)).toBe(1);
    expect(intensityLevel(4)).toBe(1);
    expect(intensityLevel(5)).toBe(2);
    expect(intensityLevel(14)).toBe(2);
    expect(intensityLevel(15)).toBe(3);
    expect(intensityLevel(29)).toBe(3);
    expect(intensityLevel(30)).toBe(4);
    expect(intensityLevel(100)).toBe(4);
  });
});

describe("空状態の絶対参照純度（共有 EMPTY 破壊 footgun の回帰ガード）", () => {
  it("空ストレージで recordStudyOnDate→破壊した後、キー消失後の空読みが汚染されない", () => {
    // 空ストレージで記録 → read() の空経路が共有 EMPTY.byDate を返すと
    // recordStudyOnDate の `stored.byDate[date]=` が共有定数を破壊する余地がある。
    recordStudyOnDate("2024-10-21");
    // studyDays キーが消える経路（外部クリア等）をシミュレート
    window.localStorage.clear();
    // 修正前（read が共有 EMPTY を浅コピー）だと byDate が汚染されたまま残る
    expect(getHeatmapMap()).toEqual({});
  });
});

describe("syncHeatmapWithHistory — エントリ数キャッシュゲート", () => {
  const base = Date.UTC(2024, 9, 21, 3, 0, 0); // 2024-10-21 JST
  // 既存キャッシュとは絶対に一致しないセンチネル日（rebuild では生成され得ない）。
  const SENTINEL = { "2099-01-01": 42 };

  function seed(byDate: Record<string, number>, lastEntryCount: number): void {
    window.localStorage.setItem(
      LS_KEYS.studyDays,
      JSON.stringify({ byDate, lastSeenAt: 0, lastEntryCount }),
    );
  }

  it("空キャッシュからは履歴を再集計して返す", () => {
    const entries = [entry(base), entry(base + 60_000)];
    expect(syncHeatmapWithHistory(entries)).toEqual(
      rebuildHeatmapFromHistory(entries),
    );
  });

  it("件数一致かつ非空キャッシュなら再集計せず保存済みマップを返す（短絡）", () => {
    seed(SENTINEL, 2);
    // 長さ2だが rebuild すれば SENTINEL とは別物になる入力。短絡なら stale を返す。
    const out = syncHeatmapWithHistory([entry(base), entry(base + 60_000)]);
    expect(out).toEqual(SENTINEL);
  });

  it("件数が変われば短絡せず再集計する", () => {
    seed(SENTINEL, 5); // 保存件数5 ≠ 入力2
    const entries = [entry(base), entry(base + 60_000)];
    const out = syncHeatmapWithHistory(entries);
    expect(out).toEqual(rebuildHeatmapFromHistory(entries));
    expect(out).not.toHaveProperty("2099-01-01");
  });

  it("件数一致でもキャッシュが空なら再集計する（byDate 非空ガード）", () => {
    seed({}, 2);
    const entries = [entry(base), entry(base + 60_000)];
    const out = syncHeatmapWithHistory(entries);
    expect(out).toEqual(rebuildHeatmapFromHistory(entries));
    expect(Object.keys(out).length).toBeGreaterThan(0);
  });
});

describe("totalStudyDays / totalAnswered", () => {
  const byDate = { "2024-10-21": 3, "2024-10-22": 0, "2024-10-23": 5 };

  it("totalStudyDays は count>0 の日数のみ数える", () => {
    expect(totalStudyDays(byDate)).toBe(2);
    expect(totalStudyDays({})).toBe(0);
  });

  it("totalAnswered は全 count の合計", () => {
    expect(totalAnswered(byDate)).toBe(8);
    expect(totalAnswered({})).toBe(0);
  });
});
