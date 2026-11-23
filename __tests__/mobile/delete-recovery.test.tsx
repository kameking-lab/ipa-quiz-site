import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
vi.mock("next/navigation",()=>({useRouter:()=>({push:vi.fn()})}));
import { AccountDeletionClient } from "@/app/account/delete/AccountDeletionClient";
afterEach(() => {cleanup();vi.unstubAllGlobals();localStorage.clear();});
it("lets the user erase this device after the successful server response was lost and a retry is unauthorized", async () => {
  localStorage.setItem("ipa-quiz:history:v1","private");
  vi.stubGlobal("fetch",vi.fn().mockRejectedValueOnce(Error("lost response")).mockResolvedValue(Response.json({error:"sign_in_required"},{status:401})));
  render(<AccountDeletionClient />);
  fireEvent.change(screen.getByRole("textbox"),{target:{value:"DELETE"}});
  await act(async()=>{fireEvent.click(screen.getByText("アカウントとデータを完全に削除"));});
  await act(async()=>{fireEvent.click(screen.getByText("アカウントとデータを完全に削除"));});
  expect(screen.getByText("再ログインして本人確認")).toBeVisible();
  await act(async()=>{fireEvent.click(screen.getByText("この端末のデータだけ消去"));});
  expect(localStorage.getItem("ipa-quiz:history:v1")).toBeNull();
  expect(screen.getByRole("status")).toHaveTextContent("サーバーの削除結果は確認できていません");
});
