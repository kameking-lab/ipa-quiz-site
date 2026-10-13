import { LS_KEYS } from "./keys";

// Feedback history is kept for the feedback dialog. It no longer unlocks AI usage.
export function readFeedbackSubmitted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(LS_KEYS.feedbackSubmitted) === "true";
  } catch {
    return false;
  }
}

export function setFeedbackSubmitted(value = true): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.feedbackSubmitted, value ? "true" : "false");
  } catch {
    // A blocked storage API must not prevent feedback submission.
  }
}
