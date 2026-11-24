// @vitest-environment-options {"url":"https://www.kakomon-ai.jp/q/ip/2024-cbt/am/q12"}
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Preferences } from "@capacitor/preferences";
import { MonthlyPlanLink } from "@/components/billing/MonthlyOffer";
import type { AppStorePurchaseHold } from "@/lib/billing/subscription/domain";

const nativePurchase = vi.hoisted(() => ({
  reserve: vi.fn(async () => ({ id: "native-attempt", expiresAt: "2099-01-01T00:00:00.000Z", requiresStart: true as const })),
  start: vi.fn<(id: string) => Promise<void>>(async () => {}),
  release: vi.fn(async () => {}),
  recover: vi.fn<(marker: object) => Promise<"active" | "processing" | null>>(async () => null),
  hold: vi.fn<(userId: string) => Promise<{ managed: boolean; pending: AppStorePurchaseHold }>>(),
  hasActive: vi.fn<() => Promise<boolean>>(async () => false),
  preferences: new Map<string, string>(),
}));

vi.mock("@capacitor/core", () => ({ Capacitor: { isNativePlatform: () => true, getPlatform: () => "ios" } }));
vi.mock("@capacitor/app", () => ({ App: { addListener: () => Promise.resolve({ remove: () => Promise.resolve() }) } }));
vi.mock("@capacitor/browser", () => ({ Browser: { open: vi.fn(() => Promise.resolve()) } }));
vi.mock("@capacitor/share", () => ({ Share: { share: vi.fn(() => Promise.resolve()) } }));
vi.mock("@capacitor/preferences", () => ({ Preferences: {
  get: vi.fn(async ({ key }: { key: string }) => ({ value: nativePurchase.preferences.get(key) ?? null })),
  set: vi.fn(async ({ key, value }: { key: string; value: string }) => { nativePurchase.preferences.set(key, value); }),
  remove: vi.fn(async ({ key }: { key: string }) => { nativePurchase.preferences.delete(key); }),
} }));
vi.mock("@revenuecat/purchases-capacitor", () => ({ Purchases: { addCustomerInfoUpdateListener: vi.fn(() => Promise.reject(new Error("unavailable"))), removeCustomerInfoUpdateListener: vi.fn() } }));
vi.mock("@/mobile/src/downloads", () => ({ downloads: { rights: vi.fn(() => Promise.resolve(null)), invalidate: vi.fn(() => Promise.resolve()), list: vi.fn(() => Promise.resolve({})), updateRights: vi.fn(() => Promise.resolve()) } }));
vi.mock("@/mobile/src/purchases", () => ({
  Membership: class { disconnect() { return Promise.resolve(); } offer() { return Promise.resolve(null); } },
  deviceMembership: { disconnect: vi.fn(async () => {}), offer: vi.fn(async () => null), hasActiveAppStorePurchase: nativePurchase.hasActive },
  StoreError: class extends Error { constructor(message: string, readonly code: string) { super(message); } },
  purchaseError: (result: unknown) => ({
    cancelled: result === "test-cancelled", pending: result === "test-pending", rejected: result === "test-cancelled",
  }),
  checkNativePurchase: nativePurchase.reserve,
  startNativePurchase: nativePurchase.start,
  releaseNativePurchase: nativePurchase.release,
  recoverNativePurchase: nativePurchase.recover,
  readNativePurchaseHold: nativePurchase.hold,
  nativePublicSdkKey: (key: string) => Promise.resolve(key),
}));
vi.mock("@/mobile/src/login", () => ({ beginLogin: vi.fn(() => Promise.resolve()), observeLogin: vi.fn(() => Promise.resolve(() => {})) }));
vi.mock("@/mobile/src/platform", () => ({ observeReminderTap: vi.fn(() => Promise.resolve(() => {})), setReminder: vi.fn() }));
vi.mock("@/mobile/src/portable-storage", () => ({ persistStudy: vi.fn(() => Promise.resolve()), restoreStudy: vi.fn(() => Promise.resolve()) }));
vi.mock("@/mobile/src/images", () => ({ cachedImage: vi.fn() }));
vi.mock("@/mobile/src/QualificationActions", () => ({ NativePageQualificationActions: () => null }));
vi.mock("@/mobile/src/qualification-platform", () => ({ openQualificationUrl: vi.fn() }));
vi.mock("@/mobile/src/pet-support", () => ({ installNativePetSupport: () => () => {}, observePetStudyWrites: () => () => {}, persistStudyAfterPets: vi.fn(() => Promise.resolve()) }));
vi.mock("@/app/billing/ManageSubscriptionButton", () => ({ ManageSubscriptionButton: ({ label }: { label: string }) => <button>{label}</button> }));

import { NativeTools, noticeText } from "@/mobile/src/NativeTools";
import { NativeSignInBoundary } from "@/mobile/src/NativeSignInBoundary";
import { beginLogin } from "@/mobile/src/login";
import { downloads } from "@/mobile/src/downloads";
import { deviceMembership, StoreError } from "@/mobile/src/purchases";

const entitlement = { entitlement: { userId: null, entitled: false }, configuration: { sdkKey: "" } };
let scrollTo: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.clearAllMocks();
  nativePurchase.preferences.clear();
  nativePurchase.recover.mockReset().mockResolvedValue(null);
  nativePurchase.hold.mockReset().mockResolvedValue({ managed: true, pending: null });
  nativePurchase.release.mockReset().mockResolvedValue(undefined);
  nativePurchase.start.mockReset().mockResolvedValue(undefined);
  nativePurchase.hasActive.mockReset().mockResolvedValue(false);
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

it("keeps the selected exam for weekly review when a native buyer needs to sign in", async () => {
  const signIn = vi.fn(async () => {});
  const offer = vi.fn(async () => ({ product: { priceString: "¥980" } }));
  const membership = { ...deviceMembership, offer } as unknown as typeof deviceMembership;
  const target = "/me?exam=ip";
  render(<><NativeTools membership={membership} signIn={signIn} /><a href={`/billing?returnTo=${encodeURIComponent(target)}`}>月額で復習計画を見る</a></>);
  fireEvent.click(screen.getByRole("link", { name: "月額で復習計画を見る" }));
  expect(screen.getByRole("heading", { name: "月額プランで今週の復習を始める" })).toBeVisible();
  fireEvent.click(await screen.findByRole("button", { name: "¥980 / 月で登録" }));
  await waitFor(() => expect(signIn).toHaveBeenCalledWith(`${target}#app-settings`));
  expect(JSON.parse(nativePurchase.preferences.get("kakomon:purchase-intent:v1")!)).toMatchObject({ action: "buy", returnTo: target });
});

it("resumes a pending restore after a legacy app session has been renewed", async () => {
  let requiresAppLogin = true;
  const signIn = vi.fn(async () => {});
  const restore = vi.fn(async () => {});
  const membership = { ...deviceMembership, restore } as unknown as typeof deviceMembership;
  vi.stubGlobal("fetch", vi.fn(async input => String(input).includes("/api/mobile/catalog") ? Response.json({ exams: [] })
    : Response.json({ requiresAppLogin, configuration: { sdkKey: "configured" }, entitlement: { userId: "native-user", entitled: false } })));
  const first = render(<NativeTools membershipOnly membership={membership} signIn={signIn} />);
  const button = screen.getByRole("button", { name: "購入を復元" });
  await waitFor(() => expect(button).toBeEnabled());
  fireEvent.click(button);
  await waitFor(() => expect(signIn).toHaveBeenCalledTimes(1));
  expect(restore).not.toHaveBeenCalled();
  expect(JSON.parse(nativePurchase.preferences.get("kakomon:purchase-intent:v1")!)).toMatchObject({ action: "restore" });

  first.unmount();
  requiresAppLogin = false;
  render(<NativeTools membershipOnly membership={membership} signIn={signIn} />);
  await waitFor(() => expect(restore).toHaveBeenCalledTimes(1));
  expect(signIn).toHaveBeenCalledTimes(1);
  expect(nativePurchase.preferences.has("kakomon:purchase-intent:v1")).toBe(false);
});

it("preserves the AI offer click handler while opening native checkout", async () => {
  const saveDraft = vi.fn();
  render(<><NativeTools /><MonthlyPlanLink returnTo="/q" label="AI質問を続ける" keepClickInApp onClick={saveDraft} /></>);
  await act(async () => {
    expect(fireEvent.click(screen.getByRole("link", { name: "AI質問を続ける" }))).toBe(false);
  });
  expect(saveDraft).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("heading", { name: "会員・設定" })).toBeVisible();
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

it.each([true, false])("shows the store offer without repeating login advice (signed in: %s)", async signedIn => {
  vi.mocked(deviceMembership.offer).mockResolvedValue({ product: { priceString: "¥980" } } as Awaited<ReturnType<typeof deviceMembership.offer>>);
  vi.stubGlobal("fetch", vi.fn(async input => String(input).includes("/api/mobile/catalog") ? Response.json({ exams: [] }) : Response.json({ ...entitlement, entitlement: { userId: signedIn ? "native-user" : null, entitled: false } })));
  const { container } = render(<NativeTools membershipOnly />);
  await screen.findByRole("button", { name: "¥980 / 月で登録" });
  expect(screen.queryByText(/購入したときと同じ方法/)).toBeNull();
  expect(screen.getByText(/購入時にApple IDに請求/)).toBeVisible();
  if (signedIn) expect(container.querySelector('a[href*="/auth/signin"]')).toBeNull();
  vi.mocked(deviceMembership.offer).mockResolvedValue(null as unknown as Awaited<ReturnType<typeof deviceMembership.offer>>);
});

it("lets a blocked native buyer reopen the existing login for the paid account", async () => {
  const signIn = vi.fn(async () => {});
  const buy = vi.fn(async () => { throw new StoreError("購入済みです。そちらでログインしてください。", "purchase_signin"); });
  const offer = vi.fn(async () => ({ product: { priceString: "¥980" } }));
  const membership = { ...deviceMembership, buy, offer } as unknown as typeof deviceMembership;
  vi.stubGlobal("fetch", vi.fn(async input => String(input).includes("/api/mobile/catalog") ? Response.json({ exams: [] }) : Response.json({ ...entitlement, entitlement: { userId: "native-user", entitled: false } })));
  render(<NativeTools membershipOnly membership={membership} signIn={signIn} />);
  expect(screen.queryByRole("button", { name: "ログインし直す" })).toBeNull();
  fireEvent.click(await screen.findByRole("button", { name: "¥980 / 月で登録" }));
  fireEvent.click(await screen.findByRole("button", { name: "ログインし直す" }));
  await waitFor(() => expect(signIn).toHaveBeenCalledWith("/q/ip/2024-cbt/am/q12#app-settings", true));
  expect(buy).toHaveBeenCalledTimes(1);
});

it("exposes Web contract management when an unpaid renewal blocks the iOS purchase", async () => {
  const buy = vi.fn(async () => { throw new StoreError("ウェブの契約が残っています。", "web_subscription_exists"); });
  const offer = vi.fn(async () => ({ product: { priceString: "¥980" } }));
  const membership = { ...deviceMembership, buy, offer } as unknown as typeof deviceMembership;
  vi.stubGlobal("fetch", vi.fn(async input => String(input).includes("/api/mobile/catalog") ? Response.json({ exams: [] }) : Response.json({ ...entitlement, entitlement: { userId: "native-user", entitled: false } })));
  render(<NativeTools membershipOnly membership={membership} />);
  expect(screen.queryByRole("button", { name: "ウェブ契約の管理・解約" })).toBeNull();
  fireEvent.click(await screen.findByRole("button", { name: "¥980 / 月で登録" }));
  expect(await screen.findByRole("button", { name: "ウェブ契約の管理・解約" })).toBeVisible();
});

it.each(["test-cancelled", "test-pending"] as const)("releases the server reservation only after a definite StoreKit cancellation (%s)", async result => {
  if (result === "test-pending") nativePurchase.recover.mockImplementationOnce(async () => {
    nativePurchase.hold.mockResolvedValue({ managed: true, pending: { approval: { reservationId: "native-attempt" } } });
    return "processing";
  });
  const buy = vi.fn(async (_config, _access, _selected, beforePurchase: () => Promise<void>) => {
    await beforePurchase();
    throw result;
  });
  const offer = vi.fn(async () => ({ product: { priceString: "¥980" } }));
  const membership = { ...deviceMembership, buy, offer } as unknown as typeof deviceMembership;
  vi.stubGlobal("fetch", vi.fn(async input => String(input).includes("/api/mobile/catalog") ? Response.json({ exams: [] }) : Response.json({ ...entitlement, entitlement: { userId: "native-user", entitled: false } })));
  render(<NativeTools membershipOnly membership={membership} />);
  const subscribe = await screen.findByRole("button", { name: "¥980 / 月で登録" });
  fireEvent.click(subscribe);
  if (result === "test-cancelled") {
    expect(await screen.findByText("購入をキャンセルしました。")).toBeVisible();
    expect(nativePurchase.release).toHaveBeenCalledWith("native-attempt");
    expect(subscribe).toBeEnabled();
  } else {
    expect(await screen.findByText(/購入の承認待ちです/)).toBeVisible();
    expect(nativePurchase.release).not.toHaveBeenCalled();
    expect(subscribe).toBeDisabled();
  }
});

const pendingKey = "kakomon:pending-purchase:native-user";
it("consumes the saved return after approval and relaunch for the purchasing user only", async () => {
  const { reconcilePendingPurchase } = await import("@/mobile/src/pending-purchase");
  const returnTo = "/quiz?mode=year&question=ip-q1";
  nativePurchase.preferences.set(pendingKey, JSON.stringify({ state: "approval", attemptId: "approval-attempt",
    returnTo, returnUntil: Date.now() + 60000 }));
  const resume = vi.fn();
  await reconcilePendingPurchase("other-user", true, undefined, resume);
  expect(resume).not.toHaveBeenCalled();
  await reconcilePendingPurchase("native-user", true, undefined, resume);
  await reconcilePendingPurchase("native-user", true, undefined, resume);
  expect(resume.mock.calls).toEqual([[returnTo]]);
  expect(nativePurchase.preferences.has(pendingKey)).toBe(false);
});
function purchaseScreen(
  buy: (...args: [unknown, unknown, unknown, () => Promise<void>]) => Promise<void> = vi.fn(),
  restore = vi.fn(async () => {}),
) {
  const offer = async () => ({ product: { priceString: "¥980" } });
  const membership = { ...deviceMembership, buy, restore, offer } as unknown as typeof deviceMembership;
  vi.stubGlobal("fetch", vi.fn(async input => String(input).includes("/api/mobile/catalog") ? Response.json({ exams: [] })
    : Response.json({ configuration: { sdkKey: "configured" }, entitlement: { userId: "native-user", entitled: false, source: "free" } })));
  return render(<NativeTools membershipOnly membership={membership} />);
}

it("migrates a legacy true marker after the server reports that there is no purchase", async () => {
  nativePurchase.preferences.set(pendingKey, "true");
  const buy = vi.fn(async (_config, _access, _selected, beforePurchase: () => Promise<void>) => {
    await beforePurchase();
    throw "test-cancelled";
  });
  purchaseScreen(buy);
  const button = await screen.findByRole("button", { name: "¥980 / 月で登録" });
  expect(button).toBeEnabled();
  expect(nativePurchase.recover).toHaveBeenCalledWith({ legacy: true });
  expect(nativePurchase.preferences.has(pendingKey)).toBe(false);
  fireEvent.click(button);
  expect(await screen.findByText("購入をキャンセルしました。")).toBeVisible();
  expect(nativePurchase.reserve).toHaveBeenCalledTimes(1);
});

it.each(["active", "processing"] as const)("protects legacy true when the server confirms %s", async state => {
  nativePurchase.preferences.set(pendingKey, "true");
  nativePurchase.recover.mockResolvedValue(state);
  purchaseScreen();
  expect(await screen.findByRole("button", { name: "¥980 / 月で登録" })).toBeDisabled();
  expect(nativePurchase.preferences.get(pendingKey)).toBe("true");
  expect(nativePurchase.reserve).not.toHaveBeenCalled();
});

it.each(["online", "relaunch"] as const)("retries the exact cancellation after an offline release on %s", async trigger => {
  nativePurchase.release.mockRejectedValueOnce(new Error("offline"));
  const first = purchaseScreen(async (_config, _access, _selected, beforePurchase) => {
    await beforePurchase();
    throw "test-cancelled";
  });
  const button = await screen.findByRole("button", { name: "¥980 / 月で登録" });
  fireEvent.click(button);
  expect(await screen.findByText("購入をキャンセルしました。")).toBeVisible();
  expect(button).toBeDisabled();
  expect(JSON.parse(nativePurchase.preferences.get(pendingKey)!)).toMatchObject({ state: "release", reservation: { id: "native-attempt" } });
  if (trigger === "relaunch") {
    first.unmount();
    purchaseScreen();
  } else window.dispatchEvent(new Event("online"));
  await waitFor(() => expect(screen.getByRole("button", { name: "¥980 / 月で登録" })).toBeEnabled());
  expect(nativePurchase.release.mock.calls).toEqual([["native-attempt"], ["native-attempt"]]);
  expect(nativePurchase.preferences.has(pendingKey)).toBe(false);
});

it.each(["STORE_PROBLEM_ERROR", "NETWORK_ERROR"])("keeps a result-unknown purchase on reconnect and restore after %s", async error => {
  const restore = vi.fn(async () => {});
  purchaseScreen(async (_config, _access, _selected, beforePurchase) => {
    await beforePurchase();
    throw new Error(error);
  }, restore);
  const button = await screen.findByRole("button", { name: "¥980 / 月で登録" });
  fireEvent.click(button);
  expect(await screen.findByText(error)).toBeVisible();
  expect(button).toBeDisabled();
  expect(nativePurchase.recover).not.toHaveBeenCalled();
  const marker = JSON.parse(nativePurchase.preferences.get(pendingKey)!);
  expect(marker.state).toBe("recheck");
  nativePurchase.recover.mockResolvedValue("processing");
  window.dispatchEvent(new Event("online"));
  await waitFor(() => expect(nativePurchase.recover).toHaveBeenCalledWith({ reservationId: marker.reservation.id }));
  expect(button).toBeDisabled();
  expect(nativePurchase.preferences.get(pendingKey)).toBe(JSON.stringify(marker));
  nativePurchase.recover.mockImplementation(async () => {
    expect(restore).toHaveBeenCalledTimes(1);
    return "processing";
  });
  fireEvent.click(screen.getByRole("button", { name: "購入を復元" }));
  await waitFor(() => expect(nativePurchase.recover).toHaveBeenCalledTimes(2));
  expect(button).toBeDisabled();
  nativePurchase.recover.mockResolvedValue(null); // the server's hold expired
  window.dispatchEvent(new Event("online"));
  await waitFor(() => expect(button).toBeEnabled());
  expect(nativePurchase.release).not.toHaveBeenCalled();
  expect(nativePurchase.preferences.has(pendingKey)).toBe(false);
});

it("rechecks a purchase interrupted while StoreKit was open, including before PAYMENT_PENDING can be persisted", async () => {
  const storeKit = vi.fn();
  const first = purchaseScreen(async (_config, _access, _selected, beforePurchase) => {
    await beforePurchase();
    storeKit();
    await new Promise<void>(() => {});
  });
  fireEvent.click(await screen.findByRole("button", { name: "¥980 / 月で登録" }));
  await waitFor(() => expect(storeKit).toHaveBeenCalledTimes(1));
  expect(nativePurchase.start).toHaveBeenCalledWith("native-attempt");
  expect(JSON.parse(nativePurchase.preferences.get(pendingKey)!)).toMatchObject({ state: "recheck" });
  expect(nativePurchase.recover).not.toHaveBeenCalled();
  nativePurchase.recover.mockResolvedValue("processing");
  first.unmount();
  purchaseScreen();
  expect(await screen.findByRole("button", { name: "¥980 / 月で登録" })).toBeDisabled();
  expect(screen.queryByRole("button", { name: "承認状況を確認" })).toBeNull();
  expect(nativePurchase.recover).toHaveBeenCalledWith({ reservationId: "native-attempt" });
  nativePurchase.recover.mockResolvedValue(null);
  window.dispatchEvent(new Event("online"));
  await waitFor(() => expect(screen.getByRole("button", { name: "¥980 / 月で登録" })).toBeEnabled());
  expect(nativePurchase.preferences.has(pendingKey)).toBe(false);
});

it("retains PAYMENT_PENDING through restore and relaunch", async () => {
  nativePurchase.recover.mockResolvedValue("processing");
  nativePurchase.recover.mockImplementationOnce(async () => {
    nativePurchase.hold.mockResolvedValue({ managed: true, pending: { approval: { reservationId: "native-attempt" } } });
    return "processing";
  });
  const restore = vi.fn(async () => {});
  const first = purchaseScreen(async (_config, _access, _selected, beforePurchase) => {
    await beforePurchase();
    throw "test-pending";
  }, restore);
  fireEvent.click(await screen.findByRole("button", { name: "¥980 / 月で登録" }));
  expect(await screen.findByText(/購入の承認待ちです/)).toBeVisible();
  const approval = { reservationId: "native-attempt", action: "approval" };
  expect(nativePurchase.recover).toHaveBeenLastCalledWith(approval);
  const beforeRestore = nativePurchase.recover.mock.calls.length;
  fireEvent.click(screen.getByRole("button", { name: "購入を復元" }));
  await waitFor(() => expect(restore).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(screen.getByRole("button", { name: "購入を復元" })).toBeEnabled());
  const beforeRelaunch = nativePurchase.recover.mock.calls.length;
  expect(beforeRelaunch).toBeGreaterThan(beforeRestore);
  expect(nativePurchase.recover).toHaveBeenLastCalledWith(approval);
  first.unmount();
  purchaseScreen();
  expect(await screen.findByRole("button", { name: "¥980 / 月で登録" })).toBeDisabled();
  expect(JSON.parse(nativePurchase.preferences.get(pendingKey)!)).toMatchObject({ state: "approval" });
  expect(nativePurchase.recover.mock.calls.length).toBeGreaterThan(beforeRelaunch);
  expect(nativePurchase.recover).toHaveBeenLastCalledWith(approval);
  expect(nativePurchase.release).not.toHaveBeenCalled();
});

it("records Ask to Buy when writing the local approval fails", async () => {
  nativePurchase.recover.mockImplementationOnce(async () => {
    nativePurchase.hold.mockResolvedValue({ managed: true, pending: { approval: { reservationId: "native-attempt" } } });
    return "processing";
  });
  purchaseScreen(async (_config, _access, _selected, beforePurchase) => {
    await beforePurchase();
    vi.mocked(Preferences.set).mockRejectedValueOnce(new Error("preferences unavailable"));
    throw "test-pending";
  });
  fireEvent.click(await screen.findByRole("button", { name: "¥980 / 月で登録" }));
  expect(await screen.findByRole("button", { name: "承認状況を確認" })).toBeEnabled();
  expect(nativePurchase.recover).toHaveBeenCalledWith({ reservationId: "native-attempt", action: "approval" });
  expect(JSON.parse(nativePurchase.preferences.get(pendingKey)!)).toMatchObject({ state: "recheck" });
});

it("keeps StoreKit purchase blocked when checking approval finds no receipt", async () => {
  let retryChecked = false;
  nativePurchase.reserve.mockResolvedValueOnce({ id: "original", expiresAt: "2099-01-01T00:00:00.000Z", requiresStart: true });
  nativePurchase.recover.mockImplementation(async marker => {
    if ("action" in marker && marker.action === "retry-approval") {
      expect(nativePurchase.hasActive).toHaveBeenCalledOnce();
      retryChecked = true;
      return "processing";
    }
    if ("action" in marker && marker.action === "approval" && "reservationId" in marker && typeof marker.reservationId === "string") {
      nativePurchase.hold.mockResolvedValue({ managed: true, pending: { approval: { reservationId: marker.reservationId } } });
    }
    return "processing";
  });
  const askToBuy = vi.fn(async (_config, _access, _selected, beforePurchase: () => Promise<void>) => {
    await beforePurchase();
    throw "test-pending";
  });
  const first = purchaseScreen(askToBuy);
  const subscribe = await screen.findByRole("button", { name: "¥980 / 月で登録" });
  expect(screen.queryByRole("button", { name: "承認状況を確認" })).toBeNull();
  fireEvent.click(subscribe);
  await screen.findByRole("button", { name: "承認状況を確認" });
  expect(subscribe).toBeDisabled();
  first.unmount();
  purchaseScreen(askToBuy);
  fireEvent.click(await screen.findByRole("button", { name: "承認状況を確認" }));
  await waitFor(() => expect(screen.getByRole("button", { name: "承認状況を確認" })).toBeEnabled());
  expect(retryChecked).toBe(true);
  expect(nativePurchase.recover).toHaveBeenCalledWith({ reservationId: "original", action: "retry-approval" });
  expect(nativePurchase.release).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "¥980 / 月で登録" })).toBeDisabled();
  expect(nativePurchase.start).toHaveBeenCalledOnce();
  expect(JSON.parse(nativePurchase.preferences.get(pendingKey)!)).toMatchObject({ state: "approval", reservation: { id: "original" } });
});

it.each(["device-active", "device-error", "server-processing", "server-error"])("retains approval on retry when the check reports %s", async result => {
  const marker = { state: "approval", attemptId: "attempt", revision: 3, reservation: { id: "original" } };
  nativePurchase.preferences.set(pendingKey, JSON.stringify(marker));
  nativePurchase.hold.mockResolvedValue({ managed: true, pending: { approval: { reservationId: "original" } } });
  if (result === "device-active") nativePurchase.hasActive.mockResolvedValueOnce(true);
  if (result === "device-error") nativePurchase.hasActive.mockRejectedValueOnce(new Error("StoreKit offline"));
  nativePurchase.recover.mockImplementation(async recovery => {
    if ("action" in recovery && recovery.action === "retry-approval" && result === "server-error") throw new Error("offline");
    return "processing";
  });
  purchaseScreen();
  const retry = await screen.findByRole("button", { name: "承認状況を確認" });
  fireEvent.click(retry);
  await waitFor(() => expect(nativePurchase.hasActive).toHaveBeenCalledOnce());
  await waitFor(() => expect(retry).toBeEnabled());
  expect(nativePurchase.recover.mock.calls.some(([body]) => "action" in body && body.action === "retry-approval")).toBe(result.startsWith("server"));
  expect(nativePurchase.preferences.get(pendingKey)).toBe(JSON.stringify(marker));
  expect(screen.getByRole("button", { name: "¥980 / 月で登録" })).toBeDisabled();
});

it.each(["switch during StoreKit sync", "no local record", "check response lost"])("preserves the group's Ask to Buy after %s", async scenario => {
  vi.stubGlobal("Capacitor", { isNativePlatform: () => true });
  const storeKit = Promise.withResolvers<boolean>();
  const reservationId = "apple-approval";
  const options = { name: "承認状況を確認" };
  const appleKey = "kakomon:pending-purchase:apple-user";
  const original = JSON.stringify({ state: "approval", attemptId: "original", reservation: { id: reservationId } });
  let session = scenario === "no local record" ? "google-user" : "apple-user";
  const pending: AppStorePurchaseHold = { approval: { reservationId } };
  if (scenario !== "no local record") nativePurchase.preferences.set(appleKey, original);
  if (scenario !== "no local record") vi.mocked(beginLogin).mockImplementationOnce(async () => { session = "google-user"; });
  nativePurchase.hasActive.mockReturnValueOnce(storeKit.promise);
  nativePurchase.hold.mockImplementation(async userId => {
    if (userId !== session) throw new Error("account changed");
    return { managed: true, pending };
  });
  const retrySessions: string[] = [];
  nativePurchase.recover.mockImplementation(async body => {
    if ("action" in body && body.action === "retry-approval") {
      expect(body).toEqual({ reservationId, action: "retry-approval" });
      retrySessions.push(session);
      if (scenario === "check response lost") throw new Error("offline");
    }
    return pending ? "processing" : null;
  });
  vi.stubGlobal("fetch", vi.fn(async input => String(input).includes("/api/mobile/catalog") ? Response.json({ exams: [] })
    : Response.json({ configuration: { sdkKey: "configured" }, entitlement: { userId: session, entitled: false, source: "free" } })));
  const membership = { ...deviceMembership, offer: async () => ({ product: { priceString: "¥980" } }) } as unknown as typeof deviceMembership;
  const renderSignIn = () => render(<><NativeTools membershipOnly membership={membership} />
    <NativeSignInBoundary returnTo="/account" switchAccount>Sign in</NativeSignInBoundary></>);

  const first = renderSignIn();
  fireEvent.click(await screen.findByRole("button", options));
  await waitFor(() => expect(nativePurchase.hasActive).toHaveBeenCalledOnce());
  if (scenario !== "no local record") fireEvent.click(screen.getByRole("button", { name: "ログイン画面を開く" }));
  await act(async () => storeKit.resolve(false));
  expect(retrySessions).toEqual(["google-user"]);
  if (scenario === "check response lost") expect(nativePurchase.preferences.get(appleKey)).toBe(original);
  first.unmount();
  session = "apple-user";
  if (scenario === "check response lost") nativePurchase.recover.mockRejectedValue(new Error("marker lookup unavailable"));
  nativePurchase.hold.mockClear();
  renderSignIn();
  const subscribe = await screen.findByRole("button", { name: "¥980 / 月で登録" });
  expect(subscribe).toBeDisabled();
  expect(nativePurchase.hold).toHaveBeenCalledWith("apple-user");
  expect(screen.getByRole("button", options)).toBeEnabled();
  expect(nativePurchase.preferences.has(appleKey)).toBe(scenario !== "no local record");
});

it("recovers the same attempt before the original purchase check returns, without opening StoreKit", async () => {
  const preflight = Promise.withResolvers<Awaited<ReturnType<typeof nativePurchase.reserve>>>();
  nativePurchase.reserve.mockImplementationOnce(() => preflight.promise);
  const storeKit = vi.fn();
  const first = purchaseScreen(async (_config, _access, _selected, beforePurchase) => {
    await beforePurchase();
    storeKit();
  });
  fireEvent.click(await screen.findByRole("button", { name: "¥980 / 月で登録" }));
  await waitFor(() => expect(nativePurchase.reserve).toHaveBeenCalledTimes(1));
  const { attemptId } = JSON.parse(nativePurchase.preferences.get(pendingKey)!);
  first.unmount();
  purchaseScreen();
  expect(await screen.findByRole("button", { name: "¥980 / 月で登録" })).toBeEnabled();
  expect(nativePurchase.recover).toHaveBeenCalledWith({ attemptId });
  await act(async () => preflight.resolve({ id: "late-native", expiresAt: "2099-01-01T00:00:00.000Z", requiresStart: true }));
  expect(nativePurchase.start).not.toHaveBeenCalled();
  expect(storeKit).not.toHaveBeenCalled();
  expect(nativePurchase.preferences.has(pendingKey)).toBe(false);
});

it("keeps B's failed cancellation after A's original success response and retries B on reconnect", async () => {
  const lateRelease = Promise.withResolvers<void>();
  nativePurchase.release.mockImplementationOnce(() => lateRelease.promise);
  nativePurchase.reserve.mockResolvedValueOnce({ id: "reservation-a", expiresAt: "2099-01-01T00:00:00.000Z", requiresStart: true })
    .mockResolvedValueOnce({ id: "reservation-b", expiresAt: "2099-01-01T00:00:00.000Z", requiresStart: true });
  const cancel = async (_config: unknown, _access: unknown, _offer: unknown, beforePurchase: () => Promise<void>) => {
    await beforePurchase();
    throw "test-cancelled";
  };
  const first = purchaseScreen(cancel);
  fireEvent.click(await screen.findByRole("button", { name: "¥980 / 月で登録" }));
  await waitFor(() => expect(nativePurchase.release).toHaveBeenCalledWith("reservation-a"));
  first.unmount();

  purchaseScreen(cancel);
  const button = await screen.findByRole("button", { name: "¥980 / 月で登録" });
  expect(button).toBeEnabled();
  expect(nativePurchase.release).toHaveBeenCalledTimes(2);
  nativePurchase.release.mockRejectedValueOnce(new Error("offline"));
  fireEvent.click(button);
  expect(await screen.findByText("購入をキャンセルしました。")).toBeVisible();
  const markerB = nativePurchase.preferences.get(pendingKey);
  expect(JSON.parse(markerB!)).toMatchObject({ state: "release", revision: 4, reservation: { id: "reservation-b" } });
  await act(async () => lateRelease.resolve());
  expect(nativePurchase.preferences.get(pendingKey)).toBe(markerB);
  expect(button).toBeDisabled();
  window.dispatchEvent(new Event("online"));
  await waitFor(() => expect(button).toBeEnabled());
  expect(nativePurchase.release.mock.calls).toEqual([["reservation-a"], ["reservation-a"], ["reservation-b"], ["reservation-b"]]);
  expect(nativePurchase.preferences.has(pendingKey)).toBe(false);
});

it("does not show login while the native session is still loading", async () => {
  let finish!: (response: Response) => void;
  vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>(resolve => { finish = resolve; })));
  const { container } = render(<NativeTools membershipOnly />);
  await act(async () => {});
  expect(screen.queryByRole("button", { name: "ログイン" })).toBeNull();
  expect(container.querySelector('a[href*="/auth/signin"]')).toBeNull();
  await act(async () => finish(Response.json({ ...entitlement, entitlement: { userId: "native-user", entitled: false } })));
  expect(screen.getByRole("link", { name: "アカウント（ログアウト・削除）" })).toBeVisible();
  expect(screen.queryByRole("button", { name: "ログイン" })).toBeNull();
});

it("does not infer a signed-out native session from a failed membership request", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 503 })));
  const { container } = render(<NativeTools membershipOnly />);
  await act(async () => {});
  expect(screen.queryByRole("button", { name: "ログイン" })).toBeNull();
  expect(container.querySelector('a[href*="/auth/signin"]')).toBeNull();
  expect(screen.getByRole("button", { name: "会員状態を再確認" })).toBeVisible();
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
