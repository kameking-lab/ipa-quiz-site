// @vitest-environment-options {"url":"https://www.kakomon-ai.jp/q/ip/2024-cbt/am/q12"}
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";


vi.mock("@capacitor/core", () => ({ Capacitor: { isNativePlatform: () => true, getPlatform: () => "ios" } }));
vi.mock("@capacitor/app", () => ({ App: { addListener: () => Promise.resolve({ remove: () => Promise.resolve() }) } }));
vi.mock("@capacitor/browser", () => ({ Browser: { open: vi.fn(() => Promise.resolve()) } }));
vi.mock("@capacitor/share", () => ({ Share: { share: vi.fn(() => Promise.resolve()) } }));
vi.mock("@capacitor/preferences", () => ({ Preferences: { get: vi.fn(() => Promise.resolve({ value: null })), set: vi.fn(), remove: vi.fn(() => Promise.resolve()) } }));
vi.mock("@revenuecat/purchases-capacitor", () => ({ Purchases: { addCustomerInfoUpdateListener: vi.fn(() => Promise.reject(new Error("unavailable"))), removeCustomerInfoUpdateListener: vi.fn() } }));
vi.mock("@/mobile/src/downloads", () => ({ downloads: { rights: vi.fn(() => Promise.resolve(null)), invalidate: vi.fn(() => Promise.resolve()), list: vi.fn(() => Promise.resolve({})), updateRights: vi.fn(() => Promise.resolve()) } }));
vi.mock("@/mobile/src/purchases", () => ({
  Membership: class { disconnect() { return Promise.resolve(); } offer() { return Promise.resolve(null); } },
  deviceMembership: { disconnect: vi.fn(async () => {}), offer: vi.fn(async () => null) },
  purchaseError: () => ({ cancelled: false, pending: false, rejected: false }),
  nativePublicSdkKey: (key: string) => Promise.resolve(key),
}));
vi.mock("@/mobile/src/login", () => ({ beginLogin: vi.fn(() => Promise.resolve()), observeLogin: vi.fn(() => Promise.resolve(() => {})) }));
vi.mock("@/mobile/src/platform", () => ({ observeReminderTap: vi.fn(() => Promise.resolve(() => {})), setReminder: vi.fn() }));
vi.mock("@/mobile/src/portable-storage", () => ({ persistStudy: vi.fn(() => Promise.resolve()), restoreStudy: vi.fn(() => Promise.resolve()) }));
vi.mock("@/mobile/src/images", () => ({ cachedImage: vi.fn() }));
vi.mock("@/mobile/src/QualificationActions", () => ({ NativePageQualificationActions: () => null }));
vi.mock("@/mobile/src/qualification-platform", () => ({ openQualificationUrl: vi.fn() }));
vi.mock("@/mobile/src/pet-support", () => ({ installNativePetSupport: () => () => {}, observePetStudyWrites: () => () => {}, persistStudyAfterPets: vi.fn(() => Promise.resolve()) }));
vi.mock("@/app/billing/ManageSubscriptionButton", () => ({ ManageSubscriptionButton: () => null }));

import { NativeTools, noticeText } from "@/mobile/src/NativeTools";
import { downloads } from "@/mobile/src/downloads";

const entitlement = { entitlement: { userId: null, entitled: false }, configuration: { sdkKey: "" } };
let scrollTo: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.clearAllMocks();
  scrollTo = vi.fn();
  window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
  vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.includes("/api/mobile/catalog")) return Response.json({ exams: [] });
    return Response.json(entitlement);
  }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("scrolls the membership panel into view when a /billing link far down the page is tapped", async () => {
  render(<NativeTools />);
  // The paywall CTA lives far below the panel, in the page body.
  const cta = Object.assign(document.createElement("a"), { href: "/billing/start?returnTo=%2Fq", textContent: "月額980円で続ける" });
  document.body.append(cta);
  await act(async () => {});
  expect(screen.queryByRole("heading", { name: "会員・設定" })).toBeNull();
  await act(async () => { fireEvent.click(screen.getByText("月額980円で続ける")); });
  const heading = screen.getByRole("heading", { name: "会員・設定" });
  expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  expect(document.activeElement).toBe(heading);
  // A second tap while the panel is already open must still bring it back.
  scrollTo.mockClear();
  await act(async () => { fireEvent.click(screen.getByText("月額980円で続ける")); });
  expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
});

it("does not scroll when the panel is opened from its own button at the top", async () => {
  render(<NativeTools />);
  await act(async () => {});
  await act(async () => { fireEvent.click(screen.getByRole("button", { name: "会員・設定" })); });
  expect(screen.getByRole("heading", { name: "会員・設定" })).toBeVisible();
  expect(scrollTo).not.toHaveBeenCalled();
});

it("shows failures without the 'Error: ' prefix", () => {
  expect(noticeText(new Error("会員状態を確認できません。"))).toBe("会員状態を確認できません。");
  expect(noticeText("plain")).toBe("plain");
});

it.each([true, false])("links native settings to the account or login (signed in: %s)", async signedIn => {
  vi.stubGlobal("fetch", vi.fn(async input => String(input).includes("/api/mobile/catalog") ? Response.json({ exams: [] }) : Response.json({ ...entitlement, entitlement: { userId: signedIn ? "local-test" : null, entitled: false } })));
  render(<NativeTools membershipOnly />);
  await act(async () => {});
  expect(screen.getByRole("link", { name: signedIn ? "アカウント（ログアウト・削除）" : "ログイン" }))
    .toHaveAttribute("href", signedIn ? "/account" : "/auth/signin?callbackUrl=/account");
});

it("does not restore paid offline rights from a response arriving after logout begins", async () => {
  let finish!: (response: Response) => void;
  vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>(resolve => { finish = resolve; })));
  render(<NativeTools />);
  await act(async () => {});
  await act(async () => {
    window.dispatchEvent(new Event("mobile:signing-out"));
    finish(Response.json({ ...entitlement, entitlement: { userId: "old-user", entitled: true, lease: "stale-response" } }));
  });
  expect(downloads.updateRights).not.toHaveBeenCalled();
});

it("does not intercept the billing conditions link", async () => {
  render(<NativeTools />); await act(async()=>{});
  const link=Object.assign(document.createElement("a"),{href:"/billing/terms",textContent:"条件・返金"});
  document.body.append(link);
  // Cancel default navigation after the capture listener has had its turn.
  let prevented=true;
  link.addEventListener("click",e=>{prevented=e.defaultPrevented;e.preventDefault();});
  await act(async()=>{fireEvent.click(link);});
  expect(prevented).toBe(false);
  expect(screen.queryByRole("heading",{name:"会員・設定"})).toBeNull();
});

it("does not erase signed offline rights merely because the status service fails", async () => {
  vi.mocked(downloads.invalidate).mockClear();
  vi.stubGlobal("fetch",vi.fn(async()=>new Response(null,{status:503})));
  render(<NativeTools />);await act(async()=>{});
  expect(downloads.invalidate).not.toHaveBeenCalled();
});

it.each(["owner","other"])("checks the persisted lease owner on the first refresh when a paid response has no replacement lease: %s", async owner => {
  vi.mocked(downloads.invalidate).mockClear();
  vi.mocked(downloads.rights).mockResolvedValue({access:{userId:owner}} as Awaited<ReturnType<typeof downloads.rights>>);
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({entitlement:{userId:"owner",entitled:true,lease:null},configuration:{sdkKey:""}})));
  render(<NativeTools />);await act(async()=>{});
  expect(downloads.rights).toHaveBeenCalled();
  if(owner==="owner")expect(downloads.invalidate).not.toHaveBeenCalled();
  else expect(downloads.invalidate).toHaveBeenCalled();
});
