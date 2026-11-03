import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const route = vi.hoisted(() => ({ search: "" }));
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(route.search) }));
import { QuizModeTabs } from "@/components/quiz/QuizModeTabs";
beforeEach(() => { route.search = "session=gakka&returnTo=%2Fq%2Ffp3%2F2026-published%2Fgakka%2Fq11"; });
afterEach(cleanup);

describe("QuizModeTabs qualification context", () => {
  it("continues FP3 q11 in the same published paper on both layouts", () => {
    route.search = "exam=fp3&mode=year&year=2026&season=published&session=gakka&question=fp3-2026-published-gakka-q11&returnTo=%2Fq%2Ffp3%2F2026-published%2Fgakka%2Fq11";
    render(<QuizModeTabs active="year" exam="fp3" />);
    for (const link of screen.getAllByRole("link", { name: "通常クイズ" })) {
      const url = new URL(link.getAttribute("href")!, "https://local.invalid");
      expect(Object.fromEntries(url.searchParams)).toEqual({
        exam: "fp3", mode: "random", year: "2026", season: "published",
        session: "gakka", question: "fp3-2026-published-gakka-q11",
        returnTo: "/q/fp3/2026-published/gakka/q11",
      });
    }
    for (const name of ["復習", "弱点克服"]) {
      for (const link of screen.getAllByRole("link", { name })) {
        const url = new URL(link.getAttribute("href")!, "https://local.invalid");
        expect(url.searchParams.has("question")).toBe(false);
      }
    }
  });
  it("omits the unsupported stream mode for dental exams on both layouts", () => {
    const { container } = render(<QuizModeTabs active="random" exam="shika-ishi" />);
    expect(container.querySelectorAll('a[href^="/quiz/stream"]')).toHaveLength(0);
    expect(container.querySelectorAll('a[href^="/quiz?mode=random&exam=shika-ishi"]')).toHaveLength(2);
  });
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
