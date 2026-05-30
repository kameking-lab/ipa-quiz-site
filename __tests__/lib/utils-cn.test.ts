import { describe, it, expect } from "vitest";

import { cn } from "@/lib/utils";

/**
 * cn() は CLAUDE.md §7 が全コンポーネントに利用を義務付ける唯一のクラス名結合
 * プリミティブ（twMerge(clsx(...)) の薄いラッパ）。これまで直接のユニットテストが
 * 無く、誤って素の clsx へ差し替える（= Tailwind の衝突解決を失う）・条件付き/
 * オブジェクト記法のサポートを落とす、といった退行を検知できなかった。
 *
 * 二層の契約を pin する:
 *  - twMerge 層: 後勝ちの Tailwind 衝突解決（clsx 単体なら両クラスが残り崩れる）
 *  - clsx 層  : 条件付き・配列・オブジェクト記法と falsy の除外
 */
describe("cn", () => {
  it("Tailwind の衝突は後勝ちで解決する（twMerge 層）", () => {
    // 素の clsx なら "p-2 p-4" が残る。twMerge を通すことで後者のみ。
    expect(cn("p-2", "p-4")).toBe("p-4");
    // 単一文字列内の衝突も解決する。
    expect(cn("text-sm text-lg")).toBe("text-lg");
  });

  it("衝突しないクラスは順序を保って全て残る", () => {
    expect(cn("font-bold", "text-red-500")).toBe("font-bold text-red-500");
  });

  it("falsy（false/null/undefined/空文字）は除外する（clsx 層）", () => {
    expect(cn("a", false && "skip", null, undefined, "", "b")).toBe("a b");
  });

  it("オブジェクト記法は真の鍵だけを採用する（clsx 層）", () => {
    expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe(
      "text-red-500",
    );
  });

  it("配列・ネストした入力を平坦化して結合する（clsx 層）", () => {
    expect(cn(["a", "b"], ["c"])).toBe("a b c");
  });

  it("条件付きとオブジェクトと衝突解決を同時に扱う", () => {
    // 条件付きで後から p-8 を足すと、先の p-2 を上書きする。
    expect(cn("p-2 font-bold", { "p-8": true, hidden: false })).toBe(
      "font-bold p-8",
    );
  });

  it("引数なし・全て falsy は空文字を返す", () => {
    expect(cn()).toBe("");
    expect(cn(false, null, undefined, "")).toBe("");
  });
});
