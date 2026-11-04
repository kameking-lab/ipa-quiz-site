// @vitest-environment node
import { expect, it, vi } from "vitest";
import Nodemailer from "next-auth/providers/nodemailer";

it("Auth.js' existing email provider can compose with patched Nodemailer without SMTP", async () => {
  const fetch = vi.fn(() => { throw new Error("Unexpected network call"); });
  vi.stubGlobal("fetch", fetch);
  try {
    const provider = Nodemailer({ server: { jsonTransport: true }, from: "no-reply@example.invalid" });
    await expect(provider.sendVerificationRequest({
      identifier: "learner@example.invalid", url: "https://example.invalid/api/auth/callback/nodemailer?token=synthetic",
      expires: new Date(Date.now() + 60000), token: "synthetic", theme: {},
      provider: { ...provider, ...provider.options }, request: new Request("https://example.invalid/auth/signin"),
    })).resolves.toBeUndefined();
    expect(fetch).not.toHaveBeenCalled();
  } finally { vi.unstubAllGlobals(); }
});
