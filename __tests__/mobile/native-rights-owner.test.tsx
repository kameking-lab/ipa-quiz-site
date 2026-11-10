// @vitest-environment-options {"url":"https://www.kakomon-ai.jp/q/ip/2024-cbt/am/q12"}
import { act, render } from "@testing-library/react";
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

import { NativeTools } from "@/mobile/src/NativeTools";
import { downloads } from "@/mobile/src/downloads";

const entitlement = { entitlement: { userId: null, entitled: false }, configuration: { sdkKey: "" } };
let scrollTo: ReturnType<typeof vi.fn>;
beforeEach(() => {
  scrollTo = vi.fn();
  window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
  vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.includes("/api/mobile/catalog")) return Response.json({ exams: [] });
    return Response.json(entitlement);
  }));
});
afterEach(() => { vi.unstubAllGlobals(); document.body.innerHTML = ""; });

it.each(["owner","other"])("checks the persisted lease owner on the first refresh when a paid response has no replacement lease: %s", async owner => {
  vi.mocked(downloads.invalidate).mockClear();
  vi.mocked(downloads.rights).mockResolvedValue({access:{userId:owner}} as Awaited<ReturnType<typeof downloads.rights>>);
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({entitlement:{userId:"owner",entitled:true,lease:null},configuration:{sdkKey:""}})));
  render(<NativeTools />);await act(async()=>{});
  expect(downloads.rights).toHaveBeenCalled();
  if(owner==="owner")expect(downloads.invalidate).not.toHaveBeenCalled();
  else expect(downloads.invalidate).toHaveBeenCalled();
});
