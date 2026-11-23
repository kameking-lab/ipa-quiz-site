import {afterEach,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
const opened=vi.hoisted(()=>vi.fn());
vi.mock("next/navigation",()=>({useRouter:()=>({push:vi.fn()})}));
vi.mock("@/mobile/shared/contracts",()=>({nativeClient:()=>true}));
vi.mock("@/mobile/src/open-subscription-management",()=>({openSubscriptionManagement:opened}));
import DeleteAccountPage from "@/app/account/delete/page";
import {ManageSubscriptionButton} from "@/app/billing/ManageSubscriptionButton";
import {blocksNativeWebPurchase} from "@/mobile/shared/native-billing-policy";
afterEach(()=>{cleanup();vi.unstubAllGlobals();vi.clearAllMocks();});
it("allows existing management while blocking web checkout in the native interceptor",()=>{
  for(const path of ["checkout","mock"])expect(blocksNativeWebPurchase(new URL(`https://www.kakomon-ai.jp/api/billing/${path}`))).toBe(true);
  expect(blocksNativeWebPurchase(new URL("https://www.kakomon-ai.jp/api/billing/portal"))).toBe(false);
});
it("opens an existing authenticated web contract directly instead of native billing replacement",async()=>{
  const request=vi.fn(async()=>Response.json({url:"https://billing.stripe.com/p/session_mock"}));vi.stubGlobal("fetch",request);
  render(<ManageSubscriptionButton label="ウェブ契約の管理・解約"/>);
  fireEvent.click(screen.getByRole("button",{name:"ウェブ契約の管理・解約"}));
  await waitFor(()=>expect(opened).toHaveBeenCalledWith("https://billing.stripe.com/p/session_mock"));
  expect(request).toHaveBeenCalledWith("/api/billing/portal",expect.objectContaining({method:"POST",body:"{}"}));
});
it("rejects purchase destinations and leaves account deletion available after management fails",async()=>{
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({url:"https://checkout.stripe.com/buy_mock"})));
  render(<DeleteAccountPage/>);fireEvent.click(screen.getByRole("button",{name:"ウェブ契約の管理・解約"}));
  await screen.findByRole("alert");expect(opened).not.toHaveBeenCalled();
  fireEvent.change(screen.getByRole("textbox"),{target:{value:"DELETE"}});
  expect(screen.getByRole("button",{name:"アカウントとデータを完全に削除"})).toBeEnabled();
});
