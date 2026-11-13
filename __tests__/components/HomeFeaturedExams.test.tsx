import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HomeFeaturedExams, type QualificationCardItem } from "@/components/home/landing/HomeFeaturedExams";
import { LS_KEYS } from "@/lib/storage/keys";
const items: QualificationCardItem[] = ["sc", "nw", "ap", "fp1", "kashikin", "khk-kagaku"].map(key => ({ key, name: key, href: `/${key}`, domainId: "it", questionCount: 100, periodLabel: "2期分" }));
function history(keys: string[]) { localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: keys.map((key, at) => ({ id: `${key}-2026-spring-am2-q1`, at, selected: "ア", correct: true })), starredIds: [] })); }
beforeEach(() => { localStorage.clear(); vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-13T12:00:00+09:00")); });
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });
describe("home personalized pickup rows", () => {
  it("omits the whole personal row for first-time learners", () => {
    render(<HomeFeaturedExams items={items} onChoose={() => {}} />);
    expect(screen.queryByRole("heading", { name: "あなたの資格" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "試験が近い資格" })).toBeInTheDocument();
    expect(document.querySelectorAll(".study-pickups section")).toHaveLength(1);
  });
  it.each([["sc"], ["sc", "sc", "nw", "nw", "ap", "fp1", "khk-kagaku"]])("shows only learned personal cards: %j", (...keys) => {
    history(keys);
    render(<HomeFeaturedExams items={items} onChoose={() => {}} />);
    const personal = screen.getByRole("region", { name: "あなたの資格" });
    expect(within(personal).getAllByRole("link")).toHaveLength(Math.min(3, new Set(keys).size));
    const upcoming = screen.getByRole("region", { name: "試験が近い資格" });
    const personalHrefs = within(personal).getAllByRole("link").map(link => link.getAttribute("href"));
    expect(within(upcoming).getAllByRole("link").every(link => !personalHrefs.includes(link.getAttribute("href")))).toBe(true);
  });
  it("refreshes history on BFCache return without changing storage", () => {
    const onChoose = vi.fn();
    render(<HomeFeaturedExams items={items} onChoose={onChoose} />);
    history(["sc"]);
    const saved = localStorage.getItem(LS_KEYS.history);
    fireEvent(window, new Event("pageshow"));
    fireEvent.click(within(screen.getByRole("region", { name: "あなたの資格" })).getByRole("link"));
    expect(onChoose).toHaveBeenCalledOnce();
    expect(localStorage.getItem(LS_KEYS.history)).toBe(saved);
  });
  it("tolerates denied storage and malformed stored history", () => {
    localStorage.setItem(LS_KEYS.history, "null");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("denied"); });
    expect(() => render(<HomeFeaturedExams items={items} onChoose={() => {}} />)).not.toThrow();
    expect(screen.queryByRole("heading", { name: "あなたの資格" })).not.toBeInTheDocument();
  });
  it("reserves two rows before hydration only when a supported qualification has history", () => {
    const html = renderToStaticMarkup(<HomeFeaturedExams items={items} onChoose={() => {}} />);
    const host = document.createElement("div"); host.innerHTML = html; document.body.append(host);
    history(["sc"]);
    const code = host.querySelector("script")!.textContent!;
    // Execute the actual emitted bootstrap, so a bundler-dependent toString
    // reference or escaping regression cannot silently break height reservation.
    window.eval(code);
    expect(host.querySelector(".study-pickups")).toHaveAttribute("data-personal", "true");
    localStorage.clear(); window.eval(code);
    expect(host.querySelector(".study-pickups")).toHaveAttribute("data-personal", "false");
    host.remove();
  });
});
