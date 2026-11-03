import { describe, expect, it } from "vitest";

import { metadata } from "@/app/ipa/page";

function brandCount(value: unknown): number {
  return (String(value ?? "").match(/過去問AI/g) ?? []).length;
}

describe("/ipa metadata title branding", () => {
  it("keeps the page title and social titles to one brand mention", () => {
    expect(brandCount(metadata.title)).toBe(0);
    expect(brandCount(metadata.openGraph?.title)).toBe(1);
    expect(brandCount(metadata.twitter?.title)).toBe(1);
  });
});
