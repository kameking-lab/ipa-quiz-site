import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AppStorePromo } from "@/components/app-store/AppStorePromo";
import { APP_STORE, appStoreItunesMetadata } from "@/lib/app-store";

afterEach(() => {
  cleanup();
  delete (window as unknown as { Capacitor?: unknown }).Capacitor;
});

describe("App Store promo", () => {
  it("enables the Smart App Banner for the 過去問AI App Store page", () => {
    expect(APP_STORE.url).toBe("https://apps.apple.com/jp/app/id6830358918");
    expect(appStoreItunesMetadata()).toEqual({ appId: "6830358918" });
  });

  it("renders one accessible official badge for web visitors", () => {
    render(<AppStorePromo />);
    const link = screen.getByRole("link", { name: "過去問AIをApp Storeでダウンロード" });
    expect(link).toHaveAttribute("href", APP_STORE.url);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    const badge = screen.getByRole("img");
    expect(badge).toHaveAttribute("src", "/brand/download-on-the-app-store-ja.svg");
    expect(badge).toHaveAttribute("height", "40");
    expect(link).toHaveClass("p-2.5");
  });

  it("stays hidden inside the iOS app", () => {
    (window as unknown as { Capacitor: { isNativePlatform: () => boolean } }).Capacitor = { isNativePlatform: () => true };
    const { container } = render(<AppStorePromo />);
    expect(container).toBeEmptyDOMElement();
  });

  it("still appears when the Capacitor bridge reports a web platform", () => {
    (window as unknown as { Capacitor: { isNativePlatform: () => boolean } }).Capacitor = { isNativePlatform: () => false };
    render(<AppStorePromo />);
    expect(screen.getByRole("link")).toHaveAttribute("href", APP_STORE.url);
  });

  it("does not flash during server rendering before native detection", async () => {
    const { renderToString } = await import("react-dom/server");
    expect(renderToString(<AppStorePromo />)).toBe("");
  });
});
