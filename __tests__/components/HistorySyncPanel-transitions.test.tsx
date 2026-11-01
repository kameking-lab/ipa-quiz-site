import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HistorySyncPanel } from "@/app/account/HistorySyncPanel";
import { LS_KEYS } from "@/lib/storage/keys";

// Local boundary fixtures only: real component, identity hook, sync and storage.
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const session = (id: string | null) => Response.json(id ? { user: { id, email: `${id}@example.invalid` } } : {});
const history = { entries: [{ id: "local-question", correct: true, at: 1, selected: "a" }], starredIds: ["local-question"] };
const syncButton = () => screen.getAllByRole("button")[0];

beforeEach(() => { cleanup(); localStorage.clear(); localStorage.setItem(LS_KEYS.history, JSON.stringify(history)); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("history sync account transitions with local network fixtures", () => {
  it.each(["success", "failure"] as const)("ignores stale %s after newer account, then preserves history through failure and retry", async (staleResult) => {
    const old = deferred<Response>();
    const newer = deferred<Response>();
    let sessions = 0;
    let posts = 0;
    const bodies: unknown[] = [];
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input) === "/api/auth/session") {
        sessions++;
        if (sessions === 1) return session("A");
        if (sessions === 2) return old.promise;
        if (sessions === 3) return newer.promise;
        return session("B");
      }
      expect(String(input)).toBe("/api/account/history-sync");
      bodies.push(JSON.parse(String(init?.body)));
      posts++;
      return posts === 1 ? new Response(null, { status: 503 })
        : Response.json({ entries: [], merged: 0, total: 1 });
    }));
    render(<HistorySyncPanel />);
    fireEvent.click(await screen.findByRole("checkbox"));
    expect(syncButton()).toBeEnabled();
    fireEvent(window, new Event("focus"));
    expect(syncButton()).toBeDisabled();
    expect(screen.queryByRole("checkbox")).toBeNull();
    fireEvent(window, new Event("storage"));
    await act(async () => { newer.resolve(session("B")); });
    expect(await screen.findByText("B@example.invalid")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    await act(async () => {
      if (staleResult === "success") old.resolve(session("A"));
      else old.reject(new Error("old session failed"));
    });
    expect(screen.getByText("B@example.invalid")).toBeInTheDocument();
    expect(screen.queryByText("A@example.invalid")).toBeNull();
    fireEvent.click(syncButton());
    expect(posts).toBe(0);
    expect(localStorage.getItem(LS_KEYS.syncLocalOwner)).toBeNull();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(syncButton());
    await screen.findByRole("alert");
    await waitFor(() => expect(syncButton()).toBeEnabled());
    expect(JSON.parse(localStorage.getItem(LS_KEYS.history)!)).toEqual(history);
    fireEvent.click(syncButton());
    await screen.findByRole("status");
    expect(posts).toBe(2);
    expect(bodies).toEqual(Array(2).fill({ entries: history.entries, expectedUserId: "B" }));
    expect(JSON.parse(localStorage.getItem(LS_KEYS.history)!)).toEqual(history);
    expect(JSON.parse(localStorage.getItem(LS_KEYS.syncLocalOwner)!).userId).toBe("B");
  });

  it.each(["signed-out", "failed"] as const)("does not restore stale account after newer %s check", async (latest) => {
    const old = deferred<Response>();
    let calls = 0;
    vi.stubGlobal("fetch", vi.fn(async () => {
      calls++;
      if (calls === 1) return session("A");
      if (calls === 2) return old.promise;
      if (latest === "failed") throw new Error("latest unavailable");
      return session(null);
    }));
    render(<HistorySyncPanel />);
    fireEvent.click(await screen.findByRole("checkbox"));
    fireEvent(window, new Event("focus"));
    fireEvent(window, new Event("storage"));
    await waitFor(() => expect(screen.queryByText("A@example.invalid")).toBeNull());
    await act(async () => { old.resolve(session("A")); });
    expect(screen.queryByRole("checkbox")).toBeNull();
    expect(syncButton()).toBeDisabled();
    expect(localStorage.getItem(LS_KEYS.syncLocalOwner)).toBeNull();
    expect(JSON.parse(localStorage.getItem(LS_KEYS.history)!)).toEqual(history);
  });
});
