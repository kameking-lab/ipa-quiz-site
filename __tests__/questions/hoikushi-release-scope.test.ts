import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { HOIKUSHI_QUESTIONS } from "@/data/questions/hoikushi";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

describe("保育士の案内と公開年度の一致", () => {
  it("演習可能な公開問題はR8前期154問・9科目の1期である", () => {
    const ready = HOIKUSHI_QUESTIONS.filter(isPracticeReadyQuestion);
    expect([...new Set(ready.map((q) => `${q.year}-${q.season}`))]).toEqual(["2026-early"]);
    expect(ready).toHaveLength(154);
    expect(new Set(ready.map((q) => q.session)).size).toBe(9);
  });
  it("公開紹介にR7後期の収録や転載許諾を先取りしない", () => {
    const entry = getQualificationByExamCode("hoikushi");
    expect(entry?.officialReuseTermsUrl).toBe("https://www.hoyokyo.or.jp/terms/");
    expect(entry?.reuseSummary).toContain("令和7年度後期は未公開");
    expect(entry?.reuseSummary).toContain("1回分154問");
    expect(entry?.reuseSummary).not.toMatch(/許諾|転載|利用条件|利用規約|無断使用|選択科目/u);
    const seo = readFileSync(path.join(process.cwd(), "lib/seo/exam-meta.ts"), "utf8");
    const description = seo.split("\n").find((value) => value.trimStart().startsWith("hoikushi:"));
    expect(description).toContain("令和8年度前期の1回分154問収録");
    expect(description).not.toContain("2回分収録");
    const home = readFileSync(path.join(process.cwd(), "lib/home/home-directory.ts"), "utf8");
    const line = home.split("\n").find((value) => value.includes('code: "hoikushi"'));
    expect(line).toContain("令和8年度前期・154問");
    expect(line).not.toContain("令和7年度後期");
  });
});
