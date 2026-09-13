import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { trackEvent, posthogCapture } = vi.hoisted(() => ({
  trackEvent: vi.fn(),
  posthogCapture: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));

import { TrackedNoteLink } from "@/components/analytics/TrackedNoteLink";
import { deriveNoteAccountFromUrl } from "@/lib/note-accounts";

beforeEach(() => {
  trackEvent.mockReset();
  posthogCapture.mockReset();
});

describe("TrackedNoteLink", () => {
  it("records a source-labelled click in both existing analytics clients", () => {
    render(
      <TrackedNoteLink
        href="https://note.com/ipa_quiz_ai"
        source="footer"
        account="ipa_quiz_ai"
        onClick={(event) => event.preventDefault()}
      >
        note
      </TrackedNoteLink>,
    );

    fireEvent.click(screen.getByRole("link", { name: "note" }));

    const payload = {
      name: "note_outbound_click",
      source: "footer",
      account: "ipa_quiz_ai",
    };
    expect(trackEvent).toHaveBeenCalledWith(payload);
    expect(posthogCapture).toHaveBeenCalledWith("note_outbound_click", {
      source: "footer",
      account: "ipa_quiz_ai",
    });
  });

  it("records the new exam_au source without breaking the existing sources", () => {
    render(
      <TrackedNoteLink
        href="https://note.com/sikaku_rakutoru/n/n573e38ac5dea"
        source="exam_au"
        account="sikaku_rakutoru"
        onClick={(event) => event.preventDefault()}
      >
        note
      </TrackedNoteLink>,
    );

    fireEvent.click(screen.getByRole("link", { name: "note" }));

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

  it("records anzen_ai_jp account clicks with the exam_library source (labor-safety exam library links)", () => {
    render(
      <TrackedNoteLink
        href="https://note.com/anzen_ai_jp/n/nb9490806c1ef"
        source="exam_library"
        account="anzen_ai_jp"
        onClick={(event) => event.preventDefault()}
      >
        note
      </TrackedNoteLink>,
    );

    fireEvent.click(screen.getByRole("link", { name: "note" }));

    expect(trackEvent).toHaveBeenCalledWith({
      name: "note_outbound_click",
      source: "exam_library",
      account: "anzen_ai_jp",
    });
    expect(posthogCapture).toHaveBeenCalledWith("note_outbound_click", {
      source: "exam_library",
      account: "anzen_ai_jp",
    });
  });
});

describe("deriveNoteAccountFromUrl", () => {
  it("recognises all three known note.com accounts", () => {
    expect(deriveNoteAccountFromUrl("https://note.com/ipa_quiz_ai/n/nabc")).toBe("ipa_quiz_ai");
    expect(deriveNoteAccountFromUrl("https://note.com/sikaku_rakutoru/n/nabc")).toBe("sikaku_rakutoru");
    expect(deriveNoteAccountFromUrl("https://note.com/anzen_ai_jp/n/nabc")).toBe("anzen_ai_jp");
  });

  it("returns null for unknown accounts, non-note.com hosts, and malformed URLs (fail-safe, no crash)", () => {
    expect(deriveNoteAccountFromUrl("https://note.com/someone_else/n/nabc")).toBeNull();
    expect(deriveNoteAccountFromUrl("https://example.com/ipa_quiz_ai")).toBeNull();
    expect(deriveNoteAccountFromUrl("not-a-url")).toBeNull();
  });
});
