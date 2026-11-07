import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MockScoreHistory } from "@/components/account/tabs/MockScoreHistory";
import { LS_KEYS } from "@/lib/storage/keys";

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("retained mock exam history", () => {
  it("reads existing scores without changing saved history or retired benefits", () => {
    const raw = JSON.stringify({ scores: [
      { id: "ap-existing", exam: "ap", score: 16, total: 20, takenAt: 1700000000000 },
      { id: "fe-existing", exam: "fe", score: 12, total: 20, takenAt: 1700000000000 },
    ] });
    localStorage.setItem(LS_KEYS.mockScores, raw);
    localStorage.setItem(LS_KEYS.premiumCoupon, '{"code":"existing-benefit"}');
    localStorage.setItem(LS_KEYS.character, "zan");
    const { container } = render(<MockScoreHistory />);
    expect(screen.getAllByText("80%")).toHaveLength(2);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "fe" } });
    expect(screen.getAllByText("60%")).toHaveLength(2);
    expect(localStorage.getItem(LS_KEYS.mockScores)).toBe(raw);
    expect(localStorage.getItem(LS_KEYS.premiumCoupon)).toBe('{"code":"existing-benefit"}');
    expect(localStorage.getItem(LS_KEYS.character)).toBe("zan");
    expect(container.querySelector("svg.recharts-surface")).toBeNull();
    expect(screen.queryByRole("button", { name: /サンプル|デモ/ })).toBeNull();
  });

  it("shows an empty state without manufacturing a score", () => {
    render(<MockScoreHistory />);
    expect(screen.getByText(/模試スコアはまだ記録されていません/)).toBeInTheDocument();
    expect(localStorage.getItem(LS_KEYS.mockScores)).toBeNull();
  });
});
