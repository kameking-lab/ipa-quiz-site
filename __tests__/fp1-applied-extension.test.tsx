import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { parseFp1AppliedExtension, publishableExtensionQuestions, type Fp1AppliedExtension, type AppliedBlock } from "@/lib/fp1/applied-extension";
import { AppliedBlocks, AppliedExtensionAnswers, AppliedExtensionQuestionBody, AppliedExtensionSharedCase } from "@/app/fp1/applied/_components/extension-view";
import { generateStaticParams } from "@/app/fp1/applied/[edition]/[number]/page";

// Schema-only synthetic fixtures: no new official question content or registration.
const testUrl = "https://example.com/test-only.pdf";
const labels = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];
function fixture(count = 2) {
  return {
    edition: "209901", lawReferenceDate: "2000-01-01", sourceQuestionUrl: testUrl,
    sourceAnswerUrl: testUrl, sourceIndexUrl: testUrl, sourceAnswerIndexUrl: testUrl,
    reuseConditionsUrl: testUrl, sourceAttribution: "TEST-ONLY", processingDisclosure: "TEST-ONLY",
    sharedCases: [{ number: 1, title: "TEST-ONLY共通設例", officialQuestionRange: [101, 103], includedQuestionNumbers: [101], pdfPages: [1], printedPages: [1], transcription: "approved", blocks: [{ type: "paragraph", text: "TEST-ONLY設例" }] }],
    questions: [{ id: "test-only-q101", type: "originalmixedcloze", readerKind: "mixed-text-numeric-cloze", number: 101,
      caseNumber: 1, title: "TEST-ONLY", source: { questionPdfPage: 2, questionPrintedPage: 1, answerPdfPage: 1 },
      instruction: "TEST-ONLY記入式", conditions: [], blocks: [] as AppliedBlock[], rounding: { rule: "none" },
      review: { transcription: "approved", explanation: "approved" }, law: { status: "confirmed", referenceDate: "2000-01-01", evidenceUrls: [testUrl] },
      sections: [{ paragraphs: [labels.slice(0, count).join(" ") + " ① □□□ ＊＊＊"] }],
      fields: labels.slice(0, count).map((label, i) => i === 1
        ? { kind: "text", label, officialAnswer: "TEST-ONLY語句", explanation: "TEST-ONLY解説", occurrences: 1 }
        : { kind: "numeric", label, officialAnswer: "１.５", unit: "％", explanation: "TEST-ONLY解説", occurrences: i === 0 ? 2 : 1 }),
    }],
  };
}

describe("FP1 detached original-format extension", () => {
  it.each([1, 2, 8])("accepts %i original fields while repeated labels remain one field", (count) => {
    const ext = parseFp1AppliedExtension(fixture(count));
    const q = ext.questions[0]!;
    expect(q.type).toBe("originalmixedcloze");
    if (q.type !== "originalmixedcloze") throw new Error("Unexpected question type");
    expect(q.fields).toHaveLength(count);
    expect(q.fields[0]!.occurrences).toBe(2);
    expect(q.fields[0]!.officialAnswer).toBe("１.５");
    expect(publishableExtensionQuestions(ext)).toHaveLength(1);
  });

  it.each(["choices", "choicesForBlank4"])("rejects fabricated %s on a native field or question", (key) => {
    const field = fixture(); Object.assign(field.questions[0]!.fields[0]!, { [key]: [] });
    expect(() => parseFp1AppliedExtension(field)).toThrow();
    const question = fixture(); Object.assign(question.questions[0]!, { [key]: [] });
    expect(() => parseFp1AppliedExtension(question)).toThrow();
  });

  it("rejects masked answers, invented/repeated labels and unit-bearing numeric values", () => {
    for (const answer of ["□□□", "＊＊＊", "1.5％"]) {
      const ext = fixture(); ext.questions[0]!.fields[0]!.officialAnswer = answer;
      expect(() => parseFp1AppliedExtension(ext)).toThrow();
    }
    const mismatch = fixture(); mismatch.questions[0]!.fields[0]!.occurrences = 1;
    expect(() => parseFp1AppliedExtension(mismatch)).toThrow();
    const invented = fixture(); invented.questions[0]!.sections[0]!.paragraphs.push("③");
    expect(() => parseFp1AppliedExtension(invented)).toThrow();
    const noBlank = fixture(1); noBlank.questions[0]!.fields[0]!.label = "答";
    expect(() => parseFp1AppliedExtension(noBlank)).toThrow();
    const duplicate = fixture(); duplicate.questions[0]!.fields[1]!.label = "①";
    expect(() => parseFp1AppliedExtension(duplicate)).toThrow();
  });

  it("keeps table-only question cells, grouping, unit note and a repeated inline blank without double counting", () => {
    const ext = fixture(); ext.questions[0]!.sections = [];
    ext.questions[0]!.readerKind = "table-numeric-cloze";
    ext.questions[0]!.blocks = [{ type: "table", caption: "TEST-ONLY表", unitNote: "単位: 円", rowHeaderLabel: "項目", columns: ["値"], rows: [
      { group: "TEST-ONLY区分", label: "項目A", cells: [{ text: "金額", blank: "①" }] },
      { label: "項目B", cells: [{ text: "別欄①円", blank: "①" }] },
      { label: "項目C", cells: [{ text: "語句", blank: "②" }] },
    ] }];
    const parsed = parseFp1AppliedExtension(ext);
    render(<AppliedExtensionQuestionBody question={parsed.questions[0]!} pdfUrl={testUrl} />);
    const table = screen.getByRole("table", { name: /TEST-ONLY表/ });
    expect(table).toHaveTextContent("単位: 円");
    expect(table).toHaveTextContent("TEST-ONLY区分");
    expect(within(table).getByRole("cell", { name: "別欄①円" })).toBeInTheDocument();
    expect(within(table).getByRole("cell", { name: /金額\s+空欄\s+①/ })).toBeInTheDocument();
    ext.questions[0]!.blocks[0] = { ...ext.questions[0]!.blocks[0]!, type: "table", caption: "TEST-ONLY", rowHeaderLabel: "項目", columns: ["A", "B"], rows: [{ label: "項目", cells: [{ text: "①①②" }] }] };
    expect(() => parseFp1AppliedExtension(ext)).toThrow();
  });

  it("renders formulas, diagram notes and original figure page without dropping source structure", () => {
    render(<AppliedBlocks pdfUrl={testUrl} blocks={[
      { type: "formula", caption: "TEST-ONLY式", expression: "A = B / C\nD = A × 100", notes: ["TEST-ONLY端数注記"] },
      { type: "figure", caption: "TEST-ONLY図", facts: ["TEST-ONLY寸法"], notes: ["TEST-ONLY注記1", "TEST-ONLY注記2"], originalPdfPage: 4, processingNotice: "図を文章で整理したTEST-ONLY資料" },
    ]} />);
    expect(screen.getByText("A = B / C D = A × 100")).toHaveClass("whitespace-pre-wrap");
    expect(within(screen.getByLabelText("図の注記")).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "原紙の図（PDF p.4）" })).toHaveAttribute("href", testUrl + "#page=4");
  });

  it("keeps each official answer, variable field count and rounding/intermediate instructions", () => {
    const ext = fixture(8);
    Object.assign(ext.questions[0]!, { rounding: { rule: "round-half-up", decimals: 0, text: "TEST-ONLY四捨五入", intermediateNote: "TEST-ONLY途中は丸めない" } });
    const q = parseFp1AppliedExtension(ext).questions[0]!;
    render(<AppliedExtensionAnswers question={q} />);
    expect(within(screen.getByLabelText("公式模範解答")).getAllByRole("definition")).toHaveLength(8);
    expect(screen.getByLabelText("公式模範解答")).toHaveTextContent("１.５（％）");
    expect(screen.getByText("TEST-ONLY語句")).toBeInTheDocument();
    expect(screen.getByText("TEST-ONLY途中は丸めない")).toBeInTheDocument();
  });

  it("blocks HOLD, all pending review states, absent evidence and dependent chains", () => {
    const ext = parseFp1AppliedExtension(fixture());
    ext.questions[0]!.law.status = "hold";
    expect(publishableExtensionQuestions(ext)).toEqual([]);
    ext.questions[0]!.law.status = "confirmed";
    ext.questions[0]!.law.evidenceUrls = [];
    expect(publishableExtensionQuestions(ext)).toEqual([]);
    for (const gate of ["transcription", "explanation"] as const) {
      const pending = parseFp1AppliedExtension(fixture()); pending.questions[0]!.review[gate] = "pending";
      expect(publishableExtensionQuestions(pending)).toEqual([]);
    }
    const pendingCase = parseFp1AppliedExtension(fixture()); pendingCase.sharedCases[0]!.transcription = "pending";
    expect(publishableExtensionQuestions(pendingCase)).toEqual([]);
    const ready = parseFp1AppliedExtension(fixture());
    const base = ready.questions[0]!;
    for (const number of [102, 103]) ready.questions.push({ ...base, type: "originalworkedcalculation", readerKind: "single-calculation-with-working", id: "test-only-" + number, number, workingRequired: true, dependsOn: { question: number - 1, label: "①" }, answers: [{ kind: "numeric", label: number === 102 ? "①" : "答", officialAnswer: "1", unit: "円", prompt: "TEST-ONLY計算", calculationSteps: ["TEST-ONLY式"], explanation: "TEST-ONLY解説", occurrences: 1 }] });
    const last = ready.questions[2]!; if (last.type === "originalworkedcalculation") last.dependsOn!.label = "①";
    expect(publishableExtensionQuestions(ready).map((q) => q.number)).toEqual([101, 102, 103]);
    const intermediate = ready.questions[1]!; if (intermediate.type === "originalworkedcalculation") intermediate.answers[0]!.label = "答";
    // Missing referenced blanks block dependent questions.
    expect(publishableExtensionQuestions(ready).map((q) => q.number)).toEqual([101, 102]);
    if (intermediate.type === "originalworkedcalculation") intermediate.answers[0]!.label = "①";
    base.review.transcription = "pending";
    expect(publishableExtensionQuestions(ready)).toEqual([]);
  });

  it("retains calculation prompts, floor instructions and complete working without choices", () => {
    const ext = parseFp1AppliedExtension(fixture());
    const q: Fp1AppliedExtension["questions"][number] = { ...ext.questions[0]!, type: "originalworkedcalculation", readerKind: "single-calculation-with-working", workingRequired: true, rounding: { rule: "floor", unit: 100, text: "TEST-ONLY100円未満切捨て" }, answers: [{ kind: "numeric", label: "答", officialAnswer: "100", unit: "円", prompt: "TEST-ONLY計算せよ", calculationSteps: ["TEST-ONLY計算式", "TEST-ONLY端数処理"], explanation: "TEST-ONLY解説", occurrences: 1 }] };
    render(<><AppliedExtensionQuestionBody question={q} /><AppliedExtensionAnswers question={q} /></>);
    expect(screen.getByLabelText("計算問題")).toHaveTextContent("TEST-ONLY計算せよ");
    expect(screen.getByLabelText("独自解説")).toHaveTextContent("TEST-ONLY計算式");
    expect(screen.getByLabelText("公式模範解答")).toHaveTextContent("100（円）");
    expect(screen.getByText("TEST-ONLY100円未満切捨て")).toBeInTheDocument();
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
  });

  it("distinguishes original common-case range from included questions and leaves public routes unchanged", () => {
    const ext = parseFp1AppliedExtension(fixture());
    render(<AppliedExtensionSharedCase sharedCase={ext.sharedCases[0]!} pdfUrl={testUrl} />);
    expect(screen.getByLabelText("共通設例")).toHaveTextContent("原問範囲: 問101～103 / 収録: 問101");
    expect(generateStaticParams()).toEqual([{ edition: "202605", number: "51" }, { edition: "202605", number: "52" }, { edition: "202605", number: "53" }]);
    const missing = fixture(); missing.sharedCases[0]!.includedQuestionNumbers.push(102);
    expect(() => parseFp1AppliedExtension(missing)).toThrow();
    const law = fixture(); law.questions[0]!.law.referenceDate = "2001-01-01";
    expect(() => parseFp1AppliedExtension(law)).toThrow();
  });
});
