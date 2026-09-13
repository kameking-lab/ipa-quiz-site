import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { trackEvent, posthogCapture } = vi.hoisted(() => ({
  trackEvent: vi.fn(),
  posthogCapture: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));

import { ExamNoteGuide } from "@/components/exam/ExamNoteGuide";

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

  it("renders the verified AU guide with the exam_au source and fires a labelled click", () => {
    render(<ExamNoteGuide exam="au" />);
    expect(screen.getByText("noteの無料ガイド")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /無料ガイドを読む/ });
    expect(link).toHaveAttribute(
      "href",
      "https://note.com/sikaku_rakutoru/n/n573e38ac5dea",
    );
    // 択一のAU記事でも「記述」だけを名指しした誤解を招く表現になっていないこと。
    expect(screen.queryByText(/記述答案の組み立て方/)).not.toBeInTheDocument();

    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith({
      name: "note_outbound_click",
      source: "exam_au",
      account: "sikaku_rakutoru",
    });
    expect(posthogCapture).toHaveBeenCalledWith("note_outbound_click", {
      source: "exam_au",
      account: "sikaku_rakutoru",
    });
  });

  it("never shows free-guide wording when a guide's kind is paid", async () => {
    vi.resetModules();
    vi.doMock("@/lib/note-guides", async () => {
      const actual = await vi.importActual<typeof import("@/lib/note-guides")>(
        "@/lib/note-guides",
      );
      return {
        ...actual,
        getNoteGuide: (exam: string) =>
          exam === "ip"
            ? {
                kind: "paid" as const,
                href: "https://note.com/sikaku_rakutoru/n/test-paid",
                label: "テスト用の有料ガイド",
                source: "exam_sa" as const,
                account: "sikaku_rakutoru" as const,
              }
            : actual.getNoteGuide(exam as never),
      };
    });
    const { ExamNoteGuide: ExamNoteGuideWithPaidMock } = await import(
      "@/components/exam/ExamNoteGuide"
    );
    render(<ExamNoteGuideWithPaidMock exam="ip" />);
    expect(screen.getByText("noteの有料記事")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /有料記事を読む/ })).toBeInTheDocument();
    expect(screen.queryByText(/無料/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /無料ガイドを読む/ })).not.toBeInTheDocument();
    vi.doUnmock("@/lib/note-guides");
  });
});
