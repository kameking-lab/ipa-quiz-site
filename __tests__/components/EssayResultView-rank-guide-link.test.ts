import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { getBlogPostBySlug } from "@/data/blog";

// 採点結果(評価ランク A/B/C/D)を見た直後は「このランクは何を意味するのか」を最も
// 知りたい瞬間（最高 intent 一致）。EssayResultView から評価ランク解説記事
// koudo-ronbun-hyouka-rank への hub→spoke 文脈リンクを配線した回帰を守る。
// EssayResultView は client component かつ採点 API 後にのみ描画されるため、
// source-read ガード（essay-result-scroll-margin.test.ts と同方式）で固定する。
describe("EssayResultView — 評価ランク解説記事への hub→spoke リンク", () => {
  const source = readFileSync(
    join(process.cwd(), "components/essay/EssayResultView.tsx"),
    "utf8",
  );

  it("評価ランク解説記事 koudo-ronbun-hyouka-rank へリンクしている", () => {
    expect(source).toContain('href="/blog/koudo-ronbun-hyouka-rank"');
    expect(source).toContain("評価ランク A/B/C/D");
  });

  it("リンク先の記事が実在する（死リンクでない）", () => {
    const post = getBlogPostBySlug("koudo-ronbun-hyouka-rank");
    expect(post, "koudo-ronbun-hyouka-rank が存在しない").toBeDefined();
    // 評価ランク記事は論述5区分のスコープ＝採点結果ビューの文脈と一致
    expect(post!.tags).toContain("評価ランク");
  });
});
