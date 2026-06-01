import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { KamokuBStudyHint } from "@/components/quiz/KamokuBStudyHint";
import type { ExamCode, Session } from "@/lib/questions/types";

// 土台＝基本情報 科目B 完全対策ピラー(/blog/fe-kamoku-b-taisaku)への /q ページ導線が、
// FE の科目B(session === "kamoku-b")にだけ出て、それ以外(FE午前/科目A・他区分・
// 他セッション)には出ないことを固定。誇大回避: FE午前MC「アルゴリズムとプログラミング」
// 分野は擬似言語そのものではないため、分野ではなく session で厳密ゲートする。
afterEach(() => cleanup());

const ALL_EXAMS: ExamCode[] = [
  "ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au",
];
const NON_KAMOKU_B_SESSIONS: Session[] = [
  "am", "am1", "am2", "pm", "pm1", "pm2", "kamoku-a",
];

describe("KamokuBStudyHint — FE科目Bゲート", () => {
  it("FEの科目B(kamoku-b)では土台ピラーへのリンクを SSR 出力する", () => {
    render(<KamokuBStudyHint exam="fe" session="kamoku-b" />);
    const link = screen.getByRole("link", { name: /科目B 完全対策を読む/ });
    expect(link.getAttribute("href")).toBe("/blog/fe-kamoku-b-taisaku");
  });

  it("FEでも科目B以外のセッションでは何も描画しない", () => {
    for (const session of NON_KAMOKU_B_SESSIONS) {
      cleanup();
      const { container } = render(
        <KamokuBStudyHint exam="fe" session={session} />,
      );
      expect(container.innerHTML).toBe("");
    }
  });

  it("FE以外の区分では(kamoku-b相当でも)何も描画しない（誇大導線を作らない）", () => {
    for (const exam of ALL_EXAMS.filter((e) => e !== "fe")) {
      cleanup();
      const { container } = render(
        <KamokuBStudyHint exam={exam} session="kamoku-b" />,
      );
      expect(container.innerHTML).toBe("");
    }
  });

  it("non-vacuous: 全区分を exercise し FE のみが対象", () => {
    expect(ALL_EXAMS.length).toBe(13);
    expect(ALL_EXAMS).toContain("fe");
    expect(NON_KAMOKU_B_SESSIONS.length).toBeGreaterThan(0);
  });
});
