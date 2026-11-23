import { describe, expect, it } from "vitest";
import { IPA_TOP_CODES, ipaTopDescription } from "@/lib/seo/ipa-top";
import { examMetaDescription, examTopDescription, examTopTitle, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";

describe.each(IPA_TOP_CODES)("%s top copy", exam => {
  it("uses the published practice pool for counts, coverage and years, without unsupported offers", () => {
    const pool = getQuestionsByExamStrict(exam);
    const description = examMetaDescription(exam, -1);
    expect(description).toContain(pool.length.toLocaleString("ja-JP") + "問");
    expect(description).toContain(String(Math.min(...pool.map(q => q.year))));
    expect(description).toContain(String(Math.max(...pool.map(q => q.year))));
    expect(description).toContain("AIに質問");
    expect(description).not.toMatch(/未対応|完全無料|AI採点|全肢解説/);
    expect(examTopDescription(exam, pool.length)).toBe(description);
    expect(examTopTitle(exam)).toContain("過去問・解説｜年度別・分野別");
    expect(description.indexOf("AIに質問")).toBeLessThan(description.indexOf("掲載済み"));
    if (exam === "sg") expect(description).not.toContain("科目B");
    if (exam === "fe") expect(description).toContain("科目B");
    if (exam === "ap") expect(description).toContain("科目Aの知識確認");
    if (exam === "sc") expect(description).toContain("前身の情報セキュリティスペシャリスト試験を含む");
    else expect(description).not.toContain("前身");
  });
});
it("updates the displayed year and count when the practice pool changes", () => {
  const q = getQuestionsByExamStrict("sc")[0];
  const description = ipaTopDescription("sc", "支援士", [{ ...q, year: 2024 }, { ...q, year: 2025 }]);
  expect(description).toContain("2024〜2025年度");
  expect(description).toContain("2問");
  expect(description).not.toContain("前身");
});
