// Render-free signal for "is an AI copilot panel currently open".
// The floating copilot variants own their open state locally, while the AI
// quota badge lives in the global layout. This singleton bridges them without
// a context provider or a localStorage key — both bundles import this same
// module instance. A count (not a boolean) keeps it correct when the desktop
// and mobile variants are both mounted.

let openCount = 0;
const listeners = new Set<() => void>();

export function setCopilotPanelOpen(open: boolean): void {
  openCount = Math.max(0, openCount + (open ? 1 : -1));
  for (const listener of listeners) listener();
}

export function subscribeCopilotOpen(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function isCopilotOpen(): boolean {
  return openCount > 0;
}
