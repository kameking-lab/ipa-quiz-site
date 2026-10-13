import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HomeQualificationFinder } from "@/components/home/landing/HomeQualificationFinder";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { getHomeDirectory } from "@/lib/home/home-directory";
const domains = getHomeDirectory();
beforeEach(() => { cleanup(); window.history.replaceState(null, ""); });
describe("qualification discovery", () => {
  it("searches normalized abbreviations and starts only the selected qualification", () => {
    render(<HomeQualificationFinder domains={domains} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "資格名・略称で検索" }), { target: { value: "ｓｃ" } });
    const row = screen.getByRole("link", { name: /情報処理安全確保支援士/ });
    expect(row).toHaveAttribute("href", "/sc");
    expect(row).not.toHaveAttribute("aria-expanded");
    expect(screen.queryByText("選んだ資格")).not.toBeInTheDocument();
  });
  it("finds FP qualifications by their formal name and common planner name", () => {
    render(<HomeQualificationFinder domains={domains} />);
    const search = screen.getByRole("searchbox");
    fireEvent.change(search, { target: { value: "3級ファイナンシャルプランニング技能士" } });
    expect(screen.getByRole("link", { name: /^FP3級/ })).toHaveAttribute("href", "/fp3");
    expect(screen.queryByRole("link", { name: /^FP2級/ })).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: "3級ファイナンシャル・プランニング技能検定" } });
    expect(screen.getByRole("link", { name: /^FP3級/ })).toHaveAttribute("href", "/fp3");

    fireEvent.change(search, { target: { value: "ファイナンシャルプランナー" } });
    for (const grade of [1, 2, 3]) {
      expect(screen.getByRole("link", { name: new RegExp(`^FP${grade}級`) })).toHaveAttribute("href", `/fp${grade}`);
    }
  });
  it("filters a domain, reports empty searches and resets filters", () => {
    render(<HomeQualificationFinder domains={domains} />);
    fireEvent.click(screen.getByRole("button", { name: "電気" }));
    expect(screen.getByRole("button", { name: "電気" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: /第二種電気工事士/ })).toHaveAttribute("href", "/denko2");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "該当しない資格" } });
    expect(screen.getByText("該当する資格が見つかりませんでした。")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "検索をクリアして選び直す" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("link", { name: /^ITパスポート/ })).toHaveAttribute("href", "/ip");
  });
  it("restores the search and domain from the same history entry without losing router state", () => {
    window.history.replaceState({ routerMarker: "preserved" }, "");
    const view = render(<HomeQualificationFinder domains={domains} />);
    fireEvent.click(screen.getByRole("button", { name: /^IT・/ }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "ｓｃ" } });
    const row = screen.getByRole("link", { name: /情報処理安全確保支援士/ });
    row.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(row);
    expect(window.history.state.routerMarker).toBe("preserved");
    view.unmount();
    render(<HomeQualificationFinder domains={domains} />);
    expect(screen.getByRole("searchbox")).toHaveValue("ｓｃ");
    expect(screen.getByRole("button", { name: /^IT・/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: /情報処理安全確保支援士/ })).toHaveAttribute("href", "/sc");
  });
  it("keeps the preview and full-directory entry available before navigation", () => {
    render(<HomeQualificationFinder domains={domains} preview={<p>既存の問題プレビュー</p>} />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "fe" } });
    expect(screen.getByText("既存の問題プレビュー")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /収録している全資格/ })).toHaveAttribute("href", "#home-directory-title");
  });
  it("keeps every real qualification href in visible server-rendered genres", () => {
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<HomeDirectory domains={domains} />), "text/html");
    const hrefs = new Set(Array.from(doc.querySelectorAll("a")).map((a) => a.getAttribute("href")));
    for (const item of domains.flatMap((d) => [...d.featured, ...d.compact])) expect(hrefs).toContain(item.href);
    expect(doc.querySelectorAll("section[id^=domain-]")).toHaveLength(domains.length);
    expect(doc.querySelectorAll("details[id^=domain-]")).toHaveLength(0);
  });
  it("lists each hygiene qualification once using its official paper hub", () => {
    const items = domains.flatMap((d) => [...d.featured, ...d.compact]);
    for (const name of ["第一種衛生管理者", "第二種衛生管理者"]) {
      const matches = items.filter((item) => item.name === name);
      expect(matches).toHaveLength(1);
      expect(matches[0]?.href).toMatch(/^\/e-learning\/exams\/qualifications\//);
    }
  });
});
