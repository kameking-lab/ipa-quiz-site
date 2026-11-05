const ORIGIN="https://www.kakomon-ai.jp";
/** Existing-customer management is independent from the native purchase boundary. */
export function blocksNativeWebPurchase(url: URL) {
  return url.origin===ORIGIN && /^\/api\/billing\/(checkout|mock)$/.test(url.pathname);
}
