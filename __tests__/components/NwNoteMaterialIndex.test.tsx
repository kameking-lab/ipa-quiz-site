import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { trackEvent, posthogCapture } = vi.hoisted(() => ({ trackEvent: vi.fn(), posthogCapture: vi.fn() }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));
import { ExamNoteMaterialIndex } from "@/components/exam/ExamNoteMaterialIndex";
import { ExamNoteGuide } from "@/components/exam/ExamNoteGuide";
import { NwNoteMaterialIndex } from "@/components/exam/NwNoteMaterialIndex";

beforeEach(() => { cleanup(); vi.clearAllMocks(); });

describe("one qualification catalog entry replaces separate purchase and index cards", () => {
  it.each(["st", "sa", "nw", "sc"] as const)("gives %s one accessible entry without a duplicate purchase card", (exam) => {
    const { container } = render(<><ExamNoteGuide exam={exam} /><ExamNoteMaterialIndex exam={exam} /></>);
    const link = screen.getByRole("link", { name: /この資格の記事を探す/ });
    expect(container.querySelectorAll("a")).toHaveLength(1);
    expect(link).toHaveAttribute("href", `https://tsugino-shikaku.jp/articles?qualification=${exam}`);
    expect(container).toHaveTextContent("無料／有料");
    expect(container).not.toHaveTextContent(/買い切り単品|無料索引|[0-9,]+円/);
    link.focus();
    expect(link).toHaveFocus();
    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith({ name: "note_outbound_click", source: `exam_${exam}`, account: "ipa_quiz_ai" });
    expect(posthogCapture).toHaveBeenCalledExactlyOnceWith("note_outbound_click", { source: `exam_${exam}`, account: "ipa_quiz_ai" });
  });

  it("does not add a second purchase card to other qualifications", () => {
    for (const exam of ["ip", "sg", "fe", "ap", "kanri", "eisei1"] as const) {
      const { container, unmount } = render(<ExamNoteMaterialIndex exam={exam} />);
      expect(container).toBeEmptyDOMElement();
      unmount();
    }
  });

  it("also routes legacy NW component destinations through the catalog and gates other exams", () => {
    const { unmount } = render(<NwNoteMaterialIndex exam="nw" />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "https://tsugino-shikaku.jp/articles?qualification=nw");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    unmount();
    expect(render(<NwNoteMaterialIndex exam="sa" />).container).toBeEmptyDOMElement();
  });
});
