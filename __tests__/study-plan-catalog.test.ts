import { describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/study-plan/catalog/[exam]/route";
vi.mock("@/lib/exam-config", () => ({ ALL_QUIZ_EXAM_CODES: ["ip"] }));
vi.mock("@/lib/questions/get-questions", () => ({ getQuestionsForExam: async () => [{ id: "ip-q1", exam: "ip", year: 2026, season: "spring", session: "am", qNumber: 1, answer: "ア" }] }));
vi.mock("@/lib/questions/filter", () => ({ isPracticeReadyQuestion: () => true }));
vi.mock("@/lib/exam-library-catalog", () => ({ EXAM_CATALOG: [{ id: "paper", group: "lckohyo", subject: "試験", date: "2026-04", label: "テスト回", pdfUrl: "https://www.exam.or.jp/test.pdf", indexUrl: "https://www.exam.or.jp/" }] }));
vi.mock("@/lib/exam-qualification-hubs", () => ({ findQualificationHub: (exam: string) => exam === "library" ? {} : undefined, qualificationHubMatchesEntry: () => true }));
vi.mock("@/lib/exam-library-papers", () => ({ loadExamPaper: () => [
  { id: "paper-q1", number: 1, choiceCount: 4, correctChoice: 2, answerAuthority: "official", text: "answer body", images: [] },
  { id: "paper-q2", number: 2, choiceCount: 4, correctChoice: null, answerAuthority: "unconfirmed", text: "unconfirmed", images: [] },
  { id: "paper-q3", number: 3, choiceCount: 4, correctChoice: 3, answerAuthority: "official", referenceOnly: true, text: "reference", images: [] },
] }));
const get = (exam: string) => GET(new Request(`http://localhost/api/study-plan/catalog/${exam}`), { params: Promise.resolve({ exam }) });
describe("plan catalog", () => {
  it("returns routing metadata without a quiz answer or body", async () => {
    const response = await get("ip"); const { questions } = await response.json();
    expect(questions).toEqual([{ id: "ip-q1", exam: "ip", year: 2026, season: "spring", session: "am", qNumber: 1 }]);
  });
  it("includes only officially scorable library questions and keeps their paper for the existing access gate", async () => {
    const response = await get("library"); const { questions } = await response.json();
    expect(questions).toHaveLength(1);
    expect(questions[0]).toMatchObject({ id: "paper-q1", exam: "library", paperId: "paper", year: 2026 });
    expect(questions[0]).not.toHaveProperty("correctChoice"); expect(questions[0]).not.toHaveProperty("text");
  });
  it("rejects unregistered qualifications instead of falling back to another exam", async () => {
    expect((await get("unknown")).status).toBe(404);
  });
});
