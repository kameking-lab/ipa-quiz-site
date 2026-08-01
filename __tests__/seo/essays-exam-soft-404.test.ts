import { describe, expect, it } from "vitest";

import * as essaysExamPage from "@/app/essays/[exam]/page";
import { ESSAY_EXAM_CODES } from "@/lib/essays/load";

/**
 * /essays/[exam] は generateStaticParams で論述全区分を列挙する有限集合ページ。
 * dynamicParams=false が無いと無効な /essays/{exam} が handler の notFound() を
 * `next start` 上で HTTP200 のソフト404として返し、クロール予算を浪費する
 * （深い [qnum] ルートは既に dynamicParams=false・/essay deep と同型・セッション35）。
 *
 * dynamicParams=false を外す回帰、および generateStaticParams が静的セットを
 * 狭める回帰を機械検出する。
 */
describe("/essays/[exam] soft-404 guard (dynamicParams=false)", () => {
  it("exports dynamicParams=false so invalid exams 404 at the router", () => {
    expect(essaysExamPage.dynamicParams).toBe(false);
  });

  it("generateStaticParams covers every essay exam code (no valid page turns 404)", async () => {
    const params = await essaysExamPage.generateStaticParams();
    const generated = new Set(params.map((p) => p.exam));
    expect(generated).toEqual(new Set(ESSAY_EXAM_CODES));
    expect(generated.size).toBeGreaterThan(0);
  });
});
