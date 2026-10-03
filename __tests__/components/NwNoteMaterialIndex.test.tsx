import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { trackEvent, posthogCapture } = vi.hoisted(() => ({ trackEvent: vi.fn(), posthogCapture: vi.fn() }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));
import { ExamNoteMaterialIndex } from "@/components/exam/ExamNoteMaterialIndex";
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

describe("qualification material indexes", () => {
  it.each([
    ["st", "ST", "https://note.com/ipa_quiz_ai/m/m7dab1384f6bb", "令和6年度春期の午後Ⅱ・問1", "DXの技術検証を経営判断へつなぐ答案設計"],
    ["sa", "SA", "https://note.com/ipa_quiz_ai/m/mfd0e3cddd722", "令和7年度春期の午後Ⅱ・問2", "データ移行の答案設計"],
  ] as const)("offers %s's free index with optional single purchases", (exam, label, href, question, topic) => {
    const { container } = render(<ExamNoteMaterialIndex exam={exam} />);
    const link = screen.getByRole("link", { name: new RegExp(`${label}教材の無料索引を見る`) });
    expect(container.querySelectorAll("a")).toHaveLength(1);
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(container).toHaveTextContent("索引は無料で閲覧できます。");
    expect(container).toHaveTextContent("各記事の無料部分で内容と収録範囲を確認");
    expect(container).toHaveTextContent("買い切り単品（各1,280円）");
    expect(container).toHaveTextContent("購入は任意です。");
    expect(container).toHaveTextContent(question);
    expect(container).toHaveTextContent(topic);
    expect(container).toHaveTextContent("公式問題を使った答案設計の教材");
    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith({ name: "note_outbound_click", source: `exam_${exam}`, account: "ipa_quiz_ai" });
  });

  it("preserves NW's card and excludes unregistered qualifications", () => {
    const { container, unmount } = render(<ExamNoteMaterialIndex exam="nw" />);
    const previous = container.innerHTML;
    unmount();
    expect(render(<NwNoteMaterialIndex exam="nw" />).container.innerHTML).toBe(previous);
    expect(render(<ExamNoteMaterialIndex exam="ap" />).container).toBeEmptyDOMElement();
  });
});
