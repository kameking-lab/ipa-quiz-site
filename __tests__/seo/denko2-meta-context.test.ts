import { describe, expect, it } from "vitest";
import { examMetaDescription, getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";
describe("denko2 metadata follows the published data", () => {
  it("describes the actual years, periods and count without downgrading the current coverage", () => {
    const pool = getQuestionsByExamStrict("denko2");
    const first = Math.min(...pool.map((q) => q.year));
    const last = Math.max(...pool.map((q) => q.year));
    const desc = examMetaDescription("denko2", pool.length);
    expect(desc).toContain(`${first}〜${last}年度`);
    expect(desc).toContain(`${pool.length}問・${groupByYearSeason(pool).length}期分`);
    expect(desc).not.toContain("2024・2025年度上下期");
  });
});
