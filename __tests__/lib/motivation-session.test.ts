import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { summarizeSession, type SessionMeta, type SessionAnswer } from "@/lib/motivation/session";

// session.ts の summarizeSession は1セッション終了時のサマリ（正答率・所要時間・
// 分野別内訳・「明日のおすすめ問題数」）を出す純関数。正答率の四捨五入・分野集計の
// 降順・おすすめ数の閾値分岐(<60→+5 / [60,90)→+3 / >=90→+10)とクランプ[10,50]が
// 崩れると、結果ダイアログの数値が静かにずれる。崩れたら落ちる契約として現挙動を
// 回帰固定する（source 無変更・監査で実害バグ無し）。

const NOW = 1_700_000_000_000;

beforeEach(() => {
  vi.spyOn(Date, "now").mockReturnValue(NOW);
});
afterEach(() => {
  vi.restoreAllMocks();
});

function ans(correct: boolean, category = "テクノロジ系"): SessionAnswer {
  return { id: "q", correct, category, at: NOW };
}

function meta(answers: SessionAnswer[], startedAt = NOW): SessionMeta {
  return { startedAt, mode: "random", answers };
}

describe("summarizeSession — 集計", () => {
  it("空セッションは total/correct/accuracy=0・byCategory 空・durationSec>=1", () => {
    const s = summarizeSession(meta([]));
    expect(s.total).toBe(0);
    expect(s.correct).toBe(0);
    expect(s.accuracyPct).toBe(0);
    expect(s.byCategory).toEqual([]);
    expect(s.durationSec).toBeGreaterThanOrEqual(1);
  });

  it("正答率は四捨五入される（1/3 → 33）", () => {
    const s = summarizeSession(meta([ans(true), ans(false), ans(false)]));
    expect(s.total).toBe(3);
    expect(s.correct).toBe(1);
    expect(s.accuracyPct).toBe(33);
  });

  it("durationSec は経過秒（最低1秒）", () => {
    expect(summarizeSession(meta([], NOW - 5000)).durationSec).toBe(5);
    // startedAt == now でも 0 ではなく 1 に丸める
    expect(summarizeSession(meta([], NOW)).durationSec).toBe(1);
  });
});

describe("summarizeSession — 分野別内訳", () => {
  it("分野ごとに件数/正答を集計し件数降順で並べる", () => {
    const s = summarizeSession(
      meta([
        ans(true, "テクノロジ系"),
        ans(false, "テクノロジ系"),
        ans(true, "テクノロジ系"),
        ans(true, "マネジメント系"),
      ]),
    );
    expect(s.byCategory[0]).toEqual({
      category: "テクノロジ系",
      total: 3,
      correct: 2,
      accuracyPct: 67,
    });
    expect(s.byCategory[1]).toEqual({
      category: "マネジメント系",
      total: 1,
      correct: 1,
      accuracyPct: 100,
    });
  });

  it("空文字の分野は『未分類』に集約される", () => {
    const s = summarizeSession(meta([ans(true, "")]));
    expect(s.byCategory[0].category).toBe("未分類");
  });
});

describe("summarizeSession — recommendedTomorrow（閾値分岐とクランプ[10,50]）", () => {
  function withAccuracy(total: number, correct: number): number {
    const answers = Array.from({ length: total }, (_, i) => ans(i < correct));
    return summarizeSession(meta(answers)).recommendedTomorrow;
  }

  it("正答率 <60% は baseline+5", () => {
    // total=10, 5正解=50% → 10+5=15
    expect(withAccuracy(10, 5)).toBe(15);
  });

  it("正答率 60〜89% は baseline+3", () => {
    // total=10, 7正解=70% → 10+3=13
    expect(withAccuracy(10, 7)).toBe(13);
  });

  it("正答率 >=90% は baseline+10（追い込み）", () => {
    // total=10, 9正解=90% → 10+10=20
    expect(withAccuracy(10, 9)).toBe(20);
  });

  it("下限10にクランプ（少問数の高得点）", () => {
    // total=3, 2正解=67%(mid) → 3+3=6 → max(10,6)=10
    expect(withAccuracy(3, 2)).toBe(10);
  });

  it("上限50にクランプ（多問数の高得点）", () => {
    // total=50, 50正解=100% → 50+10=60 → min(50,60)=50
    expect(withAccuracy(50, 50)).toBe(50);
  });

  it("空セッションは baseline=10 として +5 → 15", () => {
    expect(summarizeSession(meta([])).recommendedTomorrow).toBe(15);
  });
});
