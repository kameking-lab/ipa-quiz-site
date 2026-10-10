import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getFp1ExtensionQuestions, getFp1PublishedExtension } from "@/lib/fp1/published-extension";
import { parseFp1AppliedExtension } from "@/lib/fp1/applied-extension";
import Page, { generateMetadata, generateStaticParams } from "@/app/fp1/applied/[edition]/[number]/page";
import { ExamOfficialResources } from "@/components/exam/ExamOfficialResources";

const questions = getFp1ExtensionQuestions("202605").filter(q => q.number >= 61);
const fields = (q: typeof questions[number]) => q.type === "originalmixedcloze" ? q.fields : q.answers;
describe("FP1 May complete original applied scope", () => {
  it("publishes the final five originals and fourteen official slots without fabricating choices", () => {
    expect(questions.map(q => q.number)).toEqual([61,62,63,64,65]);
    expect(questions.flatMap(fields)).toHaveLength(14);
    expect(questions.map(q => fields(q).map(f => [f.officialAnswer,f.unit]))).toEqual([
      [["75,800,000","円"],["11,735,700","円"]],
      [["300","㎡"],["776","㎡"]],[["3,280","万円"]],
      [["5,440","万円"],["957","万円"],["368","万円"]],
      [["20","万円"],["市街化","区域"],["30","日"],["16,000","万円"],["3","年"],["4","カ月"]],
    ]);
    expect(generateStaticParams()).toHaveLength(15);
    for(const q of questions) expect(q).not.toHaveProperty("choices");
  });
  it("retains full question instructions and answers with optional working", () => {
    expect(questions[0]!.instruction).toContain("概算取得費");
    for(const number of [62,63]) {
      const q=questions.find(q=>q.number===number)!;
      if(q.type!=="originalworkedcalculation") throw Error("Expected calculation");
      expect(q.workingRequired).toBe(false);
      expect(q.readerKind).toMatch(/answer-only$/);
      expect(q.instruction).toMatch(/計算過程.*不要/);
    }
    const q64=questions.find(q=>q.number===64)!;
    if(q64.type!=="originalworkedcalculation")throw Error("Expected calculation");
    expect(q64.answers[1]!.calculationSteps.join(" ")).toContain("957万円");
    expect(q64.answers[2]!.calculationSteps.join(" ")).not.toContain("957万円");
    const invalid=structuredClone(getFp1PublishedExtension("202605")!);
    const answerOnly=invalid.questions.find(q=>q.number===62)!;
    if(answerOnly.type!=="originalworkedcalculation")throw Error("Expected calculation");
    answerOnly.workingRequired=true;
    expect(()=>parseFp1AppliedExtension(invalid)).toThrow();
  });
  it.each([61,62,63,64,65])("serves original question %i with complete official slots, source and canonical", async number => {
    const params=Promise.resolve({edition:"202605",number:String(number)});
    expect((await generateMetadata({params})).alternates?.canonical).toBe(`/fp1/applied/202605/${number}`);
    render(await Page({params}));
    const q=questions.find(q=>q.number===number)!;
    expect(within(screen.getByLabelText("公式模範解答")).getAllByRole("definition")).toHaveLength(fields(q).length);
    expect(screen.getByRole("link",{name:`公式問題PDF（問${number}）`})).toHaveAttribute("href",`https://www.kinzai.or.jp/uploads/lib/question/202605/fp01_g_oyo.pdf#page=${q.source.questionPdfPage}`);
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
  });
  it("reports the actual fifty basic questions in official resources", () => {
    render(<ExamOfficialResources exam="fp1" />);
    expect(screen.getByText(/サイト内でも.*全50問/)).toBeInTheDocument();
    expect(screen.queryByText(/25問/)).not.toBeInTheDocument();
  });
});
