import { createElement, StrictMode } from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HomeHeroImage } from "@/components/home/landing/HomeHeroImage";
import { DEFAULT_HERO, HERO_VARIANTS, selectHeroVariant } from "@/components/home/landing/heroVariants";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => createElement("img", { src, alt }),
  getImageProps: ({ src, alt, sizes }: { src: string; alt: string; sizes?: string }) => ({ props: { src, alt, sizes, srcSet: `${src} 640w` } }),
}));

class LoadingImage {
  static instances: LoadingImage[] = [];
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src = "";
  srcset = "";
  sizes = "";
  decode = vi.fn(() => Promise.resolve());
  constructor() { LoadingImage.instances.push(this); }
}

beforeEach(() => {
  LoadingImage.instances = [];
  vi.stubGlobal("Image", LoadingImage);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("home hero image", () => {
  it("maps every equal random interval to a distinct, described image", () => {
    expect(HERO_VARIANTS).toHaveLength(10);
    expect(new Set(HERO_VARIANTS.map(v => v.src)).size).toBe(10);
    HERO_VARIANTS.forEach((variant, i) => {
      expect(selectHeroVariant(i / 10)).toBe(variant);
      expect(selectHeroVariant((i + 0.999) / 10)).toBe(variant);
      expect(variant.alt.length).toBeGreaterThan(0);
    });
  });

  it("renders 09 on the server and hydrates without a mismatch", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.8);
    const markup = renderToString(<HomeHeroImage />);
    expect(markup).toContain(DEFAULT_HERO.src);
    const container = document.createElement("div");
    document.body.appendChild(container);
    container.innerHTML = markup;
    const onRecoverableError = vi.fn();
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(container, <HomeHeroImage />, { onRecoverableError }); });
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.querySelector("img")?.getAttribute("src")).toBe(DEFAULT_HERO.src);
    expect(LoadingImage.instances).toHaveLength(0);
    await act(async () => root.unmount());
    container.remove();
  });

  it("loads only the selected image, then changes source and alt together after decoding", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.01);
    render(<HomeHeroImage />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", DEFAULT_HERO.src);
    expect(LoadingImage.instances).toHaveLength(1);
    expect(LoadingImage.instances[0].src).toBe(HERO_VARIANTS[0].src);
    // Preload the same responsive candidate list as the rendered <Image>, so the
    // browser reuses the download instead of fetching the illustration twice.
    expect(LoadingImage.instances[0].srcset).toBe(`${HERO_VARIANTS[0].src} 640w`);
    expect(LoadingImage.instances[0].sizes).toBe("(max-width: 767px) 100vw, 55vw");
    await act(async () => { LoadingImage.instances[0].onload?.(); });
    expect(image).toHaveAttribute("src", HERO_VARIANTS[0].src);
    expect(image).toHaveAttribute("alt", HERO_VARIANTS[0].alt);
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("selects only once during Strict Mode effect replay", async () => {
    const random = vi.spyOn(Math, "random").mockReturnValue(0.01);
    render(<StrictMode><HomeHeroImage /></StrictMode>);
    expect(random).toHaveBeenCalledTimes(1);
    expect(LoadingImage.instances.every(image => image.src === HERO_VARIANTS[0].src)).toBe(true);
    await act(async () => { LoadingImage.instances.at(-1)?.onload?.(); });
    expect(screen.getByRole("img")).toHaveAttribute("src", HERO_VARIANTS[0].src);
  });

  it("retains the default when loading fails", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.01);
    render(<HomeHeroImage />);
    LoadingImage.instances[0].onerror?.();
    expect(screen.getByRole("img")).toHaveAttribute("src", DEFAULT_HERO.src);
    expect(screen.getByRole("img")).toHaveAttribute("alt", DEFAULT_HERO.alt);
  });

  it("retains the default on decode failure and ignores late completion after unmount", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.01);
    const { unmount } = render(<HomeHeroImage />);
    const pending = LoadingImage.instances[0];
    pending.decode.mockRejectedValueOnce(new Error("decode failed"));
    await act(async () => { pending.onload?.(); });
    expect(screen.getByRole("img")).toHaveAttribute("src", DEFAULT_HERO.src);
    const handler = pending.onload;
    unmount();
    expect(pending.onload).toBeNull();
    await act(async () => { handler?.(); });
    expect(document.querySelector("img")).toBeNull();
  });
});
