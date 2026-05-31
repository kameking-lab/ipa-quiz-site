import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// WCAG 2.5.3 Label in Name (Level A): 音声操作ユーザーは可視ラベルを発話して
// コントロールを起動する。ブログ記事末尾の「この試験を演習する（N問）→」CTA の
// aria-label が、可視テキストの中核「この試験を演習する」を含まなければ
// 発話しても起動できない。過去に aria-label="{exam}を無料で演習する（N問）" で
// 可視テキストを欠いていた回帰を防ぐ（source-read ガード）。
describe("ブログ CTA — Label in Name (WCAG 2.5.3)", () => {
  const source = readFileSync(
    join(process.cwd(), "app/blog/[slug]/page.tsx"),
    "utf8",
  );

  it("ランダム出題 CTA の aria-label が可視テキスト「この試験を演習する」を含む", () => {
    // 可視テキストが存在すること
    expect(source).toContain("この試験を演習する（");
    // 当該 CTA の aria-label が可視テキストの中核で始まること
    expect(source).toMatch(/aria-label=\{`この試験を演習する（/);
    // 旧・可視テキストを欠いた aria-label が残っていないこと
    expect(source).not.toMatch(/aria-label=\{`\$\{examLabel\(post\.exam\)\} を無料で演習する/);
  });
});
