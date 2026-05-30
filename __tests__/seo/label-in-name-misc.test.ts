import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// WCAG 2.5.3 Label in Name (Level A): 可視テキストを発話して起動する音声操作
// ユーザーのため、interactive control の aria-label は可視ラベルを含む必要がある。
// 過去に可視テキストを欠いていた2箇所の回帰を防ぐ（source-read ガード）。
describe("Label in Name (WCAG 2.5.3) — bookmarks / mock-exam", () => {
  it("ブックマークの「この問題を解く」リンクの aria-label が可視テキストを含む", () => {
    const source = readFileSync(
      join(process.cwd(), "app/bookmarks/page.tsx"),
      "utf8",
    );
    // 可視テキスト
    expect(source).toContain("この問題を解く");
    // aria-label が可視テキストを先頭に含む
    expect(source).toMatch(/aria-label=\{`この問題を解く（/);
  });

  it("模試結果の「苦手分野を集中練習」リンクの aria-label が可視テキストを含む", () => {
    const source = readFileSync(
      join(process.cwd(), "app/mock-exam/MockExamRunner.tsx"),
      "utf8",
    );
    // 可視テキスト「苦手分野を集中練習」が aria-label に連続部分文字列として含まれること
    expect(source).toContain("苦手分野を集中練習 →");
    expect(source).toContain('aria-label="苦手分野を集中練習する"');
    // 旧・可視テキストを連続して含まない aria-label が残っていないこと
    expect(source).not.toContain('aria-label="苦手分野の問題を集中練習する"');
  });

  it("模試結果のシェアリンクの aria-label が可視テキスト「結果をシェア」を含む", () => {
    const source = readFileSync(
      join(process.cwd(), "app/mock-exam/MockExamRunner.tsx"),
      "utf8",
    );
    expect(source).toContain("結果をシェア");
    // aria-label が可視テキストを連続部分文字列として含む（"Xで" の割り込みを排除）
    expect(source).toMatch(/aria-label="結果をシェア（/);
    expect(source).not.toContain('aria-label="結果をXでシェア"');
  });

  it("クイズ結果の X シェアリンクの aria-label が可視テキスト「X でシェア」を含む", () => {
    const source = readFileSync(
      join(process.cwd(), "components/quiz/QuizPlayer.tsx"),
      "utf8",
    );
    expect(source).toContain("X でシェア");
    // aria-label が可視テキスト「X でシェア」を連続部分文字列として含む
    expect(source).toContain('aria-label="X でシェア（');
    // 旧・"（Twitter）で結果を" が割り込んだ aria-label が残っていないこと
    expect(source).not.toContain('aria-label="X（Twitter）で結果をシェア');
  });
});
