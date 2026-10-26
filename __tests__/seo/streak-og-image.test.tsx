// @vitest-environment node
import { isValidElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const captured = vi.hoisted(() => ({ element: undefined as unknown }));

vi.mock("next/og", async () => {
  const actual = await vi.importActual<typeof import("next/og")>("next/og");
  return {
    ...actual,
    ImageResponse: class extends actual.ImageResponse {
      constructor(...args: ConstructorParameters<typeof actual.ImageResponse>) {
        captured.element = args[0];
        super(...args);
      }
    },
  };
});

import StreakOgImage from "@/app/og/streak/[days]/opengraph-image";

function textIn(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textIn).join("");
  if (isValidElement<{ children?: unknown }>(node)) return textIn(node.props.children);
  return "";
}

beforeEach(() => {
  // Satori may request a missing Japanese font. Keep rendering entirely local;
  // this checks PNG generation/layout, not the external font service or glyphs.
  vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request) => {
    const url = String(input instanceof Request ? input.url : input);
    // The celebratory emoji is an external image, unlike text font fallback.
    // A local SVG fixture allows layout/rasterization without contacting a CDN.
    if (url.startsWith("https://cdn.jsdelivr.net/") && url.includes("/twemoji")) {
      return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="orange"/></svg>', {
        headers: { "Content-Type": "image/svg+xml" },
      });
    }
    throw new Error("No network in OG test");
  }));
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("streak OG images", () => {
  it.each([
    ["7", "7"],
    ["30", "30"],
    ["100", "100"],
    ["999", "7"],
  ])("renders a PNG for promised day %s with the expected %s-day label", async (days, expected) => {
    const response = await StreakOgImage({ params: Promise.resolve({ days }) });
    const bytes = Buffer.from(await response.arrayBuffer());

    expect(response.headers.get("content-type")).toBe("image/png");
    expect(bytes.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
    expect(textIn(captured.element)).toContain(`${expected}日達成`);
  });
});
