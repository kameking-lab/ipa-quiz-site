import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InlineBookHint } from "@/components/quiz/InlineBookHint";

afterEach(() => vi.unstubAllEnvs());

describe("Amazon book hint after this site's associate closure", () => {
  it("retains the same strategy book and its ordinary product link without a paid-link label", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "safeaisite22-22");
    render(<InlineBookHint exam="ip" category="ストラテジ" />);
    const link = screen.getByRole("link", { name: "Amazon で見る" });
    expect(link).toHaveAttribute("href", "https://www.amazon.co.jp/dp/4297152436");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.queryByText("[PR]")).toBeNull();
    expect(screen.getByRole("link", { name: "この試験の推薦書一覧" })).toHaveAttribute("href", "/recommended-books/ip");
  });

  it("preserves a different configured tag and its affiliate labeling", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "different-tag-22");
    render(<InlineBookHint exam="ip" category="ストラテジ" />);
    const link = screen.getByRole("link", { name: /Amazon で見る/ });
    expect(link).toHaveAttribute("href", "https://www.amazon.co.jp/dp/4297152436?tag=different-tag-22");
    expect(link).toHaveAttribute("rel", "noopener noreferrer sponsored");
    expect(screen.getByText("[PR]")).toBeInTheDocument();
  });
});
