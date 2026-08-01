import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ESSAY_EXAM_CODES } from "@/lib/essay/load";

// 論文区分（st/sa/pm/sm/au）の試験ハブ app/[exam]/page.tsx は、午後 II 論述対策
// セクションの primary CTA を「実際の IPA 午後II 過去問を AI 採点する indexable
// ハブ /essay（旗艦）」へ寄せる。高オーソリティな試験ハブ（sitemap priority 0.9）
// から旗艦へ内部リンク equity を流すための配線。
// /[exam]/afternoon は練習用モック（AI採点ベータ・HD-4）なので primary にしない。
// このリンク・誇大回避ラベルが消える/退行する回帰を「崩れたら落ちる」形で pin する。
describe("exam hub funnels the 論文 essay CTA to the indexable flagship /essay", () => {
  const source = readFileSync(
    join(process.cwd(), "app/[exam]/page.tsx"),
    "utf8",
  );

  it("links the primary essay CTA to the indexable flagship hub /essay", () => {
    expect(source).toContain('<Link href="/essay">');
  });

  it("keeps the beta mock afternoon page as a clearly-labeled secondary link", () => {
    // 旗艦の実過去問採点と練習用モックを誇大なく区別するラベル（HD-4 尊重）。
    expect(source).toContain("練習問題で腕試し（ベータ）");
    expect(source).toContain("`/${code}/afternoon`");
  });

  it("the 論文 exams that receive this CTA are all covered by the /essay flagship", () => {
    // CTA を出す論文区分と /essay 旗艦の対応区分が一致していること（空導線回避）。
    for (const exam of ["st", "sa", "pm", "sm", "au"] as const) {
      expect(ESSAY_EXAM_CODES).toContain(exam);
    }
  });
});
