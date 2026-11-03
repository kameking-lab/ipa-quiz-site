import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/questions/get-questions", () => ({
  getQuestionsForExam: vi.fn(async () => []),
}));

import StreamQuizPage from "@/app/quiz/stream/page";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

describe("stream quiz route", () => {
  it("loads chosashi for its own stream URL instead of falling back to AP", async () => {
    await StreamQuizPage({ searchParams: Promise.resolve({ exam: "chosashi" }) });

    expect(getQuestionsForExam).toHaveBeenCalledTimes(1);
    expect(getQuestionsForExam).toHaveBeenCalledWith("chosashi");
    expect(getQuestionsForExam).not.toHaveBeenCalledWith("ap");
  });
});
