import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

const { trackEvent, posthogCapture } = vi.hoisted(() => ({
  trackEvent: vi.fn(),
  posthogCapture: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));

import { TrackedBookLink } from "@/components/analytics/TrackedBookLink";

beforeEach(() => {
  trackEvent.mockReset();
  posthogCapture.mockReset();
});

describe("TrackedBookLink", () => {
  it("records an amazon click with exam and book id in both analytics clients", () => {
    render(
      <TrackedBookLink
        href="https://www.amazon.co.jp/dp/ASIN123"
        exam="ap"
        bookId="ap-book-1"
        retailer="amazon"
        placement="recommended_books_page"
        onClick={(event) => event.preventDefault()}
      >
        Amazonで見る
      </TrackedBookLink>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Amazonで見る" }));

    expect(trackEvent).toHaveBeenCalledWith({
      name: "book_click",
      exam: "ap",
      bookId: "ap-book-1",
      retailer: "amazon",
      placement: "recommended_books_page",
    });
    expect(posthogCapture).toHaveBeenCalledWith("book_click", {
      exam: "ap",
      bookId: "ap-book-1",
      retailer: "amazon",
      placement: "recommended_books_page",
    });
  });

  it("records a rakuten click distinctly from amazon", () => {
    render(
      <TrackedBookLink
        href="https://books.rakuten.co.jp/rb/RID456/"
        exam="pm"
        bookId="pm-book-2"
        retailer="rakuten"
        placement="quiz_inline_hint"
        onClick={(event) => event.preventDefault()}
      >
        楽天で見る
      </TrackedBookLink>,
    );

    fireEvent.click(screen.getByRole("link", { name: "楽天で見る" }));

    expect(trackEvent).toHaveBeenCalledWith({
      name: "book_click",
      exam: "pm",
      bookId: "pm-book-2",
      retailer: "rakuten",
      placement: "quiz_inline_hint",
    });
  });

  // 推薦書ページでは <Button asChild> でこのコンポーネントを包んでいる。Radix Slot は
  // 子要素に className と ref を渡すので、{...props} を <a> へ素通しできていないと
  // ボタンの見た目が消えたり ref が null のままになったりする(どちらも型は通る)。
  it("forwards className and ref through Button asChild to the underlying anchor", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Button asChild size="lg" variant="primary">
        <TrackedBookLink
          ref={ref}
          href="https://www.amazon.co.jp/dp/ASINREF"
          exam="db"
          bookId="db-book-ref"
          retailer="amazon"
          placement="recommended_books_page"
        >
          Amazonで見る
        </TrackedBookLink>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Amazonで見る" });
    expect(ref.current).toBe(link);
    expect(link).toHaveClass("inline-flex");
    expect(link).toHaveAttribute("href", "https://www.amazon.co.jp/dp/ASINREF");
  });

  it("still navigates via the anchor href even when tracking runs", () => {
    render(
      <TrackedBookLink
        href="https://www.amazon.co.jp/dp/ASIN789"
        exam="fe"
        bookId="fe-book-3"
        retailer="amazon"
        placement="recommended_books_page"
      >
        Amazonで見る
      </TrackedBookLink>,
    );
    expect(screen.getByRole("link", { name: "Amazonで見る" })).toHaveAttribute(
      "href",
      "https://www.amazon.co.jp/dp/ASIN789",
    );
  });
});
