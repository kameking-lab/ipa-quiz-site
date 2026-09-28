import { describe, expect, it } from "vitest";
import {
  buildFrequentTopicsPost,
  buildLastMonthPost,
  buildOverviewPost,
  buildPracticePost,
} from "@/data/blog/generators";

const builders = [
  buildOverviewPost,
  buildLastMonthPost,
  buildFrequentTopicsPost,
  buildPracticePost,
];

describe("blog exam-format copy", () => {
  it.each(["ip", "sg", "fe"] as const)(
    "%s articles do not prescribe afternoon essays or answer writing",
    (exam) => {
      for (const build of builders) {
        const post = build(exam, 0);
        expect(post.description).not.toMatch(/午前・午後・論文/);
        expect(post.body).not.toMatch(/## 午後試験|## 午後・論文|再現答案|論文系の試験/);
        expect(post.body).not.toMatch(/午後の長文問題で使える/);
      }
    },
  );

  it("preserves the IT Passport official 100-question, 120-minute format", () => {
    const post = buildOverviewPost("ip", 0);
    expect(post.body).toContain("100問を120分");
    expect(post.body).toContain("科目A・Bや午後・論文の区分はありません");
  });

  it("keeps FE's separate A/B timing and SG's combined timing", () => {
    expect(buildOverviewPost("fe", 0).body).toContain("科目A（60問・90分）と科目B（20問・100分）");
    expect(buildOverviewPost("sg", 0).body).toContain("科目Aと事例を扱う科目Bを合わせて60問・120分");
  });

  it("updates AP wording to the 2026 CBT A/B names", () => {
    const post = buildOverviewPost("ap", 0);
    expect(post.body).toContain("2026年度からCBT方式");
    expect(post.body).toContain("科目A（旧午前）");
    expect(post.body).toContain("科目B（旧午後）");
  });
});
