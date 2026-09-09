"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { posthogCapture } from "@/lib/posthog";

export type NoteLinkSource =
  | "footer"
  | "operator"
  | "exam_sa"
  | "exam_st"
  | "exam_nw";

interface TrackedNoteLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  source: NoteLinkSource;
  account: "ipa_quiz_ai" | "sikaku_rakutoru";
}
export function TrackedNoteLink({
  href,
  source,
  account,
  onClick,
  ...props
}: TrackedNoteLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent({ name: "note_outbound_click", source, account });
    posthogCapture("note_outbound_click", { source, account });
    onClick?.(event);
  }

  return <a {...props} href={href} onClick={handleClick} />;
}
