import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getFp1ExtensionQuestions, getFp1PublishedExtension } from "@/lib/fp1/published-extension";
import Page, { generateMetadata } from "@/app/fp1/applied/[edition]/[number]/page";
const questions = getFp1ExtensionQuestions("202605").filter((q) => q.number <= 60);
describe("FP1 approved Q54–60", () => {
  it("keeps seven original questions and all 35 official fields without choices", () => {
    expect(questions.map((q) => q.number)).toEqual([54,55,56,57,58,59,60]);
    expect(questions.map((q) => q.type === "originalmixedcloze" ? q.fields.length : q.answers.length)).toEqual([6,2,5,8,1,6,7]);
    for (const q of questions) { expect(q).not.toHaveProperty("choices"); expect(q).not.toHaveProperty("choicesForBlank4"); }
  });
  it("retains the dependency, exact rounding and question-specific law condition", () => {
    const q = questions.find((q) => q.number === 58)!;
    expect(q.type).toBe("originalworkedcalculation");
    if(q.type !== "originalworkedcalculation") throw Error("type");
    expect(q.dependsOn).toEqual({question:57,label:"⑧"});
    expect(q.rounding).toMatchObject({rule:"floor",unit:100});
    expect(q.answers[0]!.officialAnswer).toBe(String(Math.floor((8000000*.15+8500000*.232-250000-163360)/100)*100));
    expect(questions.find((q)=>q.number===60)!.law.temporalOverride?.effectiveDate).toBe("2026-04-01");
    expect(getFp1PublishedExtension("202605")!.sharedCases[2]!.officialQuestionRange).toEqual([60,62]);
  });
  it.each([54,55,56,57,58,59,60])("serves original question %i with its own canonical and complete answers", async (number) => {
    const params=Promise.resolve({edition:"202605",number:String(number)});
    expect((await generateMetadata({params})).alternates?.canonical).toBe(`/fp1/applied/202605/${number}`);
    render(await Page({params}));
    const q=questions.find((q)=>q.number===number)!;
    const fields=q.type==="originalmixedcloze"?q.fields:q.answers;
    for(const f of fields) expect(screen.getByLabelText("公式模範解答")).toHaveTextContent(f.officialAnswer);
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
    expect(screen.getByLabelText("共通設例")).toBeInTheDocument();
  });
});
