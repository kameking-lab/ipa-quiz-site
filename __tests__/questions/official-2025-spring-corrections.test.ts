import { describe, expect, it } from "vitest";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { filterQuestions } from "@/lib/questions/filter";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";

// IPA official 2025 spring AM I answer PDF, checked 2026-09-12:
// https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_koudo_am1_ans.pdf
const official = [..."アイウウイウウウイアイウイイウアイイエイウウイエイウイエウイ"];
describe("verified common AM I source corrections", () => {
  it.each(["st", "sa", "nw", "sm", "sc"] as const)("%s matches all 30 official keys and restores missing material", async (exam) => {
    const questions = (await getQuestionsForExam(exam)).filter((q) => q.year === 2025 && q.season === "spring" && q.session === "am1");
    expect(questions).toHaveLength(30);
    expect(questions.map((q) => q.answer)).toEqual(official);
    expect(questions.filter(hasUnrenderableContent)).toEqual([]);
    const cpu = questions.find((q) => q.qNumber === 4)!;
    expect(cpu.question).toContain("1ナノ秒");
    expect(cpu.question).toContain("0.5");
    expect(cpu.explanation).not.toMatch(/仮定|選択肢に1\/2がない/);
    expect(questions[0].question).toContain("(x₀ + x₁) / 2");
    expect(filterQuestions(questions, { mode: "year" }).map((q) => q.qNumber)).toContain(7);
  });
  it("SG satisfaction uses all 500 responses", async () => {
    const q = (await getQuestionsForExam("sg")).find((q) => q.id === "sg-2025cbt-kamoku-a-q9")!;
    expect(q.explanation).toContain("1,800÷500 = 3.6");
    expect(q.answer).toBe("エ");
    expect(hasUnrenderableContent(q)).toBe(false);
  });
});
