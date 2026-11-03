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

  it("restores only the approved question hint with the same book, affiliate attributes and disclosure", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "safeaisite22-22");
    render(<InlineBookHint exam="ip" category="ストラテジ" pagePath="/q/ip/2011-autumn/am/q1" />);
    const link = screen.getByRole("link", { name: /Amazon で見る/ });
    expect(link).toHaveAttribute("href", "https://www.amazon.co.jp/dp/4297152436?tag=safeaisite202-22");
    expect(link).toHaveAttribute("rel", "noopener noreferrer sponsored");
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.getByText("[PR]")).toBeInTheDocument();
    expect(screen.getByText("Amazonのアソシエイトとして、過去問AIは適格販売により収入を得ています。")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "この試験の推薦書一覧" })).toHaveAttribute("href", "/recommended-books/ip");
  });

  it("keeps another IP question hint on its ordinary link without an affiliate claim", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "safeaisite22-22");
    render(<InlineBookHint exam="ip" category="ストラテジ" pagePath="/q/ip/2011-autumn/am/q2" />);
    const link = screen.getByRole("link", { name: "Amazon で見る" });
    expect(link).toHaveAttribute("href", "https://www.amazon.co.jp/dp/4297152436");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByText("[PR]")).toBeNull();
    expect(screen.queryByText(/Amazonのアソシエイトとして/)).toBeNull();
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
