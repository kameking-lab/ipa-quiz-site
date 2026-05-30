import { describe, it, expect, beforeEach } from "vitest";
import {
  DEFAULT_DAILY_GOAL,
  MIN_DAILY_GOAL,
  MAX_DAILY_GOAL,
  readDailyGoalTarget,
  writeDailyGoalTarget,
  getDailyProgress,
} from "@/lib/motivation/daily-goal";
import { LS_KEYS } from "@/lib/storage/keys";
import { jstDateString } from "@/lib/streak/core";

// daily-goal.ts は「今日の学習目標」の達成度を出す純関数。getDailyProgress が
// ヒートマップ(本日の回答数)と目標値から count/target/pct/completed を導く。
// pct のクランプ・completed の境界・目標値の clamp が崩れると、ホームや学習
// ダッシュボードの進捗表示が静かにずれる。崩れたら落ちる契約として現挙動を
// 回帰固定する（source 無変更）。

beforeEach(() => {
  window.localStorage.clear();
});

/** 本日(JST)の回答数を heatmap ストレージに直接仕込む。 */
function seedTodayCount(count: number): void {
  const today = jstDateString();
  window.localStorage.setItem(
    LS_KEYS.studyDays,
    JSON.stringify({ byDate: { [today]: count }, lastSeenAt: 0, lastEntryCount: 0 }),
  );
}

function seedTarget(target: number): void {
  window.localStorage.setItem(LS_KEYS.dailyGoal, JSON.stringify({ target }));
}

describe("readDailyGoalTarget", () => {
  it("未設定なら既定値を返す", () => {
    expect(readDailyGoalTarget()).toBe(DEFAULT_DAILY_GOAL);
  });

  it("有効な保存値をそのまま返す", () => {
    seedTarget(25);
    expect(readDailyGoalTarget()).toBe(25);
  });

  it("範囲外(0 / 101)や非数値は既定値へフォールバック", () => {
    seedTarget(0);
    expect(readDailyGoalTarget()).toBe(DEFAULT_DAILY_GOAL);
    seedTarget(MAX_DAILY_GOAL + 1);
    expect(readDailyGoalTarget()).toBe(DEFAULT_DAILY_GOAL);
    window.localStorage.setItem(LS_KEYS.dailyGoal, JSON.stringify({ target: "20" }));
    expect(readDailyGoalTarget()).toBe(DEFAULT_DAILY_GOAL);
  });

  it("壊れた JSON は既定値へフォールバック", () => {
    window.localStorage.setItem(LS_KEYS.dailyGoal, "{not json");
    expect(readDailyGoalTarget()).toBe(DEFAULT_DAILY_GOAL);
  });
});

describe("writeDailyGoalTarget", () => {
  it("範囲内の値は四捨五入して保存される", () => {
    writeDailyGoalTarget(10.6);
    expect(readDailyGoalTarget()).toBe(11);
  });

  it("下限・上限にクランプされる", () => {
    writeDailyGoalTarget(0);
    expect(readDailyGoalTarget()).toBe(MIN_DAILY_GOAL);
    writeDailyGoalTarget(99999);
    expect(readDailyGoalTarget()).toBe(MAX_DAILY_GOAL);
  });
});

describe("getDailyProgress", () => {
  it("空ストレージは count=0・target=既定・pct=0・未達", () => {
    expect(getDailyProgress()).toEqual({
      count: 0,
      target: DEFAULT_DAILY_GOAL,
      pct: 0,
      completed: false,
    });
  });

  it("達成途中は pct を百分率(四捨五入)で返し completed=false", () => {
    seedTarget(10);
    seedTodayCount(4);
    expect(getDailyProgress()).toEqual({ count: 4, target: 10, pct: 40, completed: false });
  });

  it("pct は四捨五入される（1/3 → 33）", () => {
    seedTarget(3);
    seedTodayCount(1);
    expect(getDailyProgress().pct).toBe(33);
  });

  it("ちょうど達成で completed=true・pct=100", () => {
    seedTarget(10);
    seedTodayCount(10);
    expect(getDailyProgress()).toEqual({ count: 10, target: 10, pct: 100, completed: true });
  });

  it("超過しても pct は 100 にクランプされ completed=true", () => {
    seedTarget(10);
    seedTodayCount(25);
    const p = getDailyProgress();
    expect(p.count).toBe(25);
    expect(p.pct).toBe(100);
    expect(p.completed).toBe(true);
  });

  it("本日以外の回答数は count に含めない", () => {
    seedTarget(10);
    // 本日以外の日付のみを仕込む → 本日は 0 件のまま
    window.localStorage.setItem(
      LS_KEYS.studyDays,
      JSON.stringify({ byDate: { "2020-01-01": 50 }, lastSeenAt: 0, lastEntryCount: 0 }),
    );
    expect(getDailyProgress().count).toBe(0);
  });
});
