import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";

import { HomeExamGrid } from "@/components/home/HomeExamGrid";

// WCAG 2.5.3 Label in Name (Level A): 音声操作ユーザーは「可視ラベルの文字列」を
// 発話してコントロールを起動する。aria-label が可視テキストを含まないと、
// 発話してもマッチせず起動できない。ホームの試験カードのランダム出題 CTA
// （beginner=「今すぐ解く」/ それ以外=「ランダムに解く」）の aria-label が
// 可視テキストを含むことを保証する（過去に aria-label="{exam}をランダム出題で開始"
// で可視テキストを欠いていた回帰を防ぐ）。
afterEach(() => cleanup());

describe("HomeExamGrid — ランダム出題 CTA の Label in Name (WCAG 2.5.3)", () => {
  it("各ランダム出題 CTA の aria-label が可視テキストを含む", () => {
    const { container } = render(
      // ip=beginner, ap=advanced の2種を含めて両ブランチを描画
      <HomeExamGrid questionCounts={{ ip: 100, ap: 200 } as Record<string, number>} />,
    );

    const ctaLinks = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href^="/quiz?mode=random"]'),
    );
    expect(ctaLinks.length).toBeGreaterThanOrEqual(2);

    for (const link of ctaLinks) {
      const ariaLabel = link.getAttribute("aria-label") ?? "";
      // 可視テキストから装飾(矢印・空白)を除去した中核文字列
      const visible = (link.textContent ?? "").replace(/[\s→]/g, "");
      expect(visible.length).toBeGreaterThan(0);
      expect(ariaLabel).toContain(visible);
    }
  });
});
