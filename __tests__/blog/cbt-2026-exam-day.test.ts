import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

const body = (slug: string) => {
  const post = getBlogPostBySlug(slug);
  expect(post, `${slug} must exist`).toBeDefined();
  return post!.body;
};

describe("2026 CBT exam-day guidance", () => {
  it("separates IP confirmation slip from AP/advanced identity requirements", () => {
    const article = body("shiken-zenjitsu-checklist");
    expect(article).toContain("確認票");
    expect(article).toContain("受験番号・利用者ID・確認コード");
    expect(article).toContain("受験票は郵送されません");
    expect(article).toContain("本人確認書類の原本");
    expect(article).not.toContain("受験票・写真票（顔写真貼付済み）");
    expect(article).not.toContain("黒鉛筆 HB 数本");
  });

  it("uses separate A/B periods in the last-week plan", () => {
    const article = body("ipa-cyokusen-1shukan");
    expect(article).toContain("科目A群と科目B群を**別の実施期間**");
    expect(article).toContain("APなら科目A・Bはいずれも150分");
    expect(article).not.toContain("午前 → 昼休み → 午後 の流れを再現");
    expect(article).not.toContain("受験票・顔写真の貼付");
  });

  it("describes all regular 2026 IPA exams as in-person CBT", () => {
    const article = body("ipa-zaitaku-remote-juken");
    expect(article).toContain("AP・高度・SCも2026年度からCBT方式");
    expect(article).toContain("自宅のパソコンで受ける方式ではありません");
    expect(article).toContain("筆記による特別措置試験");
    expect(article).not.toContain("PBT 試験（AP・高度試験）");
  });

  it("distinguishes IP equipment from SG/FE and 2026 AP/advanced", () => {
    const article = body("cbt-shiken-toujitsu-nagare");
    expect(article).toContain("ITパスポートは「確認票」");
    expect(article).toContain("メモ用紙とシャープペンシル");
    expect(article).toContain("SG・FEでは会場のメモ用紙とボールペン");
    expect(article).toContain("2026年度の通常試験はAP・高度・SCもCBT");
    expect(article).not.toContain("本記事執筆時点では春期・秋期の PBT");
  });
});
