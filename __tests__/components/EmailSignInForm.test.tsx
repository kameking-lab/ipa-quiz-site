import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

const signIn = vi.fn();
vi.mock("next-auth/react", () => ({ signIn: (...args: unknown[]) => signIn(...args) }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent: vi.fn() }));

import { EmailSignInForm } from "@/app/auth/signin/EmailSignInForm";

beforeEach(() => {
  cleanup();
  signIn.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// Magic Link 送信成功後、フォームは「メールを送信しました」カードに差し替わるが、
// role/aria-live が無いと SR 利用者に送信成功が告知されない(WCAG 4.1.3)。
// 成功カードを polite live region にして通知する(ContactForm と同型)。
describe("EmailSignInForm — 送信成功の SR 通知", () => {
  it("成功カードが role=status / aria-live=polite の live region で告知される", async () => {
    signIn.mockResolvedValue({ ok: true });

    render(<EmailSignInForm />);

    const input = screen.getByLabelText(/メールアドレスでログイン/);
    fireEvent.change(input, { target: { value: "a@example.com" } });
    fireEvent.submit(input.closest("form") as HTMLFormElement);

    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("メールを送信しました");
  });

  it("送信前(idle)には live region は存在しない", () => {
    render(<EmailSignInForm />);
    expect(screen.queryByRole("status")).toBeNull();
  });
});
