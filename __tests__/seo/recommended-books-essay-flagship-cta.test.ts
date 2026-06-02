import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ESSAY_EXAM_CODES } from "@/lib/essay/load";

// /recommended-books/[exam] の論述区分(ST/SA/PM/SM/AU)ページは論文事例集の読者＝
// 旗艦「午後AI採点」の対象。書籍購入後の自然な次の一歩として AI論述添削(/essay)へ
// 導く論述区分ゲート付き CTA を配線した。誇大回避＝論述5区分のみ・「参考評価」明記。
// server component の条件分岐ゆえ source-read ガードで gate と誇大表現を固定する。
describe("/recommended-books/[exam] — 論述区分の旗艦 /essay CTA", () => {
  const source = readFileSync(
    join(process.cwd(), "app/recommended-books/[exam]/page.tsx"),
    "utf8",
  );

  it("論述区分ゲート(ESSAY_EXAM_CODES)で /essay へ funnel する", () => {
    // 旗艦への funnel が存在する
    expect(source).toContain('href="/essay"');
    // 論述区分のみのゲートで囲まれている（全区分に出さない＝誇大回避）
    expect(source).toContain("ESSAY_EXAM_CODES");
    expect(source).toMatch(/isEssayExam[\s\S]*href="\/essay"/);
  });

  it("「参考評価」を明記し誇大回避している", () => {
    expect(source).toContain("参考評価");
  });

  it("ゲートの単一情報源が論述5区分(ST/SA/PM/SM/AU)である", () => {
    expect([...ESSAY_EXAM_CODES].sort()).toEqual(["au", "pm", "sa", "sm", "st"]);
  });

  it("FE のみ土台=科目B対策記事へ funnel する（旗艦と対称）", () => {
    // FE 限定ゲートで科目B中核ピラーへ
    expect(source).toContain('href="/blog/fe-kamoku-b-taisaku"');
    expect(source).toMatch(/code === "fe"[\s\S]*fe-kamoku-b-taisaku/);
    // 午前MC「アルゴリズム」分野ではなく科目B(擬似言語)である旨を明示（誇大回避）
    expect(source).toContain("擬似言語");
  });

  it("SG のみ土台=科目B事例問題記事へ funnel する（FE と対称・SG 限定ゲート）", () => {
    // SG 限定ゲートで科目B事例問題の解き方記事へ
    expect(source).toContain('href="/blog/sg-kamoku-b-jirei-mondai"');
    expect(source).toMatch(/code === "sg"[\s\S]*sg-kamoku-b-jirei-mondai/);
    // FE(擬似言語)ではなく長文の事例問題である旨を明示（誇大回避・区分混同防止）
    expect(source).toMatch(/code === "sg"[\s\S]*事例問題/);
  });
});
