import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { NotificationSettings } from "@/app/account/notifications/NotificationSettings";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
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
