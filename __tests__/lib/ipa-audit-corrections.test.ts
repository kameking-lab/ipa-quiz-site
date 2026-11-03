import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ALL_QUESTIONS } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { IPA_AUDIT_ADDITIONS } from "@/data/questions/corrections/ipa-audit-additions-20260913";
import { IPA_AUDIT_CORRECTIONS } from "@/data/questions/corrections/ipa-audit-20260913";

describe("official IPA audit corrections", () => {
  it("uses the full official 2023 spring NW morning-II key in eager and lazy loaders", async () => {
    // IPA 2023r05h_nw_am2_ans.pdf, page 1; independently transcribed official key.
    const expected = ["ウ", "ウ", "ア", "ア", "ウ", "エ", "イ", "エ", "ウ", "ウ", "イ", "ウ", "イ", "エ", "ウ", "イ", "ア", "エ", "ウ", "イ", "ア", "エ", "エ", "イ", "エ"];
    const lazy = await getQuestionsForExam("nw");
    for (const questions of [ALL_QUESTIONS, lazy]) {
      for (let n = 1; n <= 25; n++) {
        expect(questions.find(q => q.id === `nw-2023h-am2-q${n}`)?.answer).toBe(expected[n - 1]);
      }
    }
  });

  it("keeps all official choices and accepted answers of omitted questions", () => {
    expect(IPA_AUDIT_ADDITIONS).toHaveLength(10);
    for (const q of IPA_AUDIT_ADDITIONS) {
      expect(ALL_QUESTIONS.filter(x => x.id === q.id)).toHaveLength(1);
      for (const key of Array.isArray(q.answer) ? q.answer : [q.answer]) {
        expect(q.choices?.[key as keyof typeof q.choices]).toBeTruthy();
      }
    }
    expect(IPA_AUDIT_ADDITIONS.find(q => q.id === "ip-2009a-am-q12")?.answer).toEqual(["ア", "ウ"]);
    expect(IPA_AUDIT_ADDITIONS.find(q => q.id === "ip-2009a-am-q60")?.answer).toEqual(["ウ", "エ"]);
    expect(Object.keys(IPA_AUDIT_ADDITIONS.find(q => q.id === "sg-2023cbt-kamoku-a-q14")?.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"]);
  });

  it("does not collapse negated expressions or relational keys", () => {
    const question = (id: string) => ALL_QUESTIONS.find(q => q.id === id);
    for (const id of ["ap-2014a-am-q1", "au-2015a-am1-q1", "sm-2013h-am1-q11"]) {
      const choices = Object.values(question(id)?.choices ?? {});
      expect(choices).toHaveLength(4);
      expect(new Set(choices).size).toBe(4);
    }
    expect(question("ap-2011a-am-q7")?.question).toContain("x≧y");
    expect(question("ap-2012a-am-q28")?.choices?.エ).toContain("'AA01'");
    expect(question("db-2009h-am2-q11")?.choices?.ウ).toBe("①→③→②→⑤→④→⑥");
  });

  it("ships every source diagram referenced by manual corrections", () => {
    const paths = new Set(Object.values(IPA_AUDIT_CORRECTIONS).flatMap(q => q.imageUrls ?? []));
    expect(paths.size).toBeGreaterThan(0);
    for (const path of paths) {
      expect(path.startsWith("/questions/ipa-audit-20260913/")).toBe(true);
      expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
    }
  });
});
