import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { NotificationSettings } from "@/app/account/notifications/NotificationSettings";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// Radix <Switch> は中身のない <button role="switch"> をレンダーするため、
// 可視ラベル（隣接の <p>）はプログラム的に関連付かず、aria-label が無いと
// SR 利用者はトグルの用途を把握できない（WCAG 4.1.2 Name, Role, Value）。
// 各 Switch に aria-label を付与する。aria-label を外すと getByRole({name}) が落ちる。
describe("NotificationSettings — トグルのアクセシブルネーム", () => {
  it("「メール通知を有効化」スイッチがアクセシブルネームで参照できる", () => {
    render(<NotificationSettings />);
    expect(
      screen.getByRole("switch", { name: "メール通知を有効化" }),
    ).toBeInTheDocument();
  });

  it("「学習継続リマインダー」スイッチがアクセシブルネームで参照できる", () => {
    render(<NotificationSettings />);
    expect(
      screen.getByRole("switch", { name: "学習継続リマインダー" }),
    ).toBeInTheDocument();
  });

  it("「週次ダイジェスト」スイッチがアクセシブルネームで参照できる", () => {
    render(<NotificationSettings />);
    expect(
      screen.getByRole("switch", { name: "週次ダイジェスト" }),
    ).toBeInTheDocument();
  });
});

// テストメール送信などの結果メッセージは条件付きマウントのブロックに表示されるが、
// role/aria-live が無いと SR 利用者に成功/失敗が告知されない(WCAG 4.1.3)。
// 結果ブロックを polite live region にして通知する(ContactForm と同型)。
describe("NotificationSettings — 結果メッセージの SR 通知", () => {
  it("テストメール送信成功が role=status / aria-live=polite の live region で告知される", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );

    render(<NotificationSettings />);

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "a@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /テストメールを送信/ }));

    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("テストメールを送信しました");
  });

  it("idle 時には結果 live region は存在しない", () => {
    render(<NotificationSettings />);
    expect(screen.queryByRole("status")).toBeNull();
  });
});
