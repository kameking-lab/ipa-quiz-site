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
    const encoded = encodeURIComponent(DEFAULT_HERO.src);
    // Served through the image optimizer: resized to the viewport, not the 1402px original.
    expect(imgs[0].getAttribute("src")).toContain(`/_next/image?url=${encoded}`);
    expect(imgs[0].getAttribute("srcset")).toContain(`url=${encoded}&w=640`);
    expect(imgs[0].getAttribute("sizes")).toBe("(max-width: 767px) 100vw, 55vw");
    expect(imgs[0].getAttribute("alt")).toBe(DEFAULT_HERO.alt);
    expect(imgs[0].getAttribute("width")).toBe("1402");
    expect(imgs[0].getAttribute("height")).toBe("1122");
    const preloads = root.querySelectorAll('link[rel="preload"][as="image"]');
    expect(preloads).toHaveLength(1);
    expect(preloads[0].getAttribute("imagesrcset")).toBe(imgs[0].getAttribute("srcset"));
    expect(preloads[0].getAttribute("imagesizes")).toBe(imgs[0].getAttribute("sizes"));
    expect(html).not.toContain("hero-variants");
  });
});
