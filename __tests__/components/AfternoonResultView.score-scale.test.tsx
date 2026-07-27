import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { AfternoonResultView } from "@/components/afternoon/AfternoonResultView";
import type {
  AfternoonQuestion,
  AfternoonScoringResult,
  SubScoringResult,
} from "@/lib/afternoon/types";

/**
 * 午後採点の点数表示スケール（ブロッカー4）。
 *
 * 本番実測の症状: 模範解答相当の答案で totalScore=95 が返るのに、設問別が
 * 「20 / 100」「15 / 100」と表示され、40点未満=danger(赤) の配色で
 * 「ほぼ0点」に見える危険表示になっていた。
 *
 * 原因は 2 つの取り違え:
 *  - AI が返す設問スコアは「その設問の配点(20点/15点/30点)に対する得点」なのに、
 *    一律「/ 100」と描画していた
 *  - 色の閾値(70/40)を割合ではなく素点に当てていた
 *
 * 採用方式: 設問配点に対する得点として表示する（「20 / 20」）。色は満点に対する
 * 割合で判定する。ここで固定する契約:
 *  1. 満点答案 → 「{配点} / {配点}」かつ success(緑)
 *  2. 部分点   → warn(黄)
 *  3. 低得点   → danger(赤)
 *  4. 配点未設定の設問は従来どおり 100 点満点表示（後方互換）
 */

const SUCCESS = "bg-emerald-100";
const WARN = "bg-amber-100";
const DANGER = "bg-red-100";

function makeQuestion(): AfternoonQuestion {
  return {
    id: "ap-test-pm-q1",
    exam: "ap",
    year: 2024,
    season: "spring",
    qNumber: 1,
    type: "descriptive",
    category: "情報セキュリティ",
    title: "配点テスト大問",
    context: "背景。",
    subQuestions: [
      {
        label: "設問1",
        prompt: "満点の設問。",
        type: "long-text",
        maxLength: 40,
        modelAnswer: "模範1",
        scoringRubric: "r",
        points: 20,
      },
      {
        label: "設問2",
        prompt: "部分点の設問。",
        type: "long-text",
        maxLength: 40,
        modelAnswer: "模範2",
        scoringRubric: "r",
        points: 15,
      },
      {
        label: "設問3",
        prompt: "低得点の設問。",
        type: "long-text",
        maxLength: 50,
        modelAnswer: "模範3",
        scoringRubric: "r",
        points: 30,
      },
      {
        label: "設問4",
        prompt: "配点未設定の設問。",
        type: "long-text",
        maxLength: 40,
        modelAnswer: "模範4",
        scoringRubric: "r",
      },
    ],
    pdfUrl: "https://example.com/q.pdf",
    license: "IPA-public",
  };
}

function sub(label: string, score: number): SubScoringResult {
  return { label, score, goodPoints: [], improvements: [], modelAnswer: "" };
}

function makeResult(): AfternoonScoringResult {
  return {
    questionId: "ap-test-pm-q1",
    totalScore: 95,
    subResults: [
      sub("設問1", 20), // 20/20 = 100% → 緑
      sub("設問2", 9), // 9/15 = 60%  → 黄
      sub("設問3", 6), // 6/30 = 20%  → 赤
      sub("設問4", 80), // 配点なし → 80/100 = 80% → 緑
    ],
    overallComment: "",
  };
}

/** 設問ラベルと同じ <li> 内にある Badge の class を返す。 */
function badgeClassFor(label: string): string {
  const li = screen.getByText(label).closest("li");
  expect(li).not.toBeNull();
  const badge = Array.from(li!.querySelectorAll("span")).find((el) =>
    /\d+\s*\/\s*\d+/.test(el.textContent ?? ""),
  );
  expect(badge, `${label} の得点バッジが見つからない`).toBeTruthy();
  return badge!.className;
}

/** 設問ラベルと同じ <li> 内の得点テキスト（空白を潰す）。 */
function badgeTextFor(label: string): string {
  const li = screen.getByText(label).closest("li");
  const badge = Array.from(li!.querySelectorAll("span")).find((el) =>
    /\d+\s*\/\s*\d+/.test(el.textContent ?? ""),
  );
  return (badge!.textContent ?? "").replace(/\s+/g, "");
}

beforeEach(() => {
  cleanup();
});

describe("AfternoonResultView — 設問別得点は配点に対して表示する", () => {
  it("設問別の分母は一律 100 ではなく、その設問の配点になる", () => {
    render(<AfternoonResultView question={makeQuestion()} result={makeResult()} />);

    // 修正前はすべて「/ 100」だった。
    expect(badgeTextFor("設問1")).toBe("20/20");
    expect(badgeTextFor("設問2")).toBe("9/15");
    expect(badgeTextFor("設問3")).toBe("6/30");
  });

  it("配点未設定の設問は 100 点満点表示のまま（後方互換）", () => {
    render(<AfternoonResultView question={makeQuestion()} result={makeResult()} />);
    expect(badgeTextFor("設問4")).toBe("80/100");
  });

  it("満点は緑・部分点は黄・低得点は赤（配点によらず割合で判定）", () => {
    render(<AfternoonResultView question={makeQuestion()} result={makeResult()} />);

    // 20点満点の設問で満点。修正前は素点 20 < 40 で danger(赤) の危険表示だった。
    expect(badgeClassFor("設問1")).toContain(SUCCESS);
    expect(badgeClassFor("設問1")).not.toContain(DANGER);

    // 9/15 = 60% → 黄。修正前は素点 9 で赤。
    expect(badgeClassFor("設問2")).toContain(WARN);

    // 6/30 = 20% → 赤（正しく危険表示すべきケース）
    expect(badgeClassFor("設問3")).toContain(DANGER);

    // 配点なし 80/100 = 80% → 緑
    expect(badgeClassFor("設問4")).toContain(SUCCESS);
  });

  it("総合スコアは 100 点満点のまま緑で表示される", () => {
    render(<AfternoonResultView question={makeQuestion()} result={makeResult()} />);
    const total = screen.getByText(/総合/);
    expect((total.textContent ?? "").replace(/\s+/g, "")).toBe("総合95/100");
    expect(total.className).toContain(SUCCESS);
  });
});
