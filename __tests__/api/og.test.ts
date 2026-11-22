// @vitest-environment node
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import sharp from "sharp";

vi.mock("node:fs/promises", { spy: true });

beforeEach(() => {
  vi.resetModules();
  // The built-in renderer downloads emoji SVGs. Supply an SVG locally in unit
  // tests so the PNG assertion does not depend on that CDN.
  const fetch = globalThis.fetch;
  vi.stubGlobal("fetch", vi.fn(async (...args: Parameters<typeof fetch>) => {
    if (!String(args[0]).startsWith("https://cdn.jsdelivr.net/gh/twitter/twemoji@")) return fetch(...args);
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="white"/></svg>',
      { headers: { "Content-Type": "image/svg+xml" } },
    );
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const request = new Request("http://localhost/api/og?" + new URLSearchParams({
  type: "question", title: "調理師の過去問", body: "食品衛生学",
}));

it("renders a 1200×630 PNG with the local Japanese WOFF", async () => {
  const { GET } = await import("@/app/api/og/route");
  const response = await GET(request);
  const png = Buffer.from(await response.arrayBuffer());
  expect(response.status).toBe(200);
  expect(response.headers.get("Content-Type")).toBe("image/png");
  expect(response.headers.get("Cache-Control")).toContain("immutable");
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  expect(png.equals(readFileSync("app/api/og/default.png"))).toBe(false);
});

it("paints the qualification's WebP artwork into the achievement PNG", async () => {
  const art = await sharp({ create: { width: 80, height: 100, channels: 3, background: "#d01070" } })
    .webp({ lossless: true }).toBuffer();
  vi.mocked(readFile)
    .mockResolvedValueOnce(readFileSync("public/fonts/noto-sans-jp-700.woff"))
    .mockResolvedValueOnce(art);
  const { GET } = await import("@/app/api/og/route");
  const response = await GET(new Request("http://localhost/api/og?type=study-card&exam=ip&card=streak&mastered=120&total=233&streak=7"));
  expect(response.status).toBe(200);
  const rgb = await sharp(Buffer.from(await response.arrayBuffer())).extract({ left: 950, top: 315, width: 1, height: 1 })
    .removeAlpha().raw().toBuffer();
  expect([...rgb]).toEqual([208, 16, 112]);
  expect(vi.mocked(readFile).mock.calls[1][0]).toMatch(/ip-study\.webp$/);
});

it.each(["unreadable", "unsupported"] as const)("returns a cacheable default PNG when the font is %s", async (mode) => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  if (mode === "unreadable") {
    vi.mocked(readFile).mockRejectedValueOnce(new Error("missing font"));
  } else {
    vi.mocked(readFile).mockResolvedValueOnce(readFileSync("public/fonts/noto-serif-jp-display.woff2"));
  }
  const { GET } = await import("@/app/api/og/route");
  const response = await GET(request);
  expect(response.status).toBe(200);
  expect(response.headers.get("Content-Type")).toBe("image/png");
  expect(response.headers.get("Cache-Control")).toBe("public, no-transform, max-age=300, s-maxage=3600");
  expect(Buffer.from(await response.arrayBuffer()).equals(readFileSync("app/api/og/default.png"))).toBe(true);
  expect(error).toHaveBeenCalledOnce();
});
