import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// EssayEditor は採点完了後に #essay-result へ scrollIntoView({block:"start"}) で
// スクロールするが、scroll-margin が無いと SiteHeader(sticky top-0・h-14=56px)の
// 下に採点結果の先頭が隠れて着地する。scrollIntoView も CSS の scroll-margin-top を
// 尊重するため、codebase 既定の scroll-mt-20 を付与した回帰を防ぐ（source-read ガード）。
describe("論文採点結果 scrollIntoView — sticky header(56px) 下に隠れない", () => {
  const source = readFileSync(
    join(process.cwd(), "components/essay/EssayEditor.tsx"),
    "utf8",
  );

  it('採点後に scrollIntoView する #essay-result が scroll-mt-20 を持つ', () => {
    // block:"start" でスクロールしていること（前提）
    expect(source).toContain('block: "start"');
    // そのスクロール先 #essay-result が scroll-mt-20 を持つこと
    expect(source).toMatch(/id="essay-result"[^>]*className="[^"]*scroll-mt-20[^"]*"/);
  });
});
