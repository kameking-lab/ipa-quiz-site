import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { ContactForm } from "@/app/contact/ContactForm";

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// 送信成功後、フォームは成功カードに差し替わるが、これが role/aria-live を
// 持たないと SR 利用者には「受け付けました」が一切告知されない
// (WCAG 4.1.3 Status Messages)。成功カードを polite live region にして通知する。
describe("ContactForm — 送信成功の SR 通知", () => {
  it("成功カードが role=status / aria-live=polite の live region で告知される", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );

    render(<ContactForm />);

    const body = screen.getByLabelText(/お問い合わせ内容/);
    fireEvent.change(body, { target: { value: "テスト本文です" } });
    fireEvent.submit(body.closest("form") as HTMLFormElement);

    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("お問い合わせを受け付けました");
  });

  it("送信前(idle)には live region は存在しない", () => {
    render(<ContactForm />);
    expect(screen.queryByRole("status")).toBeNull();
  });
});
