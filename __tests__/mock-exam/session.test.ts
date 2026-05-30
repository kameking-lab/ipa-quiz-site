import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  clearActiveSession,
  computeRemainingSec,
  loadActiveSession,
  saveActiveSession,
  type MockExamActiveSession,
} from "@/lib/mock-exam/session";
import type { SlimMockQuestion } from "@/lib/mock-exam/types";

// 模試の中断/再開ポインタを localStorage に往復させる層。SESSION_KEY と
// 6時間 TTL は session.ts に内包される契約なのでテスト側にも明示する。
const SESSION_KEY = "ipa-quiz:mock-exam-session:v1";
const SESSION_TTL_MS = 1000 * 60 * 60 * 6;

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
  window.localStorage.clear();
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

describe("saveActiveSession / loadActiveSession — 中断状態の往復", () => {
  it("保存した内容を往復で復元できる（全フィールド保持）", () => {
    const s = session({ index: 2, answers: ["ア"], totalSec: 4200 });
    saveActiveSession(s);
    const loaded = loadActiveSession();
    expect(loaded).not.toBeNull();
    expect(loaded?.exam).toBe(s.exam);
    expect(loaded?.startedAt).toBe(s.startedAt);
    expect(loaded?.totalSec).toBe(4200);
    expect(loaded?.index).toBe(2);
    expect(loaded?.answers).toEqual(["ア"]);
    expect(loaded?.questions).toEqual(s.questions);
  });

  it("savedAt は保存時刻で上書きされる（入力値ではなく Date.now）", () => {
    // 入力の savedAt は遥か過去だが、保存時に Date.now() = NOW で刻み直される。
    saveActiveSession(session({ savedAt: NOW - 999_999_999 }));
    expect(loadActiveSession()?.savedAt).toBe(NOW);
  });

  it("未保存なら null", () => {
    expect(loadActiveSession()).toBeNull();
  });

  it("壊れた JSON は握りつぶして null（throw しない）", () => {
    window.localStorage.setItem(SESSION_KEY, "{not json");
    expect(loadActiveSession()).toBeNull();
  });

  it("questions が空配列なら復元しない（再開不能なゴミを掴まない）", () => {
    saveActiveSession(session({ questions: [] }));
    expect(loadActiveSession()).toBeNull();
  });

  it("startedAt が数値でなければ復元しない", () => {
    saveActiveSession(
      session({ startedAt: "x" as unknown as number }),
    );
    expect(loadActiveSession()).toBeNull();
  });
});

describe("loadActiveSession — 6時間 TTL", () => {
  it("TTL ちょうど（境界）は期限切れにしない", () => {
    saveActiveSession(session()); // savedAt = NOW
    vi.spyOn(Date, "now").mockReturnValue(NOW + SESSION_TTL_MS);
    expect(loadActiveSession()).not.toBeNull();
  });

  it("TTL を 1ms でも超えたら期限切れで null、かつキーを掃除する", () => {
    saveActiveSession(session()); // savedAt = NOW
    expect(window.localStorage.length).toBe(1);
    vi.spyOn(Date, "now").mockReturnValue(NOW + SESSION_TTL_MS + 1);
    expect(loadActiveSession()).toBeNull();
    // 期限切れ検出時に clearActiveSession で除去される（古い状態が残らない）。
    expect(window.localStorage.length).toBe(0);
  });
});

describe("clearActiveSession", () => {
  it("保存済みセッションを除去する", () => {
    saveActiveSession(session());
    expect(loadActiveSession()).not.toBeNull();
    clearActiveSession();
    expect(loadActiveSession()).toBeNull();
  });
});
