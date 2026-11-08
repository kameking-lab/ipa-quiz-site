/** Web-wide strict content policy (SSR question pages, AI routes, public GETs).
 * Client headers never disable this policy.
 *
 * Deliberately independent of MOBILE_IAP_ENABLED: turning on the iOS
 * RevenueCat path must not change web behavior. With this flag off, web and
 * the iOS app share the same model: anonymous guest 10/day, feedback +10 once
 * (login only for the feedback step), then paid web plan or App Store
 * subscription. Turning this on is a separate product decision (SEO impact,
 * login required before the first question). */
export function strictContentGateEnabled(env: Readonly<Record<string,string|undefined>> = process.env) {
  return env.WEB_STRICT_CONTENT_GATE === "true";
}
