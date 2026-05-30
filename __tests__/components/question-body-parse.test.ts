import { describe, expect, it } from "vitest";

import { parseQuestionBlocks } from "@/components/quiz/QuestionBody";

/**
 * Characterization tests for parseQuestionBlocks — 問題本文 (12,000+ 問) を
 * 段落 <p> とインラインのパイプテーブル <table> に分解する純粋パーサ。
 * QuestionBody が描画に使う唯一のロジックだが未テストだった。
 *
 * 崩れたら落ちる契約として現挙動を回帰固定する（source 無変更）。
 * テーブル判定の境界（区切り行の正規表現・最低 1 データ行・セルのパイプ
 * トリム）が崩れると、PDF 由来のパイプ表が平文段落に化けたり、逆に
 * 通常段落が誤ってテーブル化する描画事故になる。
 */

describe("parseQuestionBlocks — 段落分解", () => {
  it("非空行ごとに 1 つの p ブロックを作る", () => {
    expect(parseQuestionBlocks("一行目\n二行目")).toEqual([
      { kind: "p", text: "一行目" },
      { kind: "p", text: "二行目" },
    ]);
  });

  it("空行（空白のみ含む）はブロック化せずスキップする", () => {
    expect(parseQuestionBlocks("A\n\n   \nB")).toEqual([
      { kind: "p", text: "A" },
      { kind: "p", text: "B" },
    ]);
  });

  it("空文字列は空配列", () => {
    expect(parseQuestionBlocks("")).toEqual([]);
  });
});

describe("parseQuestionBlocks — パイプテーブル変換", () => {
  it("ヘッダ + 区切り(---|---) + データ行 を 1 つの table ブロックにする", () => {
    const text = ["項目 | 値", "---|---", "A | 1", "B | 2"].join("\n");
    expect(parseQuestionBlocks(text)).toEqual([
      {
        kind: "table",
        header: ["項目", "値"],
        rows: [
          ["A", "1"],
          ["B", "2"],
        ],
      },
    ]);
  });

  it("ヘッダ/データ行の前後パイプ ( | a | b | ) は除去し各セルをトリムする", () => {
    const text = ["| 項目 | 値 |", "---|---", "|  A  |  1  |"].join("\n");
    expect(parseQuestionBlocks(text)).toEqual([
      { kind: "table", header: ["項目", "値"], rows: [["A", "1"]] },
    ]);
  });

  it("アラインメント用コロン付き区切り(:--|--:)もテーブルとして認識する", () => {
    const text = ["左 | 右", ":--|--:", "a | b"].join("\n");
    const blocks = parseQuestionBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].kind).toBe("table");
  });

  it("データ行が 0 件（ヘッダ+区切りのみ）はテーブル化せず段落に落とす", () => {
    const text = ["項目 | 値", "---|---"].join("\n");
    expect(parseQuestionBlocks(text)).toEqual([
      { kind: "p", text: "項目 | 値" },
      { kind: "p", text: "---|---" },
    ]);
  });

  it("区切り行が無いパイプ行は通常段落のまま（誤テーブル化しない）", () => {
    const text = ["A | B | C", "次の段落"].join("\n");
    expect(parseQuestionBlocks(text)).toEqual([
      { kind: "p", text: "A | B | C" },
      { kind: "p", text: "次の段落" },
    ]);
  });

  it("前後パイプ付き区切り(|---|---|)は区切りと認識されない（現挙動の限界を固定）", () => {
    // TABLE_SEPARATOR_RE は先頭/末尾パイプを許容しないため、この区切りでは
    // テーブル化されず全行が段落になる。緩めるなら意図的変更（このテストが警告）。
    const text = ["項目 | 値", "|---|---|", "A | 1"].join("\n");
    const blocks = parseQuestionBlocks(text);
    expect(blocks.every((b) => b.kind === "p")).toBe(true);
  });

  it("テーブルは空行で終了し、後続の段落と共存できる", () => {
    const text = ["前書き", "項目 | 値", "---|---", "A | 1", "", "後書き"].join("\n");
    const blocks = parseQuestionBlocks(text);
    expect(blocks).toEqual([
      { kind: "p", text: "前書き" },
      { kind: "table", header: ["項目", "値"], rows: [["A", "1"]] },
      { kind: "p", text: "後書き" },
    ]);
  });
});
