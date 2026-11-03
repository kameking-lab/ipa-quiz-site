import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { trackEvent, posthogCapture } = vi.hoisted(() => ({ trackEvent: vi.fn(), posthogCapture: vi.fn() }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));
import { ExamNoteGuide } from "@/components/exam/ExamNoteGuide";
import { getVerifiedFreeNoteGuides, isVerifiedFreeNoteGuide, getNoteGuide, EXAM_NOTE_SUPPLEMENTS } from "@/lib/note-guides";
import { noteCatalogUrl } from "@/lib/note-catalog";

beforeEach(() => { cleanup(); vi.clearAllMocks(); });
describe("verified free supplementary guides", () => {
  it("uses one qualification-filtered catalog entry instead of individual free or paid destinations", () => {
    const exams = ["ip", "sg", "fe", "ap", "pm", "au", "civil2", "eisei1"] as const;
    for (const exam of exams) {
      const { container, unmount } = render(<ExamNoteGuide exam={exam} />);
      const links = Array.from(container.querySelectorAll("a"));
      expect(links).toHaveLength(1);
      expect(links[0]!.href).toBe(noteCatalogUrl(exam));
      expect(container.textContent).toContain("無料／有料");
      unmount();
    }
    expect(isVerifiedFreeNoteGuide(EXAM_NOTE_SUPPLEMENTS.ip!)).toBe(false);
  });
  it("rejects missing verification, a paid kind with a free URL, and mismatching owners", () => {
    const guide = getNoteGuide("ip")!;
    expect(isVerifiedFreeNoteGuide(guide)).toBe(true);
    expect(isVerifiedFreeNoteGuide({ ...guide, href: "https://note.com/ipa_quiz_ai/n/unknown" })).toBe(false);
    expect(isVerifiedFreeNoteGuide({ ...guide, kind: "paid" })).toBe(false);
    expect(isVerifiedFreeNoteGuide({ ...guide, account: "anzen_ai_jp" })).toBe(false);
  });
  it("keeps the exact existing related free IP destinations and sources", () => {
    expect(getVerifiedFreeNoteGuides("ip").map((guide) => guide.href)).toEqual([
      "https://note.com/ipa_quiz_ai/n/nbabb9742557b", "https://note.com/ipa_quiz_ai/n/nc09b275bef06", "https://note.com/ipa_quiz_ai/n/ncd8e18eecdc0",
    ]);
    const { container } = render(<ExamNoteGuide exam="ip" />);
    expect(container.querySelector("details")).toBeNull();
    const link = screen.getByRole("link", { name: /この資格の記事を探す/ });
    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith({ name: "note_outbound_click", source: "exam_ip", account: "ipa_quiz_ai" });
    expect(posthogCapture).toHaveBeenCalledWith("note_outbound_click", { source: "exam_ip", account: "ipa_quiz_ai" });
  });
  it("returns no empty card for an exam with no verified guide", () => {
    const { container } = render(<ExamNoteGuide exam="kanri" />);
    expect(container).toBeEmptyDOMElement();
  });
});
