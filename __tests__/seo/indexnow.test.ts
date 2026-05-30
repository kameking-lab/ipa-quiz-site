import { describe, it, expect, afterEach, vi } from "vitest";
import {
  getIndexNowKey,
  getIndexNowKeyFileContent,
  pingIndexNow,
} from "@/lib/seo/indexnow";
import { SITE_BASE_URL } from "@/lib/seo/config";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("getIndexNowKey", () => {
  it("returns null when the env var is unset", () => {
    vi.stubEnv("INDEXNOW_KEY", "");
    expect(getIndexNowKey()).toBeNull();
  });

  it("accepts a valid 8-char alphanumeric key", () => {
    vi.stubEnv("INDEXNOW_KEY", "abc12345");
    expect(getIndexNowKey()).toBe("abc12345");
  });

  it("accepts uppercase and hyphens (case-insensitive)", () => {
    vi.stubEnv("INDEXNOW_KEY", "ABCD-1234-efgh");
    expect(getIndexNowKey()).toBe("ABCD-1234-efgh");
  });

  it("trims surrounding whitespace before validating", () => {
    vi.stubEnv("INDEXNOW_KEY", "  abc12345  ");
    expect(getIndexNowKey()).toBe("abc12345");
  });

  it("rejects a key shorter than 8 chars", () => {
    vi.stubEnv("INDEXNOW_KEY", "abc1234");
    expect(getIndexNowKey()).toBeNull();
  });

  it("rejects a key longer than 128 chars", () => {
    vi.stubEnv("INDEXNOW_KEY", "a".repeat(129));
    expect(getIndexNowKey()).toBeNull();
  });

  it("rejects a key with disallowed characters", () => {
    vi.stubEnv("INDEXNOW_KEY", "abc_12345"); // underscore not allowed
    expect(getIndexNowKey()).toBeNull();
    vi.stubEnv("INDEXNOW_KEY", "abc 12345"); // space not allowed
    expect(getIndexNowKey()).toBeNull();
  });
});

describe("getIndexNowKeyFileContent", () => {
  it("delegates to getIndexNowKey", () => {
    vi.stubEnv("INDEXNOW_KEY", "abc12345");
    expect(getIndexNowKeyFileContent()).toBe("abc12345");
    vi.stubEnv("INDEXNOW_KEY", "");
    expect(getIndexNowKeyFileContent()).toBeNull();
  });
});

describe("pingIndexNow (fail-soft)", () => {
  it("returns {ok:false, reason:'no-key'} without fetching when no key is set", async () => {
    vi.stubEnv("INDEXNOW_KEY", "");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const res = await pingIndexNow(["https://x/a"]);
    expect(res).toEqual({ ok: false, reason: "no-key" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns {ok:false, reason:'empty'} when the URL list is empty", async () => {
    vi.stubEnv("INDEXNOW_KEY", "abc12345");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const res = await pingIndexNow([]);
    expect(res).toEqual({ ok: false, reason: "empty" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("posts host/key/keyLocation/urlList and surfaces the response status", async () => {
    vi.stubEnv("INDEXNOW_KEY", "abc12345");
    const fetchSpy = vi.fn();
    fetchSpy.mockResolvedValue({ ok: true, status: 200 } as Response);
    vi.stubGlobal("fetch", fetchSpy);

    const res = await pingIndexNow(["https://x/a", "https://x/b"]);
    expect(res).toEqual({ ok: true, status: 200 });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    const [, init] = fetchSpy.mock.calls[0];
    const body = JSON.parse(init.body as string);
    expect(body.host).toBe(new URL(SITE_BASE_URL).host);
    expect(body.key).toBe("abc12345");
    expect(body.keyLocation).toBe(`${SITE_BASE_URL}/indexnow-key.txt`);
    expect(body.urlList).toEqual(["https://x/a", "https://x/b"]);
  });

  it("caps the URL list at 10000 entries", async () => {
    vi.stubEnv("INDEXNOW_KEY", "abc12345");
    const fetchSpy = vi.fn();
    fetchSpy.mockResolvedValue({ ok: true, status: 200 } as Response);
    vi.stubGlobal("fetch", fetchSpy);

    const urls = Array.from({ length: 10005 }, (_, i) => `https://x/${i}`);
    await pingIndexNow(urls);
    const [, init] = fetchSpy.mock.calls[0];
    const body = JSON.parse(init.body as string);
    expect(body.urlList).toHaveLength(10000);
  });

  it("returns {ok:false} with the error message when fetch throws", async () => {
    vi.stubEnv("INDEXNOW_KEY", "abc12345");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );
    const res = await pingIndexNow(["https://x/a"]);
    expect(res.ok).toBe(false);
    expect(res.reason).toBe("network down");
  });
});
