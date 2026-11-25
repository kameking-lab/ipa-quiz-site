import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
const challenge = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site-key";
  return { revision: 0 };
});
vi.mock("@/components/TurnstileWidget", async () => {
  const { useEffect, useState } = await import("react");
  return { TurnstileWidget: function Challenge({ onToken }: { onToken: (token: string) => void }) {
    const [token] = useState(() => `token-${++challenge.revision}`);
    useEffect(() => onToken(token), [onToken, token]);
    return <span>{token}</span>;
  } };
});
vi.mock("@/lib/posthog", () => ({ posthogCapture: vi.fn() }));
import { ContactForm } from "@/app/contact/ContactForm";
afterEach(() => { cleanup(); vi.unstubAllGlobals(); delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY; });
it("requests a fresh one-time Turnstile token after a delivery failure and retries with the preserved body", async () => {
  const fetcher = vi.fn().mockResolvedValueOnce(Response.json({ ok: false }, { status: 503 })).mockResolvedValueOnce(Response.json({ ok: true, delivery: "delivered", receiptId: "KG-retried" }));
  vi.stubGlobal("fetch", fetcher);
  await act(async () => { render(<ContactForm />); });
  const body = screen.getByLabelText(/お問い合わせ内容/);
  const submit = screen.getByRole("button", { name: "送信する" });
  expect(screen.getByText("token-1")).toBeVisible();
  fireEvent.change(body, { target: { value: "配信に失敗した問い合わせです" } });
  await act(async () => { fireEvent.click(submit); });
  expect(screen.getByRole("alert")).toHaveTextContent("運営への送信を確認できませんでした");
  expect(body).toHaveValue("配信に失敗した問い合わせです");
  expect(screen.getByText("token-2")).toBeVisible();
  expect(submit).toBeEnabled();
  await act(async () => { fireEvent.click(submit); });
  expect(screen.getByRole("status")).toHaveTextContent("KG-retried");
  const payloads = fetcher.mock.calls.map(call => JSON.parse(call[1].body));
  expect(payloads.map(payload => payload.turnstileToken)).toEqual(["token-1", "token-2"]);
  expect(payloads[1].body).toBe(payloads[0].body);
});
