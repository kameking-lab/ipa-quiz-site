import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";
import { ESSAY_EXAM_CODES } from "@/lib/essay/load";

// 論述区分（ST/SA/PM/SM/AU）の二次記事（語彙集 / ネタ抽出などの薄い stub）は、
// 本文の「AI 添削」CTA が noindex の /essays/<exam>（単区分サンプル・robots
// index:false,follow:false）だけを指し、indexable な旗艦 /essay へのリンクを
// 欠いていた。一方、主記事（pm-goukaku-ronbun 等）と単一記事区分（SA/SM）は
// 旗艦 /essay へ直リンク済（FAQ 経由）。この非対称を解消し、3 本の二次記事に
// 旗艦 /essay 直リンク＋「参考評価」明記を additive に追加した。
// 既存 /essays/<exam> 深リンクは UX 価値ゆえ温存（HD-5 範囲には踏み込まない）。
// 「崩れたら落ちる」回帰 pin。

const ARTICLES: { slug: string; exam: string; deep: string }[] = [
  { slug: "pm-essay-shudai-pickup", exam: "pm", deep: "/essays/pm" },
  { slug: "st-strategy-perspective", exam: "st", deep: "/essays/st" },
  { slug: "au-audit-evidence-language", exam: "au", deep: "/essays/au" },
];

describe("論述区分の二次記事 → 旗艦 /essay 直 funnel（非対称解消）", () => {
  for (const { slug, exam, deep } of ARTICLES) {
    it(`${slug} が存在し論述(${exam})記事である`, () => {
      const post = getBlogPostBySlug(slug);
      expect(post, `${slug} が存在しない`).toBeDefined();
      expect(post!.tags).toContain("論述");
      expect(post!.tags).toContain(exam.toUpperCase());
      // 誇大回避の根拠: 旗艦 /essay が採点対象とする論文5区分に含まれること
      expect(ESSAY_EXAM_CODES).toContain(exam);
    });

    it(`${slug} 本文が indexable 旗艦 /essay へ直リンクし「参考評価」を明記`, () => {
      const body = getBlogPostBySlug(slug)!.body;
      // 旗艦ハブ /essay への直リンク（noindex の /essays 複数形ではない）
      expect(body).toContain("](/essay)");
      // 誇大回避: AI 採点は参考評価であること・採点基準は IPA 非公開であることを明記
      expect(body).toContain("参考評価");
      expect(body).toContain("IPA 非公開");
      // 既存の単区分サンプル深リンクを温存（additive・HD-5 範囲外）
      expect(body).toContain(`](${deep})`);
    });
  }
});
