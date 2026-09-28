import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "@/data/blog";

function body(slug: string): string {
  const post = getBlogPostBySlug(slug);
  expect(post).toBeDefined();
  return post?.body ?? "";
}

describe("2026 IPA CBT application guidance", () => {
  it("shows the official upcoming AP and advanced application windows", () => {
    const text = body("ipa-shiken-moushikomi-nagare");
    expect(text).toContain("10月6日10時〜11月7日17時");
    expect(text).toContain("10月6日10時〜10月24日17時");
    expect(text).toContain("10月28日〜11月10日");
    expect(text).toContain("11月24日〜12月6日");
    expect(text).toContain("受験票は郵送されません");
    expect(text).not.toContain("10 月第 2 日曜");
    expect(text).not.toContain("## 申込手順（PBT 方式）");
  });

  it("distinguishes period CBT from year-round CBT", () => {
    const text = body("ipa-shiken-cbt-vs-pbt");
    expect(text).toContain("前期・後期の期間制");
    expect(text).toContain("科目Aが10月28日〜11月10日");
    expect(text).not.toContain("移行はまだ「予定」段階");
    expect(text).not.toContain("CBT は通年実施");
  });

  it("uses one application per period rather than the old same-day paper rationale", () => {
    const text = body("ipa-shiken-fukusuu-kubun-juken");
    expect(text).toContain("前期・後期の各試験で申込みは1回のみ");
    expect(text).toContain("NWは前期、DBは後期");
    expect(text).not.toContain("すべて同一日程・同一時間割");
    expect(text).not.toContain("PBT 方式（春期・秋期の年 2 回）");
  });

  it("uses the official one-photo-ID rule and no mailed ticket", () => {
    const text = body("ipa-moushikomi-mynumber");
    expect(text).toContain("https://cbt-s.com/page/itee_id");
    expect(text).toContain("顔写真付きの対象書類を1点");
    expect(text).toContain("受験票は郵送されません");
    expect(text).not.toContain("健康保険証 + 学生証 + 公共料金領収書");
    expect(text).not.toContain("PBT 試験：AP・高度試験");
  });
});
