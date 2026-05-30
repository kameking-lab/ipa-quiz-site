import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  BADGE_THRESHOLDS,
  syncBadgesWithStreak,
  nextBadge,
  getEarnedBadges,
} from "@/lib/motivation/badges";

// badges.ts は連続学習日数に応じた獲得バッジ（3/7/30/100/365日）を管理する。
// syncBadgesWithStreak の閾値判定・newlyEarned の検出・earned のソート、nextBadge の
// 次目標選定が崩れると、ゲーミフィケーションの達成演出が誤作動する。崩れたら落ちる
// 契約として現挙動を回帰固定する。あわせて、空状態が module 共有定数の参照返しで
// 汚染されない「絶対参照純度」（S34/S36/S37 と同型の footgun ハードニング）を検証する。

beforeEach(() => {
  window.localStorage.clear();
  vi.spyOn(Date, "now").mockReturnValue(1_700_000_000_000);
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe("syncBadgesWithStreak", () => {
  it("閾値到達でバッジを新規獲得し earnedAt を記録する", () => {
    const { state, newlyEarned } = syncBadgesWithStreak(7, 7);
    // 7日 → 3日・7日の両方を新規獲得
    expect(newlyEarned.sort((a, b) => a - b)).toEqual([3, 7]);
    expect(state.earned).toEqual([3, 7]);
    expect(state.earnedAt[3]).toBe(1_700_000_000_000);
    expect(state.earnedAt[7]).toBe(1_700_000_000_000);
  });

  it("currentStreak と longestStreak の大きい方で判定する", () => {
    // 現在の連続は1日でも、過去最長30日なら 3/7/30 を獲得
    const { newlyEarned } = syncBadgesWithStreak(1, 30);
    expect(newlyEarned.sort((a, b) => a - b)).toEqual([3, 7, 30]);
  });

  it("既に獲得済みのバッジは再獲得しない（冪等）", () => {
    syncBadgesWithStreak(7, 7);
    const { newlyEarned, state } = syncBadgesWithStreak(7, 7);
    expect(newlyEarned).toEqual([]);
    expect(state.earned).toEqual([3, 7]);
  });

  it("追加獲得分は earned が昇順に保たれる", () => {
    syncBadgesWithStreak(3, 3); // [3]
    const { state } = syncBadgesWithStreak(30, 30); // +7,+30
    expect(state.earned).toEqual([3, 7, 30]);
  });

  it("閾値未満（<3日）では何も獲得しない", () => {
    const { newlyEarned, state } = syncBadgesWithStreak(2, 2);
    expect(newlyEarned).toEqual([]);
    expect(state.earned).toEqual([]);
  });
});

describe("nextBadge", () => {
  it("現在の連続を超える最小の閾値バッジを返す", () => {
    expect(nextBadge(0)?.threshold).toBe(3);
    expect(nextBadge(3)?.threshold).toBe(7);
    expect(nextBadge(29)?.threshold).toBe(30);
  });

  it("最大閾値以上では null（次がない）", () => {
    expect(nextBadge(365)).toBeNull();
    expect(nextBadge(1000)).toBeNull();
  });
});

describe("空状態の絶対参照純度（共有 EMPTY 破壊 footgun の回帰ガード）", () => {
  it("空ストレージで sync→破壊した後、キー消失後の空読みが汚染されない", () => {
    // 空ストレージで獲得 → module 共有定数を push 破壊する余地がある
    syncBadgesWithStreak(7, 7);
    // ストレージのキーが消える経路（外部クリア等）をシミュレート
    window.localStorage.clear();
    // 修正前（read が共有 EMPTY を浅コピー）だと earned が [3,7] に汚染される
    expect(getEarnedBadges().earned).toEqual([]);
    expect(getEarnedBadges().earnedAt).toEqual({});
  });

  it("BADGE_THRESHOLDS は昇順の正準集合", () => {
    expect([...BADGE_THRESHOLDS]).toEqual([3, 7, 30, 100, 365]);
  });
});
