import { describe, expect, it } from "vitest";
import { billingConfig, billingWebhookConfig, checkoutReady, gateReady } from "@/lib/billing/config";
import { liveEnv } from "./live-fixture";

const hostname = "ipa-quiz-site-abc123def-kameking-labs-projects.vercel.app";
function previewEnv(): Record<string, string | undefined> {
  return { ...liveEnv(), VERCEL_ENV: "preview", BILLING_MODE: "stripe-test", BILLING_WEBHOOK_MODE: "stripe-test",
    BILLING_PREVIEW_TEST_ENABLED: "true", BILLING_ORIGIN: undefined,
    VERCEL_PROJECT_ID: "prj_t0YGXuTY62TNajIJg2v6W68TciT1", VERCEL_URL: hostname };
}

describe("server-only Preview deployment origin", () => {
  it("derives fixed https only from the expected project's deployment hostname", () => {
    const config = billingConfig(previewEnv());
    expect(config.mode).toBe("stripe-test"); expect(config.origin).toBe(`https://${hostname}`);
    expect(checkoutReady(config)).toBe(true);
    expect(new URL("/billing/success", config.origin).origin).toBe(`https://${hostname}`);
  });
  it.each([
    ["missing", undefined], ["empty", ""], ["https scheme", `https://${hostname}`], ["http scheme", `http://${hostname}`],
    ["protocol relative", `//${hostname}`], ["userinfo", `user@${hostname}`], ["password", `user:pass@${hostname}`],
    ["default port", `${hostname}:443`], ["other port", `${hostname}:3000`], ["path", `${hostname}/billing`],
    ["slash", `${hostname}/`], ["query", `${hostname}?x=1`], ["fragment", `${hostname}#x`],
    ["trailing dot", `${hostname}.`], ["leading whitespace", ` ${hostname}`], ["trailing whitespace", `${hostname} `],
    ["newline", `${hostname}\n`], ["CRLF", `${hostname}\r\n`], ["tab", `${hostname}\t`],
    ["Unicode", hostname.replace("ipa", "\u0456pa")], ["Unicode dot", hostname.replace(".app", "\u3002app")],
    ["uppercase", hostname.toUpperCase()], ["encoded character", hostname.replace("ipa", "%69pa")],
    ["backslash", `${hostname}\\evil`], ["suffix", `${hostname}.evil.invalid`],
    ["similar suffix", hostname.replace(".vercel.app", ".vercel-app")],
    ["different project", hostname.replace("ipa-quiz-site", "other-project")],
    ["similar project", hostname.replace("ipa-quiz-site", "ipa-quiz-site-evil")],
    ["different team", hostname.replace("kameking-labs-projects", "other-team")],
    ["similar team", hostname.replace("kameking-labs-projects", "kameking-labs-projects-evil")],
    ["production alias", "ipa-quiz-site.vercel.app"], ["team alias", "ipa-quiz-site-kameking-labs-projects.vercel.app"],
    ["branch alias", "ipa-quiz-site-git-main-kameking-labs-projects.vercel.app"],
    ["short deployment id", hostname.replace("abc123def", "abc123de")],
    ["long deployment id", hostname.replace("abc123def", "abc123def0")],
    ["custom domain", "quiz.example.invalid"], ["localhost", "localhost"], ["IP", "127.0.0.1"],
  ])("rejects %s without URL normalization or production-domain fallback", (_name, value) => {
    expect(() => billingConfig({ ...previewEnv(), VERCEL_URL: value,
      VERCEL_PROJECT_PRODUCTION_URL: hostname })).toThrow("Invalid Preview billing origin metadata");
  });
  it.each([undefined, "", "prj_other", "prj_t0YGXuTY62TNajIJg2v6W68TciT1 "])("rejects missing or conflicting project ID %s", id => {
    expect(() => billingConfig({ ...previewEnv(), VERCEL_PROJECT_ID: id })).toThrow("Invalid Preview billing origin metadata");
  });
  it("keeps explicit origins authoritative and independent of unused platform metadata", () => {
    expect(billingConfig({ ...previewEnv(), BILLING_ORIGIN: "https://approved.example.invalid",
      VERCEL_URL: "invalid", VERCEL_PROJECT_ID: undefined }).origin).toBe("https://approved.example.invalid");
  });
  it("does not substitute request-like values or a production hostname for missing deployment metadata", () => {
    expect(() => billingConfig({ ...previewEnv(), VERCEL_URL: undefined,
      HOST: hostname, X_FORWARDED_HOST: hostname, VERCEL_PROJECT_PRODUCTION_URL: hostname })).toThrow("Invalid Preview billing origin metadata");
  });
  it.each(["", "invalid", `https://${hostname}/`, `https://${hostname}?x=1`, `https://user@${hostname}`])("never falls back from invalid explicit origin %s", origin => {
    expect(() => billingConfig({ ...previewEnv(), BILLING_ORIGIN: origin })).toThrow();
  });
  it.each([
    { VERCEL: undefined }, { VERCEL: "0" }, { VERCEL_ENV: undefined }, { VERCEL_ENV: "production" },
    { VERCEL_ENV: "unknown" }, { BILLING_PREVIEW_TEST_ENABLED: undefined }, { BILLING_PREVIEW_TEST_ENABLED: "false" },
    { BILLING_MODE: "stripe-live" }, { BILLING_MODE: "mock" },
  ])("cannot bypass a disabled realm with valid deployment metadata: %j", patch => {
    expect(billingConfig({ ...previewEnv(), ...patch }).mode).toBe("off");
  });
  it("never derives live/Production origin, and preserves the local development default", () => {
    const metadata = { VERCEL_URL: hostname, VERCEL_PROJECT_ID: previewEnv().VERCEL_PROJECT_ID };
    expect(billingConfig({ ...liveEnv(), ...metadata, BILLING_ORIGIN: undefined }).mode).toBe("off");
    expect(billingConfig({ ...liveEnv(), ...metadata }).origin).toBe(liveEnv().BILLING_ORIGIN);
    for (const mode of ["mock", "stripe-test"] as const) {
      expect(billingConfig({ NODE_ENV: "development", BILLING_MODE: mode, ...metadata }).origin).toBe("http://localhost:3328");
    }
  });
  it("OFF ignores malformed or absent origin metadata and retains the existing webhook-only boundary", () => {
    const env = { ...previewEnv(), BILLING_MODE: "off", VERCEL_URL: "bad", VERCEL_PROJECT_ID: undefined,
      BILLING_ORIGIN: "bad", BILLING_PRICE_YEN: "bad" };
    const config = billingConfig(env);
    expect(config.mode).toBe("off"); expect(gateReady(config)).toBe(false);
    expect(billingWebhookConfig(env).mode).toBe("stripe-test");
    expect(checkoutReady(billingWebhookConfig(env))).toBe(false);
  });
  it("does not turn a derived URL into seller, notice or legal approval", () => {
    for (const patch of [{ BILLING_SELLER_ADDRESS: "" }, { BILLING_REFUND_TERMS: "" }, { BILLING_NOTICE_AT: undefined },
      { BILLING_TRANSITION_STARTS_AT: undefined }, { BILLING_LEGAL_REVIEWED: "false" }]) {
      expect(checkoutReady(billingConfig({ ...previewEnv(), ...patch }))).toBe(false);
    }
  });
});
