import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HomeHeroImage } from "@/components/home/landing/HomeHeroImage";
import { DEFAULT_HERO } from "@/components/home/landing/heroVariants";

// Independent review uses the real installed Next Image, not the worker mock.
describe("hero installed Next SSR contract", () => {
  it("preloads only the default asset with fixed size and matching alt", () => {
    const html = renderToStaticMarkup(<HomeHeroImage />);
    const root = document.createElement("div");
    root.innerHTML = html;
    const imgs = root.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("src")).toBe(DEFAULT_HERO.src);
    expect(imgs[0].getAttribute("alt")).toBe(DEFAULT_HERO.alt);
    expect(imgs[0].getAttribute("width")).toBe("1402");
    expect(imgs[0].getAttribute("height")).toBe("1122");
    const preloads = root.querySelectorAll('link[rel="preload"][as="image"]');
    expect(preloads).toHaveLength(1);
    expect(preloads[0].getAttribute("href")).toBe(DEFAULT_HERO.src);
    expect(html).not.toContain("hero-variants/");
  });
});
