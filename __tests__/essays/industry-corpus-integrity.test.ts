import { describe, expect, it } from "vitest";

import {
  ESSAY_EXAM_CODES,
  ESSAY_INDUSTRY_LABELS,
  getEssayQuestionsByExam,
} from "@/lib/essays/load";

/**
 * 業種別合格答案コーパス（全6区分）の業種データ整合性 invariant。
 *
 * `getEssayQuestionsByExam` は sc は専用データから、st/sa/pm/sm/au は
 * `data/questions/afternoon/{exam}/*-industries.ts` の IndustryVariant を
 * `industryVariantToEssayAnswer`(lib/essays/load.ts:36)経由で供給する。
 * このアダプタは `v.industryId as EssayIndustryId`(:38)と**型チェックを迂回する
 * キャスト**を行う。IndustryId(lib/afternoon/types.ts)と EssayIndustryId
 * (lib/essays/types.ts)は現状メンバーが一致する平行 union だが、片方だけに
 * コードを追加すると静かにズレ、無効な industryId が流れて
 * `ESSAY_INDUSTRY_LABELS[id]` が undefined を返す。
 *
 * 以下は型では保証できず、いずれも user-visible:
 *  - industryId が ESSAY_INDUSTRY_LABELS のキーであること
 *    → EssayIndustryTabs のタブ文言(`ESSAY_INDUSTRY_LABELS[id]`, :62)が
 *      undefined にならない
 *  - industryName が非空であること
 *    → 4箇所で直接描画(essays/[exam]/page.tsx:126・EssayIndustryTabs:83
 *      「{industryName}の合格答案例」・AfternoonResultView:123,182)
 *  - 1問内で industryId が重複しないこと
 *    → getIndustryEssay は `.find(e=>e.industryId===id)`(:113)で引くため
 *      重複した2件目は到達不能な dead エントリになる(achievements の id 引きと同型)
 */
describe("essay industry corpus integrity (all exam codes)", () => {
  const allAnswers = ESSAY_EXAM_CODES.flatMap((exam) =>
    getEssayQuestionsByExam(exam).flatMap((q) =>
      q.industries.map((ind) => ({ exam, qId: q.id, ind })),
    ),
  );

  it("observes a non-empty corpus (guards against vacuous passes)", () => {
    expect(allAnswers.length).toBeGreaterThan(0);
  });

  it("every industryId resolves to a defined ESSAY_INDUSTRY_LABELS entry", () => {
    for (const { exam, qId, ind } of allAnswers) {
      expect(
        ESSAY_INDUSTRY_LABELS[ind.industryId],
        `${exam}/${qId} industryId=${ind.industryId}`,
      ).toBeTruthy();
    }
  });

  it("every industryName is a non-empty (non-whitespace) string", () => {
    for (const { exam, qId, ind } of allAnswers) {
      expect(typeof ind.industryName, `${exam}/${qId}`).toBe("string");
      expect(
        ind.industryName.trim().length,
        `${exam}/${qId} industryId=${ind.industryId}`,
      ).toBeGreaterThan(0);
    }
  });

  it("has no duplicate industryId within a single question (find-by-id dedup)", () => {
    for (const exam of ESSAY_EXAM_CODES) {
      for (const q of getEssayQuestionsByExam(exam)) {
        const ids = q.industries.map((e) => e.industryId);
        expect(new Set(ids).size, `${exam}/${q.id}`).toBe(ids.length);
      }
    }
  });
});
