import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { trackEvent, posthogCapture } = vi.hoisted(() => ({
  trackEvent: vi.fn(),
  posthogCapture: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));

import { TrackedNoteLink } from "@/components/analytics/TrackedNoteLink";

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
});
