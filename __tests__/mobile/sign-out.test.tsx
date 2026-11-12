import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ native: false, signOut: vi.fn(), device: vi.fn() }));
vi.mock("next-auth/react", () => ({ signOut: mocks.signOut }));
vi.mock("@/mobile/shared/contracts", () => ({ nativeClient: () => mocks.native }));
vi.mock("@/mobile/src/sign-out", () => ({ signOutDevice: mocks.device }));
import { SignOutButton } from "@/app/auth/signout/SignOutButton";
beforeEach(() => { vi.resetAllMocks(); mocks.native = false; });
afterEach(cleanup);

it("ends the browser session with the existing home redirect", async () => {
  render(<SignOutButton />);
  await act(async () => { fireEvent.click(screen.getByRole("button", { name: "ログアウトする" })); });
  expect(mocks.device).not.toHaveBeenCalled();
  expect(mocks.signOut).toHaveBeenCalledWith({ callbackUrl: "/" });
});
it("waits for native identity and offline cleanup before redirecting", async () => {
  mocks.native = true;
  let finish!: () => void;
  mocks.device.mockImplementation(() => new Promise<void>(resolve => { finish = resolve; }));
  render(<SignOutButton />);
  await act(async () => { fireEvent.click(screen.getByRole("button", { name: "ログアウトする" })); });
  expect(mocks.signOut).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "ログアウトする" })).toBeDisabled();
  await act(async () => { finish(); });
  expect(mocks.signOut).toHaveBeenCalledOnce();
});
it("keeps the screen retryable if native cleanup fails", async () => {
  mocks.native = true; mocks.device.mockRejectedValueOnce(Error("offline"));
  render(<SignOutButton />);
  await act(async () => { fireEvent.click(screen.getByRole("button", { name: "ログアウトする" })); });
  expect(mocks.signOut).not.toHaveBeenCalled();
  expect(screen.getByRole("alert")).toHaveTextContent("ログアウトできませんでした");
  await act(async () => { fireEvent.click(screen.getByRole("button", { name: "ログアウトする" })); });
  expect(mocks.signOut).toHaveBeenCalledOnce();
});
