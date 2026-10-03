import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { trackEvent, posthogCapture } = vi.hoisted(() => ({ trackEvent: vi.fn(), posthogCapture: vi.fn() }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));
import { NwNoteMaterialIndex } from "@/components/exam/NwNoteMaterialIndex";

beforeEach(() => { cleanup(); vi.clearAllMocks(); });

describe("NW material index", () => {
  it("offers one free index entry with article-specific purchase disclosure", () => {
    const { container } = render(<NwNoteMaterialIndex exam="nw" />);
    const link = screen.getByRole("link", { name: /NW教材の無料索引を見る/ });
    expect(container.querySelectorAll("a")).toHaveLength(1);
    expect(link).toHaveAttribute("href", "https://note.com/ipa_quiz_ai/m/mf8652f414646");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(container).toHaveTextContent("索引は無料で閲覧できます。");
    expect(container).toHaveTextContent("収録記事は個別購入です。");
    expect(container).toHaveTextContent("各記事の価格・収録範囲はリンク先で確認してください。");
    link.focus();
    expect(link).toHaveFocus();
    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith({ name: "note_outbound_click", source: "exam_nw", account: "ipa_quiz_ai" });
    expect(posthogCapture).toHaveBeenCalledWith("note_outbound_click", { source: "exam_nw", account: "ipa_quiz_ai" });
  });

  it("adds no index or purchase links to other qualifications", () => {
    for (const exam of ["ip", "sg", "fe", "ap", "sa", "kanri", "eisei1"] as const) {
      const { container, unmount } = render(<NwNoteMaterialIndex exam={exam} />);
      expect(container).toBeEmptyDOMElement();
      unmount();
    }
  });
});
