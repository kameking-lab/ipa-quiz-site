import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// /recommended-books/[exam] の「書籍の使い分け」表は
// 「書籍(行) × 属性(列: タイトル/難度/おすすめ)」の 2 軸テーブル。
// 列見出しは scope="col"、各行の書籍タイトルは行を識別するエンティティ
// なので <th scope="row"> であるべき(WCAG 1.3.1 / H63)。
// 過去にタイトルが裸の <td>{book.title} だった回帰を防ぐ。
describe("/recommended-books 書籍表 — テーブル見出しの scope", () => {
  const source = readFileSync(
    join(process.cwd(), "app/recommended-books/[exam]/page.tsx"),
    "utf8",
  );

  it("列見出しの <th> が scope=\"col\" を持つ(タイトル/難度/おすすめ)", () => {
    const colHeaders = source.match(/<th scope="col"/g) ?? [];
    expect(colHeaders.length).toBe(3);
  });

  it("書籍タイトルが <th scope=\"row\"> である(裸の <td> に戻らない)", () => {
    expect(source).toContain('<th scope="row"');
    expect(source).not.toMatch(/<td[^>]*>\{book\.title\}<\/td>/);
  });
});
