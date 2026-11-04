/** Enabling the iOS service enables ONE content policy for web, SSR and APIs.
 * Client headers never disable this policy. Dormant web deployments keep their
 * established public SEO behavior until the mobile service is activated. */
export function strictContentGateEnabled(env: Readonly<Record<string,string|undefined>> = process.env) {
  return env.MOBILE_IAP_ENABLED === "true";
}
