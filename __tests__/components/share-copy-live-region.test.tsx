import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { SocialShare } from "@/components/motivation/SocialShare";
import { ReferralClient } from "@/app/referral/ReferralClient";

beforeEach(() => {
  cleanup();
  localStorage.clear();
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// コピー成功はボタン文言が「コピー済」等へ変わるだけで、ボタンの
// アクセシブル名変更は SR に自動告知されない(WCAG 4.1.3 Status Messages)。
// 共有導線のコピーボタンに polite live region を添えて告知する。
describe("共有導線のコピー成功 SR 通知", () => {
  it("SocialShare: テキストコピーで polite live region に成功が反映される", async () => {
    render(<SocialShare text="共有テスト" url="https://example.com/q" imageUrl="https://example.com/i.png" />);

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("");

    fireEvent.click(screen.getByRole("button", { name: /テキストをコピー/ }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("テキストをコピーしました");
    });
  });

  it("ReferralClient: 紹介URLコピーで polite live region に成功が反映される", async () => {
    render(<ReferralClient />);

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("");

    fireEvent.click(screen.getByRole("button", { name: /URLをコピー/ }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("紹介 URL をコピーしました");
    });
  });
});
