import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// データテーブルの列見出し <th> は scope="col" を持たないと、SR がデータ
// セルと列見出しの関連付けを確実に判定できない(WCAG 1.3.1 / H63)。
// 既に /why-kakomon-ai・/recommended-books・Markdown 表は scope 付与済みだが、
// 公開ページの /stats(人気検索ワード)と /demo/essay-grading(採点ルーブリック)
// の列見出しは scope 欠落のまま残っていた(S28 スイープの取りこぼし)。
// 同型の回帰(裸の <th> に戻る)を防ぐ。
describe("公開データテーブル — 列見出しの scope=\"col\"", () => {
  it("/stats の人気検索ワード表が列見出し scope=\"col\" を 3 つ持つ", () => {
    const source = readFileSync(
      join(process.cwd(), "app/stats/page.tsx"),
      "utf8",
    );
    const colHeaders = source.match(/<th scope="col"/g) ?? [];
    // # / 検索キーワード / 表示回数（30日） の 3 列
    expect(colHeaders.length).toBe(3);
  });

  it("/demo/essay-grading の採点ルーブリック表が列見出し scope=\"col\" を 3 つ持つ", () => {
    const source = readFileSync(
      join(process.cwd(), "app/demo/essay-grading/page.tsx"),
      "utf8",
    );
    const colHeaders = source.match(/<th scope="col"/g) ?? [];
    // 観点 / 採点基準 / 配点 の 3 列
    expect(colHeaders.length).toBe(3);
  });
});
