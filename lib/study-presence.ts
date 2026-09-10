export const PRESENCE_WINDOW_MS = 120_000;
export const PRESENCE_POLL_MS = 30_000;
export const PRESENCE_EVENT = "study-presence-count";

export function isActiveStudyTab(visible: boolean, lastActivity: number, now: number) {
  return visible && now - lastActivity < PRESENCE_WINDOW_MS;
}
