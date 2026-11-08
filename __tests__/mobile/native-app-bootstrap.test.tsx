import { readFileSync } from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const m = vi.hoisted(() => ({ native: false, pathname: "/q/ip/2024-cbt/am/q1" }));
vi.mock("@/mobile/shared/contracts", () => ({ nativeClient: () => m.native }));
vi.mock("next/navigation", () => ({ usePathname: () => m.pathname }));
vi.mock("@/mobile/src/NativeTools", () => ({ NativeTools: () => <aside>native tools</aside> }));

import { NATIVE_APP_BOOTSTRAP_SCRIPT } from "@/lib/native-app-bootstrap";
import { NativeAppHost } from "@/components/NativeAppHost";

type CapWindow = Window & { Capacitor?: unknown };
afterEach(() => { document.documentElement.className = ""; delete (window as CapWindow).Capacitor; m.native = false; m.pathname = "/q/ip/2024-cbt/am/q1"; });

describe("NATIVE_APP_BOOTSTRAP_SCRIPT", () => {
  it("marks <html> as the app before paint when the Capacitor bridge is present", () => {
    (window as CapWindow).Capacitor = { isNativePlatform: () => true };
    new Function(NATIVE_APP_BOOTSTRAP_SCRIPT)();
    expect(document.documentElement.classList.contains("native-app")).toBe(true);
  });
  it("leaves ordinary browsers alone, including a broken bridge", () => {
    new Function(NATIVE_APP_BOOTSTRAP_SCRIPT)();
    (window as CapWindow).Capacitor = { isNativePlatform: () => { throw new Error("x"); } };
    new Function(NATIVE_APP_BOOTSTRAP_SCRIPT)();
    (window as CapWindow).Capacitor = { isNativePlatform: () => false };
    new Function(NATIVE_APP_BOOTSTRAP_SCRIPT)();
    expect(document.documentElement.classList.contains("native-app")).toBe(false);
  });
  it("is rendered in the root layout's <head>", () => {
    const layout = readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf8");
    const head = layout.slice(layout.indexOf("<head>"), layout.indexOf("</head>"));
    expect(head).toContain("NATIVE_APP_BOOTSTRAP_SCRIPT");
  });
});

describe("NativeAppHost placeholder", () => {
  it("reserves the native bar's first row until the tools load", async () => {
    m.native = true;
    const { container, findByText } = render(<NativeAppHost />);
    expect(container.querySelector(".native-tools-placeholder")).not.toBeNull();
    await findByText("native tools");
    expect(container.querySelector(".native-tools-placeholder")).toBeNull();
  });
  it("reserves nothing on /billing, where the tools are not shown", () => {
    m.pathname = "/billing";
    const { container } = render(<NativeAppHost />);
    expect(container.innerHTML).toBe("");
  });
  it("is hidden for web visitors and sized only inside the app", () => {
    const css = readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toMatch(/\.native-tools-placeholder\s*\{\s*display:\s*none;/);
    expect(css).toMatch(/html\.native-app \.native-tools-placeholder\s*\{[^}]*height:/);
  });
});
