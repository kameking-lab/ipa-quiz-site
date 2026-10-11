import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const route = vi.hoisted(() => ({ search: "" }));
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(route.search) }));
import { QuizModeTabs } from "@/components/quiz/QuizModeTabs";
beforeEach(() => { route.search = "session=gakka&returnTo=%2Fq%2Ffp3%2F2026-published%2Fgakka%2Fq11"; });
afterEach(cleanup);

describe("QuizModeTabs qualification context", () => {
  it("keeps the supported qualification and return page in its mock-exam link", () => {
    route.search = "session=am2&returnTo=%2Fap%2F2025-spring";
    render(<QuizModeTabs active="year" exam="ap" />);
    expect(screen.getAllByRole("link", { name: "模試" })[0]).toHaveAttribute("href", "/mock-exam?exam=ap&returnTo=%2Fap%2F2025-spring");
  });

  it("has one practice mode and no unrelated AP mock for FP3", () => {
    render(<QuizModeTabs active="year" exam="fp3" />);
    expect(screen.queryByRole("link", { name: "模試" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "資格内練習" })).not.toBeInTheDocument();
    for (const link of screen.getAllByRole("link", { name: "通常クイズ" })) {
      const url = new URL(link.getAttribute("href")!, "https://local.invalid");
      expect(url.pathname).toBe("/quiz");
      expect(url.searchParams.get("exam")).toBe("fp3");
      expect(url.searchParams.get("session")).toBe("gakka");
      expect(url.searchParams.get("returnTo")).toBe("/q/fp3/2026-published/gakka/q11");
    }
  });
});
