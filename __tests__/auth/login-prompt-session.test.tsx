import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AccountNavigationLink, AccountNavigationProvider, SignedOutOnly } from "@/components/account/AccountNavigation";
import { SyncSessionObservationProvider } from "@/lib/sync/session-observation";
import { useSyncIdentity } from "@/lib/sync/use-sync-identity";
import { isSyncContextCurrent } from "@/lib/sync/ownership";
import { LS_KEYS } from "@/lib/storage/keys";

beforeEach(() => localStorage.clear());
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
function mount() {
  return render(<AccountNavigationProvider><AccountNavigationLink /><SignedOutOnly>ログイン案内</SignedOutOnly></AccountNavigationProvider>);
}
it("hides guest prompts from the first render until a delayed authenticated session arrives", async () => {
  let finish!: (value: Response) => void;
  vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>(resolve => { finish = resolve; })));
  const { container } = mount();
  expect(container.textContent).not.toContain("ログイン");
  await act(async () => finish(Response.json({ user: { id: "native-user", name: "test" } })));
  expect(screen.getByRole("link", { name: "アカウント" })).toBeVisible();
  expect(container.textContent).not.toContain("ログイン");
  expect(fetch).toHaveBeenCalledTimes(1);
});
it("shows login only after a signed-out session is confirmed", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json(null)));
  mount();
  expect(screen.queryByText("ログイン案内")).toBeNull();
  expect(await screen.findByRole("link", { name: "ログイン" })).toBeVisible();
});
it("hides stale guest prompts while native authentication is rechecked", async () => {
  let finish!: (value: Response) => void;
  vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(Response.json(null))
    .mockImplementation(() => new Promise<Response>(resolve => { finish = resolve; })));
  const { container } = mount();
  await screen.findByText("ログイン案内");
  await act(async () => window.dispatchEvent(new Event("mobile:entitlement-changed")));
  expect(container.textContent).not.toContain("ログイン");
  await act(async () => finish(Response.json({ user: { id: "native-user" } })));
  expect(screen.getByRole("link", { name: "アカウント" })).toBeVisible();
});
it("does not show login after a failed session request, and recovers on focus", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValueOnce(new Error("offline"))
    .mockResolvedValue(Response.json({ user: { id: "web-user" } })));
  const { container } = mount();
  await act(async () => {});
  expect(container.textContent).not.toContain("ログイン");
  await act(async () => window.dispatchEvent(new Event("focus")));
  await waitFor(() => expect(screen.getByRole("link", { name: "アカウント" })).toBeVisible());
});

it("shares a completed lookup with a late widget and refreshes mounted consumers together", async () => {
  function Widget() {
    const { account, checking } = useSyncIdentity();
    return <p>{checking ? "確認中" : account?.id ?? "ゲスト"}</p>;
  }
  const fetcher = vi.fn().mockResolvedValueOnce(Response.json(null))
    .mockResolvedValueOnce(Response.json({ user: { id: "member" } }))
    .mockResolvedValueOnce(Response.json(null));
  vi.stubGlobal("fetch", fetcher);
  const tree = (widget: boolean) => <SyncSessionObservationProvider><AccountNavigationProvider>
    <AccountNavigationLink />{widget && <Widget />}
  </AccountNavigationProvider></SyncSessionObservationProvider>;
  const { rerender } = render(tree(false));
  await screen.findByRole("link", { name: "ログイン" });
  rerender(tree(true));
  await screen.findByText("ゲスト");
  expect(fetcher).toHaveBeenCalledTimes(1);

  await act(async () => window.dispatchEvent(new Event("mobile:entitlement-changed")));
  expect(screen.getByRole("link", { name: "アカウント" })).toBeVisible();
  expect(screen.getByText("member")).toBeVisible();
  expect(fetcher).toHaveBeenCalledTimes(2);

  localStorage.setItem(LS_KEYS.syncLocalOwner, JSON.stringify({ userId: "member", token: "lease" }));
  await expect(isSyncContextCurrent({ userId: "member", ownerToken: "lease" })).resolves.toBe(false);
  expect(fetcher).toHaveBeenCalledTimes(3);
});
