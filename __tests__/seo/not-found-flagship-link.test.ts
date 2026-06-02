import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// 404 ページはデッドリンク/ソフト404解消で正しく 404 を返す URL の受け皿
// （高インテントの復帰面）。旗艦＝午後論述の AI 採点 /essay への復帰導線を
// 必ず残す（header/home/footer/quiz-complete と同じ /essay ハブへ寄せる）。
// この導線が消える回帰を検出する。
describe("404 page surfaces the flagship /essay recovery link", () => {
  const source = readFileSync(
    join(process.cwd(), "app/not-found.tsx"),
    "utf8",
  );

  it('links to the indexable flagship hub /essay (not the noindex /essays)', () => {
    expect(source).toContain('href="/essay"');
  });

  it("labels the link as 午後論述の AI 採点 recovery affordance", () => {
    expect(source).toContain("午後論述のAI採点");
  });
});
