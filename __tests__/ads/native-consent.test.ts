import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const native = vi.hoisted(() => ({ prepare: vi.fn(), request: vi.fn(), enable: vi.fn(), disable: vi.fn() }));
vi.mock("@/mobile/shared/contracts", () => ({ nativeClient: () => true }));
vi.mock("@/mobile/src/tracking", () => ({ prepareTrackingPrivacy: native.prepare, requestTrackingPermission: native.request, enableTrackingAds: native.enable, disableTrackingAds: native.disable }));
const mode = { adStoragePurposeConsentStatus: 1, adUserDataPurposeConsentStatus: 1, adPersonalizationPurposeConsentStatus: 1, analyticsStoragePurposeConsentStatus: 1 };
let tcf: ((data: { gdprApplies: boolean; cmpStatus: string; eventStatus?: string }, success: boolean) => void) | undefined;
let gpp: ((event: import("@/lib/ads/native-consent").GppEvent, success: boolean) => void) | undefined;
let consent = { ...mode };
const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };

beforeEach(() => {
  vi.resetModules(); vi.useFakeTimers(); vi.resetAllMocks();
  delete window.googlefc; delete window.__tcfapi; delete window.__gpp;
  document.querySelectorAll('script[src*="fundingchoicesmessages"]').forEach(node => node.remove());
  tcf = undefined; gpp = undefined; consent = { ...mode };
  Object.defineProperty(navigator, "globalPrivacyControl", { configurable: true, value: false });
  native.prepare.mockResolvedValue({ enabled: true, client: "ca-pub-1234567890123456", slot: "1234567890", cmpScriptUrl: "https://fundingchoicesmessages.google.com/i/pub-1234567890123456?ers=1" });
  native.request.mockResolvedValue("authorized"); native.enable.mockResolvedValue(true); native.disable.mockResolvedValue(undefined);
});
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); });
async function load(...args: [number?]) {
  const usStatus = args.length ? args[0] : 1;
  const api = await import("@/lib/ads/native-consent");
  vi.spyOn(api.nativeAdsNavigation, "reload").mockImplementation(() => {});
  await Promise.all([api.startNativeAds(), api.startNativeAds()]);
  if (!window.googlefc) return api;
  window.googlefc.getGoogleConsentModeValues = () => consent;
  window.googlefc.usstatesoptout = { getInitialUsStatesOptOutStatus: () => usStatus };
  window.__tcfapi = (_command, _version, cb) => { tcf = cb; };
  window.__gpp = (_command, cb) => { gpp = cb; };
  const queue = window.googlefc.callbackQueue as Record<string, () => void>[];
  for (const item of queue) for (const callback of Object.values(item)) callback();
  return api;
}
async function allow() {
  tcf?.({ gdprApplies: false, cmpStatus: "loaded" }, true);
  gpp?.({ eventName: "listenerRegistered", data: true, listenerId: 1, pingData: { cmpStatus: "loaded", signalStatus: "ready" } }, true);
  await flush();
}

describe("native web ad consent", () => {
  it.each(["denied", "restricted", "notDetermined"])("loads no CMP or SDK registration with ATT %s", async status => {
    native.request.mockResolvedValue(status);
    await load();
    expect(document.querySelector('script[src*="fundingchoicesmessages"]')).toBeNull();
    expect(native.enable).not.toHaveBeenCalled();
  });
  it("keeps ads off when optional settings or native preparation are unavailable", async () => {
    native.prepare.mockResolvedValue({ enabled: false });
    const api = await load();
    expect(api.getNativeAdsState().ready).toBe(false);
    expect(native.request).not.toHaveBeenCalled();
    expect(native.enable).not.toHaveBeenCalled();
  });
  it("waits for every consent source, deduplicates initialization and enables only after registration succeeds", async () => {
    const api = await load();
    expect(api.getNativeAdsState().ready).toBe(false);
    expect(native.prepare).toHaveBeenCalledTimes(1);
    expect(native.enable).not.toHaveBeenCalled();
    await allow();
    expect(native.enable).toHaveBeenCalledTimes(1);
    expect(api.getNativeAdsState().ready).toBe(true);
  });
  it.each([0, 2, 4, undefined])("denies unknown, refused or unconfigured consent-mode value %s", async value => {
    const api = await load();
    consent.adStoragePurposeConsentStatus = value as number;
    await allow();
    expect(api.getNativeAdsState().ready).toBe(false);
    expect(native.enable).not.toHaveBeenCalled();
  });
  it.each([0, 3, undefined])("denies unknown/opted-out US state status %s", async status => {
    const api = await load(status as number);
    await allow();
    expect(api.getNativeAdsState().ready).toBe(false);
  });
  it("respects GPC and failed native registration", async () => {
    const api = await load();
    Object.defineProperty(navigator, "globalPrivacyControl", { configurable: true, value: true });
    await allow();
    expect(native.enable).not.toHaveBeenCalled();
    Object.defineProperty(navigator, "globalPrivacyControl", { configurable: true, value: false });
    native.enable.mockResolvedValue(false);
    await vi.advanceTimersByTimeAsync(1000);
    expect(api.getNativeAdsState().ready).toBe(false);
  });
  it("withdraws permission on GPP change and never reuses the initial US snapshot", async () => {
    const api = await load(2);
    await allow();
    expect(api.getNativeAdsState().ready).toBe(true);
    gpp?.({ eventName: "sectionChange" }, true);
    await flush();
    expect(native.disable).toHaveBeenCalledWith(false);
    expect(api.getNativeAdsState().ready).toBe(false);
    await vi.advanceTimersByTimeAsync(2000);
    expect(native.enable).toHaveBeenCalledTimes(1);
  });
  it("does not re-enable when consent is withdrawn during native registration", async () => {
    let finish: ((enabled: boolean) => void) | undefined;
    native.enable.mockImplementation(() => new Promise<boolean>(resolve => { finish = resolve; }));
    const api = await load();
    await allow();
    tcf?.({ gdprApplies: true, cmpStatus: "loaded" }, true);
    finish?.(true);
    await flush();
    expect(api.getNativeAdsState().ready).toBe(false);
    expect(native.disable).toHaveBeenCalledWith(true);
  });
  it.each([
    { cmpStatus: "loading", signalStatus: "not ready" },
    { cmpStatus: "error", signalStatus: "ready" },
    { cmpStatus: "loaded", signalStatus: "not ready" },
    undefined,
  ])("does not confuse GPP listener registration with consent readiness: %j", async pingData => {
    const api = await load(2);
    tcf?.({ gdprApplies: false, cmpStatus: "loaded" }, true);
    gpp?.({ eventName: "listenerRegistered", data: true, listenerId: 1, pingData }, true);
    await flush();
    expect(api.getNativeAdsState().ready).toBe(false);
    expect(native.enable).not.toHaveBeenCalled();
  });
  it.each([
    { eventName: "cmpStatus", data: "error", pingData: { cmpStatus: "error", signalStatus: "ready" } },
    { eventName: "signalStatus", data: "not ready", pingData: { cmpStatus: "loaded", signalStatus: "not ready" } },
    { eventName: "error", data: "CMP failed" },
  ])("cancels in-flight native registration on GPP %j", async event => {
    let finish: ((enabled: boolean) => void) | undefined;
    native.enable.mockImplementation(() => new Promise<boolean>(resolve => { finish = resolve; }));
    const api = await load(2);
    await allow();
    gpp?.(event, true);
    finish?.(true);
    await flush();
    expect(api.getNativeAdsState().ready).toBe(false);
    expect(native.disable).toHaveBeenCalledWith(event.eventName === "signalStatus" ? false : true);
  });
  it("keeps the US change UI open until the new opt-out has been saved", async () => {
    const api = await load(2); await allow();
    gpp?.({ eventName: "signalStatus", data: "not ready", pingData: { cmpStatus: "loaded", signalStatus: "not ready", cmpDisplayStatus: "hidden" } }, true);
    await flush();
    expect(api.getNativeAdsState().ready).toBe(false);
    expect(native.disable).toHaveBeenCalledWith(false);
    expect(native.disable).not.toHaveBeenCalledWith(true);
    expect(api.nativeAdsNavigation.reload).not.toHaveBeenCalled();
    gpp?.({ eventName: "sectionChange", data: "usca", pingData: { cmpStatus: "loaded", signalStatus: "not ready", cmpDisplayStatus: "visible" } }, true);
    await flush();
    expect(api.nativeAdsNavigation.reload).not.toHaveBeenCalled();
    gpp?.({ eventName: "signalStatus", data: "ready", pingData: { cmpStatus: "loaded", signalStatus: "ready", cmpDisplayStatus: "hidden" } }, true);
    await flush();
    expect(api.nativeAdsNavigation.reload).toHaveBeenCalledTimes(1);
    expect(native.enable).toHaveBeenCalledTimes(1);
  });
  it("does not close the US change UI when an old native enable promise completes", async () => {
    let finish: ((enabled: boolean) => void) | undefined;
    native.enable.mockImplementation(() => new Promise<boolean>(resolve => { finish = resolve; }));
    const api = await load(2); await allow();
    gpp?.({ eventName: "signalStatus", data: "not ready", pingData: { cmpStatus: "loaded", signalStatus: "not ready", cmpDisplayStatus: "visible" } }, true);
    finish?.(true);
    await flush();
    expect(api.getNativeAdsState().ready).toBe(false);
    expect(native.disable).toHaveBeenCalledWith(false);
    expect(native.disable).not.toHaveBeenCalledWith(true);
    expect(api.nativeAdsNavigation.reload).not.toHaveBeenCalled();
  });
  it("keeps the EU change UI open until useractioncomplete", async () => {
    const api = await load(); await allow();
    tcf?.({ gdprApplies: true, cmpStatus: "loaded", eventStatus: "cmpuishown" }, true);
    await flush();
    expect(native.disable).toHaveBeenCalledWith(false);
    expect(api.nativeAdsNavigation.reload).not.toHaveBeenCalled();
    tcf?.({ gdprApplies: true, cmpStatus: "loaded", eventStatus: "useractioncomplete" }, true);
    await flush();
    expect(api.nativeAdsNavigation.reload).toHaveBeenCalledTimes(1);
    expect(api.getNativeAdsState().ready).toBe(false);
  });
  it("opens the EU footer settings after blocking ads without reloading the page", async () => {
    const api = await load(); await allow();
    const show = vi.fn();
    window.googlefc!.showRevocationMessage = show;
    await api.changeNativeAdsConsent();
    const queue = window.googlefc!.callbackQueue as Record<string, () => void>[];
    queue.at(-1)!.CONSENT_API_READY();
    expect(show).toHaveBeenCalledTimes(1);
    expect(native.disable).toHaveBeenCalledWith(false);
    expect(native.disable).not.toHaveBeenCalledWith(true);
    expect(api.nativeAdsNavigation.reload).not.toHaveBeenCalled();
  });
  it("allows an initially loading GPP listener only after current signals become ready", async () => {
    const api = await load(2);
    tcf?.({ gdprApplies: false, cmpStatus: "loaded" }, true);
    gpp?.({ eventName: "listenerRegistered", data: true, listenerId: 1, pingData: { cmpStatus: "loading", signalStatus: "not ready" } }, true);
    await flush();
    expect(native.enable).not.toHaveBeenCalled();
    gpp?.({ eventName: "signalStatus", data: "ready", pingData: { cmpStatus: "loaded", signalStatus: "ready" } }, true);
    await flush();
    expect(api.getNativeAdsState().ready).toBe(true);
  });
  it("requires actual TCF consent including Google vendor and personalized-ad purposes", async () => {
    const { allowsTCF, allowsConsentMode } = await import("@/lib/ads/native-consent");
    const tc = { gdprApplies: true, cmpStatus: "loaded", eventStatus: "useractioncomplete", tcString: "valid-cmp-string", vendor: { consents: { 755: true } }, purpose: { consents: { 1: true, 3: true, 4: true } } };
    expect(allowsTCF(tc, true)).toBe(true);
    expect(allowsTCF({ ...tc, vendor: { consents: { 755: false } } }, true)).toBe(false);
    expect(allowsTCF({ ...tc, gdprApplies: undefined }, true)).toBe(false);
    expect(allowsTCF({ ...tc, eventStatus: "cmpuishown" }, true)).toBe(false);
    expect(allowsTCF(tc, false)).toBe(false);
    expect(allowsConsentMode(undefined)).toBe(false);
  });
  it("withdraws on a denied consent-mode change or CMP script error", async () => {
    const api = await load(); await allow();
    consent.adUserDataPurposeConsentStatus = 2;
    await vi.advanceTimersByTimeAsync(1000);
    expect(api.getNativeAdsState().ready).toBe(false);
    expect(native.disable).toHaveBeenCalledWith(true);
    document.querySelector<HTMLScriptElement>('script[src*="fundingchoicesmessages"]')?.dispatchEvent(new Event("error"));
    await flush();
    expect(api.getNativeAdsState().ready).toBe(false);
  });
});
