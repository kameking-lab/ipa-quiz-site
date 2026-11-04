import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { KANKOJI1_QUESTIONS } from "@/data/questions/kankoji1";
import source from "@/data/questions/kankoji1/2026-september.json";
import answers from "@/reports/sekou-1kankoji/official-answers.json";
import figures from "@/reports/sekou-1kankoji/figures.json";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isExamPublished, QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
const keys = ["ア", "イ", "ウ", "エ"];
const getB = (n: number) => KANKOJI1_QUESTIONS.find(q => q.session === "mondai-b" && q.qNumber === n)!;
beforeEach(() => { cleanup(); window.localStorage.clear(); createHistoryStore().reset(); });

describe("1級管工事 令和8年度・未公開", () => {
  it("batch1公開後: 資格台帳・同期/非同期公開プールのすべてで未公開を守る", async () => {
    expect(QUALIFICATION_CATALOG.find(q => q.slug === "sekou-1kankoji")?.status).toBe("live");
    expect(isExamPublished("kankoji1")).toBe(true);
    expect(getRegisteredExamCodes()).toContain("kankoji1");
    expect(QUESTIONS_BY_EXAM.kankoji1).toBeDefined();
    expect(ALL_QUESTIONS.some(q => q.exam === "kankoji1")).toBe(true);
    expect((await getQuestionsForExam("kankoji1")).length).toBeGreaterThan(0);
    expect(EXAM_CONFIGS.kankoji1.sessions.map(s => s.expectedQuestions)).toEqual([44, 29]);
  });
  it("A44問・B29問、全73問を欠落重複なく収録し公式正答全件と照合する", () => {
    expect(KANKOJI1_QUESTIONS).toHaveLength(73);
    expect(new Set(KANKOJI1_QUESTIONS.map(q => q.id)).size).toBe(73);
    for (const paper of source.papers) {
      const qs = KANKOJI1_QUESTIONS.filter(q => q.session === paper.session);
      expect(qs.map(q => q.qNumber)).toEqual(Array.from({ length: paper.officialQuestionCount }, (_, i) => i + 1));
      qs.forEach(q => {
        const official = answers[paper.paper as "A" | "B"][q.qNumber - 1];
        const expected = official.map(n => keys[n - 1]);
        expect(q.answer).toEqual(expected.length === 1 ? expected[0] : expected);
        expect(q.officialAnswerNumber).toBe(official.join("・"));
        expect(q.sourcePdfUrl).toBe(paper.questionUrl);
        expect(q.sourceAnswerUrl).toBe(source.answerUrl);
        expect(q.question).not.toMatch(/\{\{sup:|◯\d/);
        expect(Object.values(q.choices!)).toHaveLength(4);
        expect(Object.values(q.choices!).join("")).not.toMatch(/。\d|※|―/);
        expect(Object.values(q.choiceExplanations!)).toHaveLength(4);
        expect(Object.values(q.choiceExplanations!).every(v => v!.length > 15)).toBe(true);
        expect(q.explanationCoverage).toBe("full");
        const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(KANKOJI1_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
      });
    }
  });
  it("公式正答・問題のSHA256と原本由来の図7点を固定する", () => {
    const hash = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");
    const raw = "docs/evidence/sekou-1kankoji-latest2/input/";
    expect(hash(raw + "20260907k_seitou.pdf")).toBe(source.answerSha256);
    for (const p of source.papers) expect(hash(raw + `20260907k_mondai${p.paper.toLowerCase()}.pdf`)).toBe(p.questionSha256);
    expect(KANKOJI1_QUESTIONS.filter(q => q.hasImage)).toHaveLength(7);
    for (const f of figures) {
      const q = KANKOJI1_QUESTIONS.find(q => q.session === `mondai-${f.paper.toLowerCase()}` && q.qNumber === f.number)!;
      expect(q.imageUrls).toEqual([f.publicPath]);
      expect(hash("public" + f.publicPath)).toBe(f.sha256);
    }
  });
  it("上付き数字・分数・二列の表の意味を保持する", () => {
    const a = source.papers[0].questions;
    expect(a[5].question).toContain("2 m²");
    expect(a[21].question).toContain("10⁻³ m³/m³");
    expect(a[13].choices[3]).toContain("1/2");
    expect(a[14].choices[1]).toContain("CO₂");
    expect(a[16].question).toContain("kg/m³");
    expect(source.papers[1].questions[12].choices[2]).toContain("1/8");
  });
  it("B1は2・4の各単独回答、応用能力は原則2肢一致とする", () => {
    const q = getB(1);
    for (const selected of [["イ"], ["エ"]]) expect(isCompleteSelectionCorrect(q.answer, selected, 1)).toBe(true);
    expect(isCompleteSelectionCorrect(q.answer, ["イ", "エ"], 1)).toBe(false);
    for (const n of [22, 23, 24, 27, 28, 29]) {
      const q = getB(n); const answer = q.answer as string[];
      expect(q.requiredSelections).toBe(2);
      expect(isCompleteSelectionCorrect(q.answer, [...answer].reverse(), 2)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, answer.slice(0, 1), 2)).toBe(false);
    }
  });
  it.each([25, 26])("B%iは公式訂正の4組だけを受理する", n => {
    const q = getB(n);
    for (let mask = 0; mask < 16; mask++) {
      const selected = keys.filter((_, i) => mask & (1 << i));
      const expected = selected.includes("ア") && selected.length <= 2;
      expect(isCompleteSelectionCorrect(q.answer, selected, q.requiredSelections, q.acceptedAnswerCombinations)).toBe(expected);
    }
    expect(isCompleteSelectionCorrect(q.answer, ["ア", "ア"], 2, q.acceptedAnswerCombinations)).toBe(false);
    expect(q.questionNotice).toContain("公式正答訂正");
  });
  it.each(["card", "quiz"])("%sの訂正問題は1肢で確定できる", view => {
    const q = getB(25);
    render(view === "quiz" ? <QuizPlayer question={q} index={0} total={1} mode="year" onNext={() => {}} /> :
      <QuestionAnswerCard question={q} questionId={q.id} choices={q.choices} answerKey={q.answer}
        exam={q.exam} year={q.year} season={q.season} session={q.session} qNumber={q.qNumber} requiredSelections={q.requiredSelections} />);
    fireEvent.keyDown(window, { key: "1" });
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "回答を確定" }));
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ selected: "ア", correct: true });
  });
  it("訂正後も1を含まない二肢は不正解、1を含む二肢は正解", () => {
    const q = getB(26);
    const show = () => render(<QuizPlayer question={q} index={0} total={1} mode="year" onNext={() => {}} />);
    show(); fireEvent.keyDown(window, { key: "2" }); fireEvent.keyDown(window, { key: "3" });
    fireEvent.click(screen.getByRole("button", { name: "回答を確定" }));
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ selected: "イ・ウ", correct: false });
    cleanup(); createHistoryStore().reset(); show(); fireEvent.keyDown(window, { key: "1" }); fireEvent.keyDown(window, { key: "4" });
    fireEvent.click(screen.getByRole("button", { name: "回答を確定" }));
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ selected: "ア・エ", correct: true });
  });
});
