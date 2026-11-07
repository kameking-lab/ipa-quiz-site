import { createElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppStorePromo } from "@/components/app-store/AppStorePromo";
import { APP_STORE, appStoreItunesMetadata } from "@/lib/app-store";

vi.mock("next/image", () => ({ default: ({ src, alt }: { src: string; alt: string }) => createElement("img", { src, alt }) }));

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  delete (window as unknown as { Capacitor?: unknown }).Capacitor;
});

describe("App Store promo", () => {
  it("points at the 過去問AI App Store page", () => {
    expect(APP_STORE.appId).toBe("6830358918");
    expect(APP_STORE.url).toBe("https://apps.apple.com/jp/app/id6830358918");
  });

  it("is absent (and no Smart App Banner) while the flag is off — the default", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_STORE_LIVE", "");
    const { container } = render(<><AppStorePromo variant="card" /><AppStorePromo variant="footer" /></>);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("link")).toBeNull();
    expect(appStoreItunesMetadata()).toBeUndefined();
  });

  it("renders the card and footer line for web visitors when live", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_STORE_LIVE", "true");
    render(<><AppStorePromo variant="card" /><AppStorePromo variant="footer" /></>);
    const card = screen.getByTestId("app-store-promo-card");
    expect(card).toHaveAttribute("href", APP_STORE.url);
    expect(card).toHaveTextContent("iPhoneアプリでも使えます");
    expect(card).toHaveTextContent("App Storeでダウンロード");
    const footerLink = screen.getByRole("link", { name: "過去問AIはiPhoneアプリでも使えます — App Storeでダウンロード" });
    expect(footerLink).toHaveAttribute("href", APP_STORE.url);
    // The chihuahua avatar is decorative.
    for (const img of document.querySelectorAll("img")) expect(img).toHaveAttribute("alt", "");
    expect(appStoreItunesMetadata()).toEqual({ appId: "6830358918" });
  });

  it("stays hidden inside the iOS app (Capacitor native platform)", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_STORE_LIVE", "true");
    (window as unknown as { Capacitor: { isNativePlatform: () => boolean } }).Capacitor = { isNativePlatform: () => true };
    const { container } = render(<><AppStorePromo variant="card" /><AppStorePromo variant="footer" /></>);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not render on the server, so the iOS app never flashes it before hydration", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_STORE_LIVE", "true");
    const { renderToString } = await import("react-dom/server");
    expect(renderToString(<AppStorePromo variant="card" />)).toBe("");
  });
});
