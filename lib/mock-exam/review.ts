import type { MockExamResult } from "./storage";

export function mockReviewHref(result: Pick<MockExamResult, "id" | "exam">): string {
  const params = new URLSearchParams({ mode: "review", scope: "exam", exam: result.exam,
    mock: result.id, returnTo: "/account/dashboard#mock-scores" });
  return `/quiz?${params}`;
}
