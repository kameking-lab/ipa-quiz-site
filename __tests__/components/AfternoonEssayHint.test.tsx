import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { AfternoonEssayHint } from "@/components/quiz/AfternoonEssayHint";
import { ESSAY_EXAM_CODES } from "@/lib/essay/load";
import type { ExamCode } from "@/lib/questions/types";

// 旗艦＝午後論述AI採点(/essay)への /q ページ導線が、論述データを持つ高度区分
// (ST/SA/PM/SM/AU) にだけ出て、非論述・モック区分(ap/fe 等)には出ないことを固定。
// ゲートが ESSAY_EXAM_CODES から drift して誇大導線が漏れたら落ちる。
afterEach(() => cleanup());

const NON_ESSAY_EXAMS: ExamCode[] = ["ip", "sg", "fe", "ap", "sc", "nw", "db", "es"];

describe("AfternoonEssayHint — 論述区分ゲート", () => {
  it("論述区分(ST/SA/PM/SM/AU)では /essay への旗艦リンクを SSR 出力する", () => {
    for (const exam of ESSAY_EXAM_CODES) {
      cleanup();
      render(<AfternoonEssayHint exam={exam as ExamCode} />);
      const link = screen.getByRole("link", { name: /午後論述 AI 添削を試す/ });
      expect(link.getAttribute("href")).toBe("/essay");
    }
  });

  it("非論述・モック区分では何も描画しない（誇大導線を作らない）", () => {
    for (const exam of NON_ESSAY_EXAMS) {
      cleanup();
      const { container } = render(<AfternoonEssayHint exam={exam} />);
      expect(container.innerHTML).toBe("");
    }
  });

  it("ゲートは実データのある論述5区分に一致（non-vacuous）", () => {
    expect([...ESSAY_EXAM_CODES].sort()).toEqual(["au", "pm", "sa", "sm", "st"]);
    // 上の2テストが exercise した区分の合計が全区分を網羅していること。
    expect(ESSAY_EXAM_CODES.length).toBe(5);
    expect(NON_ESSAY_EXAMS.length).toBeGreaterThan(0);
  });
});
