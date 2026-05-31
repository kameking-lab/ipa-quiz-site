import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// データテーブルの <th> は scope を持たないと、SR がデータセルと見出しの
// 関連付け(列見出し/行見出し)を確実に判定できない(WCAG 1.3.1 / H63)。
// /why-kakomon-ai の比較表は「観点(行見出し) × サービス(列見出し)」の
// 2 軸テーブルなので、列見出しは scope="col"、各行の観点ラベルは
// <th scope="row"> でなければならない。過去に行ラベルが <td>(見出し
// セマンティクス皆無)だった回帰を防ぐ。
describe("/why-kakomon-ai 比較表 — テーブル見出しの scope", () => {
  const source = readFileSync(
    join(process.cwd(), "app/why-kakomon-ai/page.tsx"),
    "utf8",
  );

  it("列見出しの <th> が scope=\"col\" を持つ", () => {
    const colHeaders = source.match(/<th scope="col"/g) ?? [];
    // 観点 / 過去問AI / 過去問道場系 / 予備校・通信講座 の 4 列
    expect(colHeaders.length).toBe(4);
  });

  it("各行の観点ラベルが <th scope=\"row\"> である(行見出しセマンティクス)", () => {
    expect(source).toContain('<th scope="row"');
    // 行ラベルが裸の <td>{row.label} に戻っていないこと
    expect(source).not.toMatch(/<td[^>]*>\{row\.label\}<\/td>/);
  });
});
