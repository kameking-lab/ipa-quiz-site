import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { QuestionBody } from "@/components/quiz/QuestionBody";

afterEach(cleanup);

// 問題本文のパイプテーブルは列見出しのみを持つ単一ヘッダ行テーブル。
// 列見出しの <th> は scope="col" を持たないと、SR がデータセルと列見出しの
// 関連付けを判定できない(WCAG 1.3.1 / H63)。/q は indexable な中核学習
// コンテンツであり、IPA 問題には密なデータ表が含まれるため scope が効く。
const PIPE_TABLE_TEXT = `次の表を参照せよ。
プロトコル | ポート | 用途
--- | --- | ---
HTTP | 80 | Web
SSH | 22 | 遠隔操作`;

describe("QuestionBody — パイプテーブルの列見出し scope", () => {
  it("列見出しの <th> が scope=\"col\" を持つ", () => {
    render(<QuestionBody text={PIPE_TABLE_TEXT} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(3);
    for (const th of headers) {
      expect(th.getAttribute("scope")).toBe("col");
    }
  });
});
