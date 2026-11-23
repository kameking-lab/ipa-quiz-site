import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";

afterEach(cleanup);

describe("site article notice versus quotations", () => {
  it.each([
    ["試験要項の最新情報は必ず", "https://www.ipa.go.jp/shiken/"],
    ["免除の正式な条件・申請手続き・最新情報は必ず", "https://www.ipa.go.jp/shiken/about/koudo_menjo.html"],
  ])("renders the concise %s notice upright without changing its official link", (condition, href) => {
    const source = `> ${condition} [IPA 公式ページ](${href}) で確認してください。`;
    const { container } = render(<BlogMarkdown>{source}</BlogMarkdown>);
    const notice = container.querySelector("blockquote");
    expect(notice).toHaveAttribute("data-article-notice", "true");
    expect(notice).toHaveClass("not-italic");
    expect(notice).not.toHaveClass("italic");
    expect(notice?.querySelector("a")).toHaveAttribute("href", href);
  });

  it("keeps ordinary quotations, unmatched guidance and emphasis distinct", () => {
    const source = "> 公式資料からの引用です。\n\n> 本記事は 過去問AI が独自にまとめた学習ガイドです。これは別の案内です。\n\n*強調表現*";
    const { container } = render(<BlogMarkdown>{source}</BlogMarkdown>);
    const quotations = container.querySelectorAll("blockquote");
    expect(quotations).toHaveLength(2);
    for (const quotation of quotations) {
      expect(quotation).not.toHaveAttribute("data-article-notice");
      expect(quotation).toHaveClass("italic");
      expect(quotation).not.toHaveClass("not-italic");
    }
    expect(container.querySelector("em")).toHaveClass("italic");
  });
});
