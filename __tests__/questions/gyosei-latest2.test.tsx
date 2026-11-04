import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { GYOSEI_QUESTIONS } from "@/data/questions/gyosei";
import evidence from "@/reports/gyosei-latest2-evidence.json";
import { getAvailableExams } from "@/lib/seo/exam-meta";
import { ALL_QUESTIONS } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS, ALL_EXAM_CODES } from "@/lib/exam-config";
import { isExamPublished, QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { gradeNativeB, NativeBDataSchema } from "@/lib/questions/native-b";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { NativeBAnswerInput, NativeBFeedback } from "@/components/quiz/NativeBAnswer";
import { DescriptiveAnswerCard } from "@/components/quiz/DescriptiveAnswerCard";
import { QuestionCard } from "@/components/quiz/QuestionCard";

const keys = ["ア", "イ", "ウ", "エ", "オ"];
describe("行政書士 令和7・6年度の公式公開分", () => {
  it("retains 56 originals per year, including all four-slot originals and official descriptive examples", () => {
    expect(GYOSEI_QUESTIONS).toHaveLength(112);
    for (const year of [2024, 2025]) {
      const questions = GYOSEI_QUESTIONS.filter(q => q.year === year);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({length:56}, (_,i) => i+2));
      expect(questions.filter(q => q.type === "multiple-choice")).toHaveLength(50);
      expect(questions.filter(q => q.type === "native-b")).toHaveLength(3);
      expect(questions.filter(q => q.type === "descriptive")).toHaveLength(3);
    }
    for (const q of GYOSEI_QUESTIONS) {
      const expected = evidence.questions.find(e => e.id === q.id)!;
      expect(q.officialAnswerNumber).toBe(expected.officialAnswer ?? undefined);
      expect(q.sourcePdfUrl).toBe(`https://gyosei-shiken.or.jp/pdf/r${q.year-2018}_mondai.pdf`);
      expect(q.sourceAnswerUrl).toBe(`https://gyosei-shiken.or.jp/doc/exam/r${q.year-2018}ans.html`);
      expect(q.lawReferenceDate).toBe(`${q.year}-04-01`);
      expect(q.questionNotice).toContain("出題時点の法令");
      expect(q.question).not.toMatch(/cid:|下書用|［問題/);
      expect(q.explanation.length).toBeGreaterThan(25);
      if (q.type === "multiple-choice") {
        expect(Object.keys(q.choices!)).toEqual(keys);
        expect(Object.keys(q.choiceExplanations!)).toEqual(keys);
        expect(Object.values(q.choiceExplanations!).every(reason => reason.length > 20)).toBe(true);
        expect(q.explanationCoverage).toBe("full");
        if (q.officialAnswerNumber !== "全員正解") expect(q.answer).toBe(keys[Number(expected.officialAnswer)-1]);
      }
      if (q.type === "descriptive") {
        expect(q.modelAnswer).toBeTruthy();
        expect(q.scoringCriteria).toContain("自動採点は行いません");
      }
    }
  });
  it("matches all official cloze answer banks and grades four slots without changing the original question count", () => {
    const answers: Record<string, number[]> = {"2024-41":[8,2,4,10],"2024-42":[13,18,4,10],"2024-43":[16,7,13,3],"2025-41":[5,10,19,13],"2025-42":[3,6,19,16],"2025-43":[4,11,20,15]};
    for (const q of GYOSEI_QUESTIONS.filter(q => q.nativeB)) {
      const bank = q.nativeB!;
      expect(NativeBDataSchema.safeParse(bank).success).toBe(true);
      expect(bank.candidates.map(c => Number(c.id))).toEqual(Array.from({length:20},(_,i)=>i+1));
      expect(bank.candidates.every(c => c.explanation && c.explanation.length > 15)).toBe(true);
      expect(NativeBDataSchema.safeParse({...bank,candidates:bank.candidates.map(c=>({...c,explanation:undefined}))}).success).toBe(false);
      expect(bank.slots.map(s => Number(s.answer))).toEqual(answers[`${q.year}-${q.qNumber}`]);
      const selected = Object.fromEntries(bank.slots.map(s => [s.label,s.answer]));
      expect(gradeNativeB(bank,selected)).toMatchObject({isCorrect:true,correctSlots:4,totalSlots:4});
      expect(gradeNativeB(bank,{}).isCorrect).toBe(false);
      expect(NativeBDataSchema.safeParse({...bank,slots:bank.slots.slice(1)}).success).toBe(false);
      expect(NativeBDataSchema.safeParse({...bank,candidates:bank.candidates.slice(1)}).success).toBe(false);
    }
  });
  it("renders four answer inputs and the four-slot feedback denominator", () => {
    const data = GYOSEI_QUESTIONS.find(q => q.nativeB)!.nativeB!;
    const selected = Object.fromEntries(data.slots.map(s => [s.label, s.answer]));
    render(<><NativeBAnswerInput data={data} disabled={false} onAnswer={() => {}} /><NativeBFeedback data={data} result={gradeNativeB(data, selected)} /></>);
    expect(screen.getByRole("form", { name: "四つの空欄の回答" })).toBeTruthy();
    expect(screen.getAllByRole("combobox")).toHaveLength(4);
    expect(screen.getByRole("status").textContent).toBe("正答枠数 4/4（全枠正解）");
  });
  it("accepts any single answer for the official 2024 question 34 all-correct decision", () => {
    const q = GYOSEI_QUESTIONS.find(q=>q.year===2024 && q.qNumber===34)!;
    expect(q.officialAnswerNumber).toBe("全員正解");
    expect(q.answer).toEqual(keys);
    expect(q.requiredSelections).toBeUndefined();
    expect(choiceDisplayLabel("gyosei","オ")).toBe("5");
  });
  it("publishes reviewed questions through both registries and routing", async () => {
    expect(EXAM_CONFIGS.gyosei.yearRange).toEqual({start:2024,end:2025});
    expect(isExamPublished("gyosei")).toBe(true);
    expect(QUALIFICATION_CATALOG.filter(q => q.shortName === "行政書士")).toHaveLength(1);
    expect(getAvailableExams()).toContain("gyosei");
    expect(ALL_QUIZ_EXAM_CODES).toContain("gyosei");
    // ALL_EXAM_CODES is the legacy IPA-only list; external exams use ALL_QUIZ_EXAM_CODES.
    expect(ALL_EXAM_CODES).not.toContain("gyosei");
    expect(ALL_QUESTIONS.filter(q=>q.exam === "gyosei")).toHaveLength(112);
    expect(await getQuestionsForExam("gyosei")).toHaveLength(112);
    expect(GYOSEI_QUESTIONS.every(q=>!q.needsReview && q.license === "GYOSEI-owner-cleared")).toBe(true);
  });
  it("preserves the four underlined statements as visible bold text", () => {
    const q = GYOSEI_QUESTIONS.find(q=>q.year===2025 && q.qNumber===15)!;
    const { container } = render(<QuestionCard question={q} />);
    expect(container.querySelectorAll("strong")).toHaveLength(4);
    expect(container.querySelectorAll("strong")[3].textContent).toContain("棄却されたとみなされる");
  });
  it("labels official descriptive examples accurately and links their official source", () => {
    const q = GYOSEI_QUESTIONS.find(q=>q.year===2024 && q.qNumber===45)!;
    render(<DescriptiveAnswerCard question={q} defaultOpen />);
    expect(screen.getByText("行政書士試験研究センターの公式正解例")).toBeTruthy();
    expect(screen.getByText("公式正解例の出典").getAttribute("href")).toBe(q.sourceAnswerUrl);
    expect(q.modelAnswer!.split("\n\n")).toHaveLength(3);
    expect(screen.queryByText(/法務省の公式解答ではありません/)).toBeNull();
  });
});
