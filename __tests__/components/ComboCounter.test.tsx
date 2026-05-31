import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";

import { ComboCounter } from "@/components/motivation/ComboCounter";

afterEach(() => {
  cleanup();
  // @ts-expect-error テストごとに matchMedia stub を撤去
  delete window.matchMedia;
});

function stubMatchMedia(reduce: boolean) {
  window.matchMedia = ((q: string) => ({
    matches: reduce && q.includes("reduce"),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  })) as unknown as typeof window.matchMedia;
}

// framer-motion の spring 入場アニメは JS 駆動で CSS の prefers-reduced-motion
// 抑制では止まらない。reduce 指定時はバッジを即時表示し(情報は保持)、入場用の
// inline style(opacity:0 / transform scale)を付けないこと(WCAG 2.3.3)。
describe("ComboCounter — prefers-reduced-motion", () => {
  it("reduce 指定時はバッジを静的に表示し入場アニメの inline style を付けない", () => {
    stubMatchMedia(true);
    const { getByText } = render(<ComboCounter combo={5} />);
    // バッジ自体(コンボ数)は見える＝情報は保持される。
    const badge = getByText("5 連続！").closest("div");
    expect(badge).not.toBeNull();
    // framer の motion.div は initial で opacity:0/transform を inline style に
    // 載せる。静的 div はそれを持たない。
    expect(badge?.getAttribute("style")).toBeNull();
  });

  it("通常時(reduce 無し)は framer の入場アニメ用 inline style を持つ", () => {
    stubMatchMedia(false);
    const { getByText } = render(<ComboCounter combo={5} />);
    const badge = getByText("5 連続！").closest("div");
    expect(badge).not.toBeNull();
    expect(badge?.getAttribute("style")).not.toBeNull();
  });
});
