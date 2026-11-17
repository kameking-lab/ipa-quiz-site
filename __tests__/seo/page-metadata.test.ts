import { describe, expect, it } from "vitest";
import { withCanonicalSocialMetadata } from "@/lib/seo/page-metadata";

describe("canonical social metadata", () => {
  it("uses a question's own title, description and canonical instead of the home card", () => {
    const result = withCanonicalSocialMetadata({ title: "電験一種 2025年度 問3", description: "公式原問と解説", alternates: { canonical: "/denken1/2025-primary/machine/q3" } });
    expect(result.openGraph).toMatchObject({ title: result.title, description: result.description, url: result.alternates?.canonical, siteName: "過去問AI" });
    expect(result.openGraph).toHaveProperty("images");
    expect(result.twitter).toMatchObject({ title: result.title, description: result.description, card: "summary_large_image" });
  });

  it("retains indexability, alternate links and an existing dedicated image", () => {
    const result = withCanonicalSocialMetadata({ title: "FP実技", description: "実技問題", alternates: { canonical: "/fp2/practical", types: { "application/rss+xml": "/feed.xml" } }, robots: { index: false, follow: true }, openGraph: { images: ["/custom.png"] }, twitter: { images: ["/twitter.png"] } });
    expect(result.robots).toEqual({ index: false, follow: true });
    expect(result.alternates?.types).toEqual({ "application/rss+xml": "/feed.xml" });
    expect(result.openGraph).toHaveProperty("images", ["/custom.png"]);
    expect(result.twitter).toHaveProperty("images", ["/twitter.png"]);
  });

  it("does not give an unavailable page a fabricated canonical card", () => {
    const missing = { title: "問題が見つかりません", robots: { index: false } };
    expect(withCanonicalSocialMetadata(missing)).toBe(missing);
  });
});
