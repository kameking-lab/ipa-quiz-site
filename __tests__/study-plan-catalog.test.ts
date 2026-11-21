import { beforeEach, expect, it, vi } from "vitest";
import type { Question } from "@/lib/questions/types";

const { bank, loadPaper } = vi.hoisted(() => ({ bank: vi.fn(), loadPaper: vi.fn() }));
vi.mock("@/lib/questions/get-questions", () => ({ getQuestionsForExam: bank }));
vi.mock("@/lib/exam-library-catalog", () => ({
  EXAM_CATALOG: [
    { id: "paper-one", group: "sample", subject: "kagaku", label: "春", date: "2026-03-20" },
    { id: "paper-two", group: "sample", subject: "kagaku", label: "秋", date: "2026-10-22" },
  ],
}));
vi.mock("@/lib/exam-qualification-hubs", () => ({ findQualificationHub: () => undefined }));
vi.mock("@/lib/exam-library-papers", () => ({ loadExamPaper: loadPaper }));

import { GET } from "@/app/api/study-plan/catalog/[exam]/route";

const base: Question = {
  id: "ip-test", exam: "ip", year: 2026, season: "spring", session: "am", qNumber: 1,
  type: "multiple-choice", question: "確認用の問題", choices: { ア: "答え", イ: "他の選択肢" }, answer: "ア",
  explanation: "選択肢の理由を説明します。", topicTags: [], category: "テクノロジ系", difficulty: 1,
};
const get = (exam: string) => GET(new Request("http://test/api/study-plan/catalog/" + exam), { params: Promise.resolve({ exam }) });
beforeEach(() => { bank.mockReset(); loadPaper.mockReset(); });

it("deduplicates IDs, keeps source order, and excludes ungraded/self-assessed/reference items", async () => {
  const old = { ...base, id: "ip-old", year: 2023, qNumber: 2 };
  bank.mockResolvedValue([
    old, base, base,
    { ...base, id: "descriptive", type: "descriptive" },
    { ...base, id: "essay", type: "essay" },
    { ...base, id: "manual-reference", publicAllowed: false },
    { ...base, id: "empty-choices", choices: {} },
  ]);
  const response = await get("ip");
  expect(response.ok).toBe(true);
  const { questions } = await response.json();
  expect(questions.map((q: Question) => q.id)).toEqual([base.id, old.id]);
  expect(questions[0]).not.toHaveProperty("answer");
});

it("keeps paper IDs addressable across sittings and excludes reference pages and unscored answers", async () => {
  loadPaper.mockImplementation(id => [
    { id: id + "-q1", choiceCount: 4, correctChoice: 2, answerAuthority: "official", number: 1 },
    { id: id + "-q2", choiceCount: 4, correctChoice: 2, answerAuthority: "official", number: 2, referenceOnly: true },
    { id: id + "-q3", choiceCount: 0, correctChoice: null, answerAuthority: "descriptive", number: 3 },
  ]);
  const { questions } = await (await get("sample-kagaku")).json();
  expect(questions.map((q: { id: string }) => q.id)).toEqual(["paper-two-q1", "paper-one-q1"]);
  expect(questions.every((q: { year: number }) => q.year === 2026)).toBe(true);
  expect(questions[0]).toMatchObject({ paperId: "paper-two", exam: "sample-kagaku", qNumber: 1 });
  expect(questions[0]).not.toHaveProperty("correctChoice");
});

it("distinguishes an empty available catalog from an unknown qualification", async () => {
  bank.mockResolvedValue([]);
  expect(await (await get("ip")).json()).toEqual({ questions: [] });
  expect((await get("unknown")).status).toBe(404);
});
