import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
const m=vi.hoisted(()=>({signIn:vi.fn()}));
vi.mock("next-auth/react",()=>({signIn:m.signIn}));
vi.mock("@/lib/analytics/events",()=>({trackEvent:vi.fn()}));
vi.mock("@/mobile/shared/contracts",()=>({nativeClient:()=>false}));
import {SignInButtons} from "@/app/auth/signin/SignInButtons";
afterEach(()=>{cleanup();vi.clearAllMocks();});
it("asks the provider to authenticate again without stamping a new session time locally",()=>{
  render(<SignInButtons hasApple hasGoogle={false} hasGitHub={false} reauthenticate callbackUrl="/account/delete" />);
  fireEvent.click(screen.getByRole("button",{name:"Appleでサインイン"}));
  expect(m.signIn).toHaveBeenCalledWith("apple",{callbackUrl:"/account/delete"},{prompt:"login",max_age:"0"});
});
