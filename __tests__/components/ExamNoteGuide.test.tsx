import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { trackEvent, posthogCapture } = vi.hoisted(() => ({ trackEvent: vi.fn(), posthogCapture: vi.fn() }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));
import { ExamNoteGuide } from "@/components/exam/ExamNoteGuide";
import { getVerifiedFreeNoteGuides, isVerifiedFreeNoteGuide, getNoteGuide, EXAM_NOTE_SUPPLEMENTS } from "@/lib/note-guides";
import { NOTE_FREE_VERIFICATIONS } from "@/lib/note-free-verifications";

beforeEach(() => { cleanup(); vi.clearAllMocks(); });
describe("verified free supplementary guides", () => {
  it("retains free exam entries but never exposes the eight paid registry destinations", () => {
    const exams = ["ip", "sg", "fe", "ap", "pm", "au", "civil2", "eisei1"] as const;
    for (const exam of exams) {
      const { container, unmount } = render(<ExamNoteGuide exam={exam} />);
      const links = Array.from(container.querySelectorAll("a"));
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        const proof = NOTE_FREE_VERIFICATIONS[link.getAttribute("href")!];
        expect(proof?.price).toBe(0);
        expect(proof?.status).toBe("published");
      }
      expect(container.textContent).not.toContain("有料記事を読む");
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
    expect(container.querySelector("details")?.open).toBe(false);
    const link = screen.getAllByRole("link", { name: /無料ガイドを読む/, hidden: true })[1]!;
    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith({ name: "note_outbound_click", source: "exam_ip_score_report", account: "ipa_quiz_ai" });
    expect(posthogCapture).toHaveBeenCalledWith("note_outbound_click", { source: "exam_ip_score_report", account: "ipa_quiz_ai" });
  });
  it("returns no empty card for an exam with no verified guide", () => {
    const { container } = render(<ExamNoteGuide exam="kanri" />);
    expect(container).toBeEmptyDOMElement();
  });
});
