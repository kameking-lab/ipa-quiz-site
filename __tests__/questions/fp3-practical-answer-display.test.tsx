import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "@/app/fp3/practical/[edition]/[number]/page";

describe("FP3 practical answer display", () => {
  it("shows question 2's selected number separately from the truth of its statement and the site's explanation", async () => {
    const { container } = render(await Page({ params: Promise.resolve({ edition: "202605", number: "2" }) }));
    const official = container.querySelector('[aria-label="公式模範解答"]');
    const original = container.querySelector('[aria-label="当サイト独自の解説"]');
    expect(official).not.toBeNull();
    expect(official).toHaveTextContent("日本FP協会の公式模範解答");
    expect(official).toHaveTextContent("設問で選ぶ番号：3");
    expect(official).toHaveTextContent("選んだ記述そのものが正しいという意味ではありません");
    expect(original).toHaveTextContent("当サイト独自の解説");
    expect(original).toHaveTextContent("公式解答で選ぶ肢");
    expect(original).not.toHaveTextContent("3. 正解");
  });
});
