import { describe, expect, it } from "vitest";

import * as examPage from "@/app/success-stories/[exam]/page";
import * as slugPage from "@/app/success-stories/[exam]/[slug]/page";
import {
  getAllSuccessStorySlugs,
  getSuccessStoryExams,
} from "@/data/success-stories";

/**
 * /success-stories/[exam] と /success-stories/[exam]/[slug] は generateStaticParams で
 * 全データ（区分・(exam,slug)組）を列挙する有限集合ページ。dynamicParams=false が無いと
 * 無効URL（外部/古いリンク）が handler の notFound() を `next start` 上で HTTP200 の
 * ソフト404として返し、クロール予算を浪費する（/essay deep と同型・セッション34で実証）。
 *
 * dynamicParams=false を外す回帰、および generateStaticParams が静的セットを狭めて
 * 有効ページを誤って 404 化する回帰を機械検出する。
 */
describe("/success-stories soft-404 guard (dynamicParams=false)", () => {
  it("category page exports dynamicParams=false so invalid exams 404 at the router", () => {
    expect(examPage.dynamicParams).toBe(false);
  });

  it("article page exports dynamicParams=false so invalid slugs 404 at the router", () => {
    expect(slugPage.dynamicParams).toBe(false);
  });

  it("category generateStaticParams covers every exam that has stories (no valid page turns 404)", async () => {
    const params = await examPage.generateStaticParams();
    const generated = new Set(params.map((p) => p.exam));
    const expected = new Set(getSuccessStoryExams());
    expect(generated).toEqual(expected);
    // 非空（vacuous でないこと）。
    expect(generated.size).toBeGreaterThan(0);
  });

  it("article generateStaticParams covers every (exam, slug) story pair", async () => {
    const params = await slugPage.generateStaticParams();
    const generated = new Set(params.map((p) => `${p.exam}/${p.slug}`));
    const expected = new Set(
      getAllSuccessStorySlugs().map((s) => `${s.exam}/${s.slug}`),
    );
    expect(generated).toEqual(expected);
    expect(generated.size).toBeGreaterThan(0);
  });
});
