import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

function directive(csp: string, name: string): string[] {
  const value = csp
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name} `));
  return value?.split(/\s+/).slice(1) ?? [];
}

describe("AdSense Content Security Policy", () => {
  it("allows the host-specific AdSense resource chain without a blanket HTTPS source", async () => {
    const headers = await nextConfig.headers!();
    const catchAll = headers.find((entry) => entry.source === "/(.*)");
    const csp = catchAll?.headers.find(
      (header) => header.key === "Content-Security-Policy",
    )?.value;

    expect(csp).toBeDefined();

    const required: Record<string, string[]> = {
      "script-src": [
        "https://pagead2.googlesyndication.com",
        "https://ep2.adtrafficquality.google",
      ],
      "connect-src": [
        "https://pagead2.googlesyndication.com",
        "https://googleads.g.doubleclick.net",
        "https://ep1.adtrafficquality.google",
        "https://ep2.adtrafficquality.google",
      ],
      "frame-src": [
        "https://googleads.g.doubleclick.net",
        "https://ep2.adtrafficquality.google",
        "https://www.google.com",
      ],
      "img-src": [
        "https://pagead2.googlesyndication.com",
        "https://googleads.g.doubleclick.net",
        "https://ep1.adtrafficquality.google",
        "https://ep2.adtrafficquality.google",
      ],
    };

    for (const [name, sources] of Object.entries(required)) {
      const actual = directive(csp!, name);
      expect(actual, `${name} must remain host-scoped`).not.toContain("https:");
      expect(actual).toEqual(expect.arrayContaining(sources));
    }
  });
});
