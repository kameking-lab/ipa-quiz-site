import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// WCAG 2.5.3 Label in Name (Level A): 全ページ共通フッターの SNS リンクは
// 可視テキスト（"X @kakomon_ai_jp" / "note"）を発話して起動できる必要がある。
// aria-label が可視ラベルを含まないと音声操作ユーザーが起動できない。
// 過去に X リンクが aria-label="X（Twitter）でフォロー..." で可視ハンドルを
// 欠いていた回帰を防ぐ（source-read ガード）。
describe("フッター SNS リンク — Label in Name (WCAG 2.5.3)", () => {
  const source = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");

  it("X リンクの aria-label が可視テキスト「X @kakomon_ai_jp」を含む", () => {
    // 可視テキスト（JSX テキストノード）が存在すること
    expect(source).toContain("X @kakomon_ai_jp");
    // aria-label が可視テキストを先頭に含むこと
    expect(source).toMatch(/aria-label="X @kakomon_ai_jp/);
    // 旧・可視テキストを欠いた aria-label が残っていないこと
    expect(source).not.toContain('aria-label="X（Twitter）でフォロー');
  });

  it("note リンクの aria-label が可視テキスト「note」を含む", () => {
    expect(source).toMatch(/aria-label="note /);
  });
});
