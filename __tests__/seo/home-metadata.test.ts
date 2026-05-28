import { describe, expect, it } from "vitest";

import { metadata } from "@/app/page";

/**
 * Home SERP-snippet quality (致命傷⑦).
 *
 * Google was overriding the homepage meta description and synthesising a snippet
 * from the rendered body, pulling the HeroAiDemo widget text
 * (「サンプル. AI 解説デモ. Q: 公開鍵暗号…」) into the SERP. The demo now carries
 * data-nosnippet (see HeroAiDemo) and this locks the description to a clean,
 * snippet-budget value that never contains the demo wording.
 */
describe("home metadata — SERP snippet quality", () => {
  const desc = String(metadata.description ?? "");
  const og = String(metadata.openGraph?.description ?? "");
  const tw = String(
    (metadata.twitter as { description?: string } | undefined)?.description ?? "",
  );

  it("sets an explicit, non-trivial description", () => {
    expect(desc.length).toBeGreaterThan(60);
  });

  it("never contains the demo-widget wording", () => {
    for (const bad of ["サンプル", "デモ", "AI 解説デモ", "公開鍵暗号", "Q:"]) {
      expect(desc.includes(bad), `description must not contain "${bad}"`).toBe(false);
    }
  });

  it("stays within the snippet budget (<=158 full-width chars)", () => {
    expect(desc.length).toBeLessThanOrEqual(158);
  });

  it("leads with the core value proposition (free + AI explanation)", () => {
    expect(desc).toMatch(/無料/);
    expect(desc).toMatch(/AI/);
  });

  it("syncs og:description and twitter:description with the meta description", () => {
    expect(og).toBe(desc);
    expect(tw).toBe(desc);
  });

  it("does not hardcode a question count (uses the SSOT label)", () => {
    // Guard against reintroducing a literal that would drift from the SSOT.
    for (const bad of ["12,652", "14,402", "2,398"]) {
      expect(desc.includes(bad)).toBe(false);
    }
  });
});
