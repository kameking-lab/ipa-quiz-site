import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
const m=vi.hoisted(()=>({signIn:vi.fn(),signOut:vi.fn(async()=>({url:"/"}))}));
vi.mock("next-auth/react",()=>({signIn:m.signIn,signOut:m.signOut}));
vi.mock("@/lib/analytics/events",()=>({trackEvent:vi.fn()}));
vi.mock("@/mobile/shared/contracts",()=>({nativeClient:()=>false}));
import {SignInButtons} from "@/app/auth/signin/SignInButtons";
afterEach(()=>{cleanup();vi.clearAllMocks();});
it("starts Apple's standard authorization without undocumented parameters",()=>{
  render(<SignInButtons hasApple hasGoogle={false} hasGitHub={false} reauthenticate callbackUrl="/account/delete" />);
  fireEvent.click(screen.getByRole("button",{name:"Appleでサインイン"}));
  expect(m.signIn).toHaveBeenCalledWith("apple",{callbackUrl:"/account/delete"},undefined);
});
it.each(["google", "github"] as const)("requests the documented account picker for %s", provider => {
  render(<SignInButtons hasGoogle hasGitHub reauthenticate callbackUrl="/account/delete" />);
  fireEvent.click(screen.getByRole("button", { name: new RegExp(provider, "i") }));
  expect(m.signIn).toHaveBeenCalledWith(provider, { callbackUrl: "/account/delete" }, { prompt: "select_account" });
});
it("keeps ordinary sign-in parameters unchanged", () => {
  render(<SignInButtons hasGoogle hasGitHub={false} />);
  fireEvent.click(screen.getByRole("button", { name: /Google/ }));
  expect(m.signIn).toHaveBeenCalledWith("google", { callbackUrl: "/" }, undefined);
});
it("clears the current Auth.js session before opening the other account's provider", async () => {
  render(<SignInButtons hasGoogle hasGitHub={false} reauthenticate clearSession callbackUrl="/billing/start" />);
  fireEvent.click(screen.getByRole("button", { name: /Google/ }));
  await waitFor(() => expect(m.signIn).toHaveBeenCalledWith("google", { callbackUrl: "/billing/start" }, { prompt: "select_account" }));
  expect(m.signOut).toHaveBeenCalledWith({ redirect: false });
  expect(m.signOut).toHaveBeenCalledBefore(m.signIn);
});
