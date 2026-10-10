import { beforeEach, describe, expect, it, vi } from "vitest";
const { findQuestionById } = vi.hoisted(() => ({ findQuestionById: vi.fn() }));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById }));
import { POST } from "@/app/api/review/due/route";
import { nurseNumericQuestion as question } from "@/__tests__/fixtures/nurse-numeric-question";

beforeEach(() => findQuestionById.mockReset());
const request = (reviewStore = {}) => new Request("http://localhost/api/review/due", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ historyIds: [question.id], reviewStore, today: "2026-10-10" }),
});
describe("review API numeric originals", () => {
  it("returns a due original numeric question with its numeric answer contract intact", async () => {
    findQuestionById.mockResolvedValue(question);
    const response = await POST(request({ [question.id]: { nextReviewAt: "2026-10-10" } }));
    expect(response.status).toBe(200);
    expect((await response.json()).questions).toEqual([question]);
  });
  it("does not serve a numeric original before its scheduled review date", async () => {
    findQuestionById.mockResolvedValue(question);
    const response = await POST(request({ [question.id]: { nextReviewAt: "2026-10-11" } }));
    const result = await response.json();
    expect(result.questions).toEqual([]);
    expect(result.nextReviewDate).toBe("2026-10-11");
    expect(findQuestionById).not.toHaveBeenCalled();
  });
  it("keeps incomplete numeric metadata out of the practice review pool", async () => {
    findQuestionById.mockResolvedValue({ ...question, numericAnswer: undefined });
    const response = await POST(request());
    expect((await response.json()).questions).toEqual([]);
  });
});
