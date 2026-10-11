import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
const route = vi.hoisted(() => ({ search: "" }));
vi.mock("next/navigation", () => ({ usePathname: () => "/quiz", useSearchParams: () => new URLSearchParams(route.search) }));
import { PracticeSessionTabs } from "@/components/quiz/PracticeSessionTabs";
afterEach(cleanup);

describe("PracticeSessionTabs exact question context", () => {
  it.each(["rigaku-ryohoshi", "sagyo-ryohoshi"])("changes %s AM to PM without carrying the AM question into the PM pool", (exam) => {
    const question = `${exam}-2025-annual-am-q10`;
    const returnTo = `/q/${exam}/2025-annual/am/q10`;
    route.search = new URLSearchParams({ exam, mode: "year", year: "2025", season: "annual", session: "am", question, returnTo }).toString();
    render(<PracticeSessionTabs sessions={["am", "pm"]} selected="am" />);
    const pm = new URL(screen.getByRole("link", { name: "午後" }).getAttribute("href")!, "https://local.invalid");
    expect(pm.searchParams.get("session")).toBe("pm");
    expect(pm.searchParams.has("question")).toBe(false);
    expect(pm.searchParams.get("exam")).toBe(exam);
    expect(pm.searchParams.get("returnTo")).toBe(returnTo);
    const am = new URL(screen.getByRole("link", { name: "午前" }).getAttribute("href")!, "https://local.invalid");
    expect(am.searchParams.get("question")).toBe(question);
  });
});
