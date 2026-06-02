import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";
import { ESSAY_EXAM_CODES } from "@/lib/essay/load";

// 業種別論文記事（gyoushu-essay-*）は旗艦=午後II論述AI採点の最も近縁なコンテンツ
// （業種別の論文 ＝ /essay の「業種事例」採点軸そのもの）。だが本文は「AI 添削」を
// 価値として言及しながら、リンク先は業種別事例集 /features/industry-essays と
// 試験ハブ /<exam> のみで、indexable な旗艦 /essay へ直リンクが無かった
//（=「AI 添削に言及するのにそのリンクが無い」コンテンツギャップ）。各記事に
// 旗艦 /essay への直リンクを追加した。この funnel を pin する。「崩れたら落ちる」。

// これらは横断(general)記事（exam フィールドを持たない）だが、題材は論文区分
// （ST/PM/SA）。tag と、対象区分が旗艦 /essay の採点対象5区分であることで
// 「論文区分の業種別論文記事」であることを担保する。
const ARTICLES: { slug: string; exam: string }[] = [
  { slug: "gyoushu-essay-kinyuu-strategy", exam: "st" },
  { slug: "gyoushu-essay-seizou-pm", exam: "pm" },
  { slug: "gyoushu-essay-koukyou-sa", exam: "sa" },
];

describe("業種別論文記事 → 旗艦 /essay 直 funnel", () => {
  for (const { slug, exam } of ARTICLES) {
    it(`${slug} が存在し論文(${exam})の業種別記事である`, () => {
      const post = getBlogPostBySlug(slug);
      expect(post, `${slug} が存在しない`).toBeDefined();
      expect(post!.tags).toContain("論文");
      expect(post!.tags).toContain("業種別");
      // 誇大回避の根拠: 旗艦 /essay が採点対象とする論文5区分に含まれること
      expect(ESSAY_EXAM_CODES).toContain(exam);
    });

    it(`${slug} 本文が indexable 旗艦 /essay へ直リンクし「参考評価」を明記`, () => {
      const body = getBlogPostBySlug(slug)!.body;
      // 旗艦ハブ /essay への直リンク（noindex の /essays 複数形ではない）
      expect(body).toContain("](/essay)");
      // 誇大回避: AI 採点は参考評価であることを明記
      expect(body).toContain("参考評価");
      // /essay の採点4軸コピーと整合
      expect(body).toContain("適合度・論理性・具体性・業種事例");
    });
  }
});
