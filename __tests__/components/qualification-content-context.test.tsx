import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { CategoryStudyTip } from "@/components/quiz/CategoryStudyTip";
import { ExamMainTopics, ExamRelatedExams } from "@/components/exam/ExamDeepContent";
import { getCrossExamRelatedQuestions, getSharedSubjectTopics, isSubjectTopicTag } from "@/lib/questions/related";
import { questionReferenceLabel } from "@/lib/questions/reference-label";
import { QuestionListWithFilter } from "@/app/[exam]/[yearSeason]/QuestionListWithFilter";

afterEach(cleanup);
describe("qualification-aware editorial context", () => {
  it("does not turn edition and required-section tags into a cross-qualification recommendation", () => {
    const q = ALL_QUESTIONS.find(q => q.exam === "yakuzaishi" && q.session === "required" && q.qNumber === 1)!;
    expect(q).toBeDefined();
    expect(getCrossExamRelatedQuestions(q, ALL_QUESTIONS, 3).questions).toEqual([]);
    for (const tag of ["第111回", "必須問題", "2025年度", "科目A", "図版2"]) expect(isSubjectTopicTag(tag)).toBe(false);
    expect(isSubjectTopicTag("腎機能")).toBe(true);
    const matching = { ...q, id: "relevant", exam: "hokenshi" as const, topicTags: ["腎機能"] };
    expect(getCrossExamRelatedQuestions({ ...q, topicTags: ["腎機能", "第111回"] }, [matching], 3).questions).toEqual([matching]);
  });
  it("omits uncurated and non-IPA study tips rather than repeating generic advice", () => {
    const { container } = render(<><CategoryStudyTip category="腎機能" exam="kangoshi" topicTags={[]} /><CategoryStudyTip category="未知分野" exam="ap" topicTags={[]} /></>);
    expect(container).toBeEmptyDOMElement();
  });
  it("names an actually shared subject even when qualification and edition tags come first", () => {
    const dental = ALL_QUESTIONS.find(q => q.exam === "shika-ishi" && q.year === 2026 && q.session === "mondai-a" && q.qNumber === 5)!;
    const target = { ...dental, id: "other-exam-kidney", exam: "hokenshi" as const, topicTags: ["腎臓", "第119回"] };
    const current = { ...dental, topicTags: ["歯科医師", "第119回", "未共有の主題", "腎臓"] };
    expect(getSharedSubjectTopics(current, [target])).toEqual(["腎臓"]);
    expect(getSharedSubjectTopics(current, [{ ...target, topicTags: ["第119回"] }])).toEqual([]);
  });
  it("does not describe land-surveyor study topics or related qualifications as IPA curriculum", () => {
    const { container } = render(<><ExamMainTopics exam="chosashi" /><ExamRelatedExams exam="chosashi" /></>);
    expect(container.textContent).not.toContain("IPA");
  });
  it("labels official question, answer, answer sheet, explanation and law as different roles", () => {
    const q = { exam: "chosashi" as const, sourcePdfUrl: "https://www.moj.go.jp/content/001450010.pdf#page=2", sourceAnswerUrl: undefined };
    expect(questionReferenceLabel(q, q.sourcePdfUrl)).toBe("公式問題冊子");
    expect(questionReferenceLabel(q, "https://www.moj.go.jp/content/001450012.pdf")).toBe("公式答案用紙");
    for (const file of ["001450014", "001427203", "001427204", "001427205"]) {
      expect(questionReferenceLabel(q, `https://www.moj.go.jp/content/${file}.pdf`)).toBe("公式答案用紙");
    }
    expect(questionReferenceLabel(q, "https://www.moj.go.jp/content/001452470.pdf")).toContain("公式解答ではありません");
    expect(questionReferenceLabel(q, "https://laws.e-gov.go.jp/law/417AC0000000123")).toContain("法令原文");
    expect(questionReferenceLabel({ ...q, sourceAnswerUrl: q.sourcePdfUrl }, q.sourcePdfUrl)).toBe("公式問題・正答（同じ資料）");
  });
  it("exposes separate ordinary links to solve and read an explanation before hydration", () => {
    render(<QuestionListWithFilter groups={[{ session: "gakka", items: [{ id: "fp3-q11", qNumber: 11, category: "金融資産運用", isCalculation: false, isPlaceholder: false, questionPreview: "売りオペと買いオペ", href: "/quiz?exam=fp3&question=fp3-q11", explanationHref: "/q/fp3/2026-published/gakka/q11" }] }]} />);
    expect(screen.getByRole("link", { name: "問11の解説を見る" })).toHaveAttribute("href", "/q/fp3/2026-published/gakka/q11");
    expect(screen.getByRole("link", { name: "問11を解く" })).toHaveAttribute("href", "/quiz?exam=fp3&question=fp3-q11");
  });
});
