import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
const m=vi.hoisted(()=>({native:true,path:"/billing/terms"}));
vi.mock("next/navigation",()=>({usePathname:()=>m.path}));
vi.mock("@/mobile/shared/contracts",()=>({nativeClient:()=>m.native}));
vi.mock("@/mobile/src/NativeTools",()=>({NativeTools:()=> <p>native membership</p>}));
import {NativePurchaseBoundary} from "@/mobile/src/NativePurchaseBoundary";
afterEach(()=>{cleanup();m.native=true;m.path="/billing/terms";});
it("shows App Store terms and refund help in the native app",()=>{
  render(<NativePurchaseBoundary>web checkout</NativePurchaseBoundary>);
  expect(screen.getByRole("heading")).toHaveTextContent("App Store");
  expect(screen.getByRole("link",{name:"Appleの返金申請方法"})).toHaveAttribute("href","https://support.apple.com/118223");
  expect(screen.queryByText("native membership")).toBeNull();
});
it("continues to replace native web checkout",()=>{
  m.path="/billing/start";render(<NativePurchaseBoundary>web checkout</NativePurchaseBoundary>);
  expect(screen.getByText("native membership")).toBeVisible();expect(screen.queryByText("web checkout")).toBeNull();
});
it("preserves the web terms page outside the native app",()=>{
  m.native=false;render(<NativePurchaseBoundary>web terms</NativePurchaseBoundary>);
  expect(screen.getByText("web terms")).toBeVisible();
});
