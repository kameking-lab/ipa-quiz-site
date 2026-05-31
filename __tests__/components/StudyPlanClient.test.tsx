import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { StudyPlanClient } from "@/app/account/study-plan/StudyPlanClient";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

// 「受験する試験」select と「試験日」input の可視ラベルが htmlFor で関連付いておらず、
// SR 利用者はアクセシブルネームを得られなかった（WCAG 1.3.1 / 4.1.2）。
// label[htmlFor] + control[id] で関連付ける。
describe("StudyPlanClient — フォームコントロールのラベル関連付け", () => {
  it("「受験する試験」select がラベルで参照できる", () => {
    render(<StudyPlanClient />);
    const select = screen.getByLabelText("受験する試験");
    expect(select.tagName).toBe("SELECT");
  });

  it("「試験日」input がラベルで参照できる", () => {
    render(<StudyPlanClient />);
    const input = screen.getByLabelText("試験日");
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("type")).toBe("date");
  });
});

// 残り日数の算出が JST 暦日ベースで一致すること（lib/learning analytics の daysUntil に委譲）。
// 旧ローカル実装は target を UTC 深夜・today を端末ローカル深夜で比較し Math.ceil していたため、
// JST 00:00〜09:00 の時間帯は残り日数が常に1多く出ていた（端末 TZ に依らず off-by-one）。
// 当該時間帯にシステム時刻を固定して検証する＝旧実装ではどの TZ でも落ちる。
describe("StudyPlanClient — 残り日数の JST 境界", () => {
  // 2024-10-20T20:00:00Z = JST 2024-10-21 05:00（JST の当日朝 = 旧実装が +1 ずれる窓）
  const JST_EARLY_MORNING = new Date("2024-10-20T20:00:00Z");

  afterEach(() => {
    vi.useRealTimers();
  });

  function generateFor(examDate: string) {
    render(<StudyPlanClient />);
    fireEvent.change(screen.getByLabelText("試験日"), { target: { value: examDate } });
    fireEvent.click(screen.getByText("学習プランを生成"));
  }

  it("試験日が JST の当日なら残り0日扱いでプランを生成しない（旧実装は1日でプラン生成＝落ちる）", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(JST_EARLY_MORNING);
    generateFor("2024-10-21"); // JST の「今日」
    expect(screen.queryByText("残り日数")).toBeNull();
  });

  it("試験日が JST 基準で20日後なら残り日数は20日（旧実装は21日＝落ちる）", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(JST_EARLY_MORNING);
    generateFor("2024-11-10"); // 2024-10-21 + 20日
    expect(screen.getByText("残り日数")).toBeInTheDocument();
    expect(screen.getByText("20日")).toBeInTheDocument();
  });
});
