import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  computeRemainingSec,
  type MockExamActiveSession,
} from "@/lib/mock-exam/session";
import type { SlimMockQuestion } from "@/lib/mock-exam/types";

// session.ts の computeRemainingSec は模試タイマーの残り秒を返す純関数。
// 残り = max(0, totalSec - floor((now - startedAt)/1000))。
// 最重要契約: 経過時間は savedAt（最終保存時刻）ではなく startedAt（開始時刻）
// 基準で測る。これによりタブを閉じてもタイマーは止まらず、実試験の挙動に揃う。
// この基準が savedAt に化けたり clamp/floor が崩れると、再開時の残り時間が静かに
// ずれる（タブを閉じて時間稼ぎできてしまう）。崩れたら落ちる契約として現挙動を
// 回帰固定する（source 無変更・監査で実害バグ無し）。

const NOW = 1_700_000_000_000;

beforeEach(() => {
  vi.spyOn(Date, "now").mockReturnValue(NOW);
});
afterEach(() => {
  vi.restoreAllMocks();
});

const Q: SlimMockQuestion = {
  id: "q1",
  question: "?",
  choices: { ア: "a" },
  answer: "ア",
  category: "テクノロジ系",
};

function session(
  overrides: Partial<MockExamActiveSession> = {},
): MockExamActiveSession {
  return {
    exam: "ap",
    startedAt: NOW,
    savedAt: NOW,
    totalSec: 3600,
    questions: [Q],
    answers: [undefined],
    index: 0,
    ...overrides,
  };
}

describe("computeRemainingSec — 模試タイマー残り秒", () => {
  it("開始直後（経過0）は totalSec をそのまま返す", () => {
    expect(computeRemainingSec(session({ startedAt: NOW, totalSec: 3600 }))).toBe(
      3600,
    );
  });

  it("半分経過なら残りは半分", () => {
    expect(
      computeRemainingSec(
        session({ startedAt: NOW - 1800 * 1000, totalSec: 3600 }),
      ),
    ).toBe(1800);
  });

  it("制限を超過しても 0 でクランプ（負にならない）", () => {
    expect(
      computeRemainingSec(
        session({ startedAt: NOW - 4000 * 1000, totalSec: 3600 }),
      ),
    ).toBe(0);
  });

  it("端数ミリ秒は floor で切り捨て（1.5秒経過→1秒消費）", () => {
    expect(
      computeRemainingSec(session({ startedAt: NOW - 1500, totalSec: 10 })),
    ).toBe(9);
  });

  it("経過は savedAt ではなく startedAt 基準（タブを閉じてもタイマーは止まらない）", () => {
    // savedAt は今（直近保存）だが startedAt は3000秒前。
    // savedAt 基準なら 3600 を返してしまうが、startedAt 基準なので 600。
    expect(
      computeRemainingSec(
        session({ startedAt: NOW - 3000 * 1000, savedAt: NOW, totalSec: 3600 }),
      ),
    ).toBe(600);
  });
});
