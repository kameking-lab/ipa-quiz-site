import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// /q の「解説を読む」リンク(QuestionAnswerCard の href="#explanation")が跳躍する
// 解説セクションの scroll-margin が 1rem(16px)では、SiteHeader(sticky top-0・h-14=56px)の
// 下に「解説」見出しが隠れて着地していた。codebase 既定の scroll-mt-20(80px)へ是正した
// 回帰を防ぐ（source-read ガード）。
describe("/q 解説アンカー — sticky header(56px) 下に隠れない", () => {
  const source = readFileSync(
    join(
      process.cwd(),
      "app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx",
    ),
    "utf8",
  );

  it('id="explanation" セクションが scroll-mt-20 を持つ', () => {
    expect(source).toMatch(/id="explanation"[^>]*className="[^"]*scroll-mt-20[^"]*"/);
  });

  it("ヘッダー(56px)未満の不十分な scrollMarginTop:1rem が残っていない", () => {
    expect(source).not.toContain('scrollMarginTop: "1rem"');
  });
});
