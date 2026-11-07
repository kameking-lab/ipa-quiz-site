import { describe, expect, it, vi } from "vitest";
import { GET, POST } from "@/app/api/email-list/route";

describe("retired weekly signup", () => {
  it.each([GET, POST])("returns 410 without consuming personal data or forwarding it", async handler => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    try {
      const response = handler();
      expect(response.status).toBe(410);
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(await response.json()).toMatchObject({ contact: "/contact" });
      expect(fetch).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
