import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ExamNoteGuide } from "@/components/exam/ExamNoteGuide";

vi.mock("@/lib/analytics/events", () => ({ trackEvent: vi.fn() }));
vi.mock("@/lib/posthog", () => ({ posthogCapture: vi.fn() }));

describe("ExamNoteGuide", () => {
  it("renders nothing when no guide is registered for the exam", () => {
    const { container } = render(<ExamNoteGuide exam="ip" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the existing free-guide copy and link for sa unchanged", () => {
    render(<ExamNoteGuide exam="sa" />);
    expect(screen.getByText("noteの無料ガイド")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /無料ガイドを読む/ })).toHaveAttribute(
      "href",
      "https://note.com/sikaku_rakutoru/n/n9e207dfe4421",
    );
    expect(screen.getByLabelText("無料の答案ガイド")).toBeInTheDocument();
  });
});
