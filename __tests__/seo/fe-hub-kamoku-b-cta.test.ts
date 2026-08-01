import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";
import { getQuestionsByExamStrict, groupByCategory } from "@/lib/seo/exam-meta";

// /fe ハブ（app/[exam]/page.tsx・FE 最高オーソリティの indexable 面）に置いた
// 土台＝科目B（アルゴリズム・擬似言語）対策セクションは 2 つの内部リンクを持つ:
//   1. 土台ピラー /blog/fe-kamoku-b-taisaku
//   2. アルゴリズム分野別プール /fe/topic/アルゴリズムとプログラミング
// どちらもハードコードのため、対象が消える/改名されると新規 404 になる。
// 両リンク先の実在を「崩れたら落ちる」形で pin する。
const PILLAR_SLUG = "fe-kamoku-b-taisaku";
const ALGO_CATEGORY = "アルゴリズムとプログラミング";

describe("/fe ハブ 科目B CTA のリンク先実在", () => {
  it("土台ピラー blog slug が実在する", () => {
    expect(getBlogPostBySlug(PILLAR_SLUG)?.slug).toBe(PILLAR_SLUG);
  });

  it("アルゴリズム分野別プール /fe/topic/<category> が生成済みトピックに解決する", () => {
    const feCategories = groupByCategory(getQuestionsByExamStrict("fe")).map(
      (c) => c.category,
    );
    expect(feCategories).toContain(ALGO_CATEGORY);
  });
});
