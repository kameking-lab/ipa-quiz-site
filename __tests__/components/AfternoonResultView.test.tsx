import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { AfternoonResultView } from "@/components/afternoon/AfternoonResultView";
import { IPA_EXAM_INFO_URL } from "@/lib/exam-config";
import type {
  AfternoonQuestion,
  AfternoonScoringResult,
} from "@/lib/afternoon/types";

function makeQuestion(): AfternoonQuestion {
  return {
    id: "st-2024a-pm2-q1",
    exam: "st",
    year: 2024,
    season: "autumn",
    qNumber: 1,
    type: "essay",
    category: "システム戦略",
    title: "論述テスト大問",
    context: "背景。",
    subQuestions: [
      {
        label: "設問ア",
        prompt: "事業概要を述べよ。",
        type: "essay-text",
        minLength: 600,
        maxLength: 800,
        modelAnswer: "汎用の模範論述ア。",
        scoringRubric: "ルーブリック",
      },
    ],
    pdfUrl: "https://example.com/q.pdf",
    license: "IPA-public",
    industryVariants: [
      {
        industryId: "manufacturing",
        industryName: "製造業",
        essayA: "製造業向けの設問ア論述例。",
        essayI: "製造業向けの設問イ論述例。",
        essayU: "製造業向けの設問ウ論述例。",
      },
    ],
  };
}

const result: AfternoonScoringResult = {
  questionId: "st-2024a-pm2-q1",
  totalScore: 72,
  subResults: [
    {
      label: "設問ア",
      score: 72,
      goodPoints: ["論点が明確"],
      improvements: ["具体性を補強"],
      modelAnswer: "",
    },
  ],
  overallComment: "全体に良好。",
};

beforeEach(() => {
  cleanup();
});

// 業種セレクタは「タブ」ではなく aria-pressed トグルボタン群（codebase 既定の
// セグメント UI 慣用に統一）。role="tab"/aria-selected は矢印キーや tabpanel の
// 暗黙契約を約束してしまうが本実装はそれを満たさないため使わない。
describe("AfternoonResultView — 業種セレクタ A11y", () => {
  it("業種ボタンは aria-pressed トグルで、tab ロールを使わない", () => {
    render(<AfternoonResultView question={makeQuestion()} result={result} />);

    // tab ロールが存在しない
    expect(screen.queryAllByRole("tab")).toHaveLength(0);

    // 「共通（汎用）」は初期選択 = aria-pressed=true
    const common = screen.getByRole("button", { name: "共通（汎用）" });
    expect(common.getAttribute("aria-pressed")).toBe("true");

    const mfg = screen.getByRole("button", { name: "製造業" });
    expect(mfg.getAttribute("aria-pressed")).toBe("false");
  });

  it("出典 PDF リンクは廃止 jitec ホストを live IPA 索引へ degrade する", () => {
    // 全 afternoon データの pdfUrl は廃止された www.jitec.ipa.go.jp を指す。
    // 生で href に出すと NXDOMAIN の死リンクになるため getSafePdfUrl で gate する。
    const q = makeQuestion();
    q.pdfUrl =
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024a06_1/2024a06a_st_pm2_qs.pdf";
    render(<AfternoonResultView question={q} result={result} />);

    const link = screen.getByRole("link", { name: /出典 PDF を開く/ });
    expect(link.getAttribute("href")).toBe(IPA_EXAM_INFO_URL);
    expect(link.getAttribute("href")).not.toContain("jitec.ipa.go.jp");
  });

  it("業種を選ぶと pressed 状態と模範論述が切り替わる", () => {
    render(<AfternoonResultView question={makeQuestion()} result={result} />);

    fireEvent.click(screen.getByRole("button", { name: "製造業" }));

    expect(
      screen.getByRole("button", { name: "製造業" }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen.getByRole("button", { name: "共通（汎用）" }).getAttribute("aria-pressed"),
    ).toBe("false");
    // 業種版の模範論述が表示される
    expect(screen.getByText("製造業向けの設問ア論述例。")).toBeTruthy();
  });
});
