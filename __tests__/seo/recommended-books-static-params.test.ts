import { describe, expect, it } from "vitest";

import { generateStaticParams } from "@/app/recommended-books/[exam]/page";
import { ALL_EXAM_CODES } from "@/lib/exam-config";

/**
 * /recommended-books 索引ページは EXAM_ORDER（全 13 区分のハードコード配列）を
 * 無条件に /recommended-books/{exam} へリンクする。一方 /recommended-books/[exam]
 * は dynamicParams=false かつ generateStaticParams() が独自のハードコード配列
 * EXAM_CODES を返す。索引と詳細で **別々に管理された 2 本のハードコード配列** が
 * 食い違うと、索引のリンク先が静的生成セットから漏れて 404（死リンク）になる。
 *
 * 単一情報源（ALL_EXAM_CODES = EXAM_CONFIGS のキー）を正として、詳細側の
 * generateStaticParams が全区分を過不足なく生成することを固定し、配列の片側だけが
 * 編集されたときに 404 を出す回帰を機械検出する。
 */
describe("/recommended-books/[exam] static params cover every exam the index links", () => {
  it("generateStaticParams generates a page for every canonical exam code", async () => {
    const params = await generateStaticParams();
    const generated = new Set(params.map((p) => p.exam));

    // 索引（EXAM_ORDER = 全 13 区分）がリンクする区分が静的生成から漏れていないこと。
    const missing = ALL_EXAM_CODES.filter((code) => !generated.has(code));
    expect(missing).toEqual([]);
  });

  it("generateStaticParams generates no codes outside the canonical universe", async () => {
    const params = await generateStaticParams();
    const canonical = new Set<string>(ALL_EXAM_CODES);
    const extraneous = params.map((p) => p.exam).filter((code) => !canonical.has(code));
    expect(extraneous).toEqual([]);
  });

  it("generateStaticParams returns no duplicate exam codes", async () => {
    const params = await generateStaticParams();
    const codes = params.map((p) => p.exam);
    expect(codes.length).toBe(new Set(codes).size);
  });
});
