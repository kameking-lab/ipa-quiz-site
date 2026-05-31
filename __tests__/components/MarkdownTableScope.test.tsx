import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { Markdown } from "@/components/ui/markdown";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";

afterEach(cleanup);

// GFM (remark-gfm) のテーブルは列見出しのみを持つ。レンダラ層で
// 列見出しの <th> に scope="col" を付与しないと、SR がデータセルと
// 列見出しの関連付けを判定できない(WCAG 1.3.1 / H63)。
// AI 解説(Markdown)・ブログ記事(BlogMarkdown)の本文テーブルに適用される。
const TABLE_MD = `| プロトコル | ポート |
| --- | --- |
| HTTP | 80 |
| SSH | 22 |`;

describe("Markdown 系レンダラ — テーブル列見出しの scope", () => {
  it("Markdown の列見出し <th> が scope=\"col\" を持つ", () => {
    render(<Markdown>{TABLE_MD}</Markdown>);
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(2);
    for (const th of headers) expect(th.getAttribute("scope")).toBe("col");
  });

  it("BlogMarkdown の列見出し <th> が scope=\"col\" を持つ", () => {
    render(<BlogMarkdown>{TABLE_MD}</BlogMarkdown>);
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(2);
    for (const th of headers) expect(th.getAttribute("scope")).toBe("col");
  });
});
