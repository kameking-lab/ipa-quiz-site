import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AccountNavigationProvider } from "@/components/account/AccountNavigation";
import { SiteHeader } from "@/components/SiteHeader";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import SettingsPage from "@/app/settings/page";

const state = vi.hoisted(() => ({ pathname: "/", account: null as { id: string } | null }));
vi.mock("next/navigation", () => ({ usePathname: () => state.pathname, useSearchParams: () => new URLSearchParams() }));
vi.mock("@/lib/sync/use-sync-identity", () => ({ useSyncIdentity: () => ({ account: state.account }) }));
vi.mock("@/lib/streak/StreakBadge", () => ({ StreakBadge: () => null }));
vi.mock("@/components/ThemeToggle", () => ({ ThemeToggle: () => null }));
vi.mock("@/components/theme-provider", () => ({ useTheme: () => ({ theme: "light", setTheme: vi.fn() }) }));
vi.mock("@/components/account/CloudSyncPanel", () => ({ CloudSyncPanel: () => null }));
vi.mock("@/app/account/notifications/NotificationSettings", () => ({ NotificationSettings: () => null }));
vi.mock("@/components/pwa/MobileInstallControl", () => ({ MobileInstallControl: () => null }));

beforeEach(() => { state.account = { id: "local-test" }; localStorage.clear(); });
afterEach(cleanup);

it.each(["/auth/signout", "/auth/signin", "/auth/verify-request", "/account/delete"])("keeps the bottom menu off %s", pathname => {
  state.pathname = pathname;
  render(<AccountNavigationProvider><MobileBottomNav /></AccountNavigationProvider>);
  expect(screen.queryByRole("navigation", { name: "モバイル底タブ" })).not.toBeInTheDocument();
});

it.each(["/search", "/e-learning/exams", "/quiz", "/q/ip/2024-cbt/am/q12"])("opens the account from %s with two taps", async pathname => {
  state.pathname = pathname;
  render(<AccountNavigationProvider><SiteHeader /></AccountNavigationProvider>);
  fireEvent.click(screen.getByRole("button", { name: "メニューを開く" }));
  const link = screen.getByRole("dialog").querySelector('a[href="/account"]');
  expect(link).toHaveTextContent("アカウント");
  document.addEventListener("click", event => event.preventDefault(), { once: true });
  fireEvent.click(link!);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

it.each(["/search", "/e-learning/exams"])("offers login to a guest from %s", pathname => {
  state.pathname = pathname; state.account = null;
  render(<AccountNavigationProvider><SiteHeader /></AccountNavigationProvider>);
  fireEvent.click(screen.getByRole("button", { name: "メニューを開く" }));
  expect(screen.getByRole("dialog").querySelector('a[href="/auth/signin?callbackUrl=/account"]')).toHaveTextContent("ログイン");
  expect(screen.getByRole("dialog").querySelector('a[href="/account"]')).toBeNull();
});

it.each(["/", "/search", "/e-learning/exams"])("opens the personal page from the three bottom tabs on %s", pathname => {
  state.pathname = pathname;
  render(<AccountNavigationProvider><MobileBottomNav /></AccountNavigationProvider>);
  expect(screen.getByRole("link", { name: "わたし" })).toHaveAttribute("href", "/me");
  expect(screen.getByRole("navigation", { name: "モバイル底タブ" }).querySelectorAll("a")).toHaveLength(3);
});
it("opens the personal page from the home account icon", () => {
  state.pathname = "/";
  render(<AccountNavigationProvider><SiteHeader /></AccountNavigationProvider>);
  expect(screen.getByRole("link", { name: "わたし・アカウント" })).toHaveAttribute("href", "/me");
});

it.each([true, false])("has one settings row (signed in: %s)", signedIn => {
  state.account = signedIn ? { id: "local-test" } : null;
  render(<AccountNavigationProvider><SettingsPage /></AccountNavigationProvider>);
  expect(screen.getByRole("link", { name: signedIn ? "アカウント（ログアウト・削除）" : "ログイン" }))
    .toHaveAttribute("href", signedIn ? "/account" : "/auth/signin?callbackUrl=/account");
});
