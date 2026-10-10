import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HomeQualificationFinder } from "@/components/home/landing/HomeQualificationFinder";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { getHomeDirectory } from "@/lib/home/home-directory";
const domains = getHomeDirectory();
beforeEach(cleanup);
describe("qualification discovery", () => {
  it("searches normalized abbreviations and starts only the selected qualification", () => {
    render(<HomeQualificationFinder domains={domains} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "資格名・略称で検索" }), { target: { value: "ｓｃ" } });
    const row = screen.getByRole("button", { name: /情報処理安全確保支援士/ });
    expect(row).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(row);
    expect(row).toHaveAttribute("aria-expanded", "true");
    for (const link of screen.getAllByRole("link", { name: /年度・科目を選んで解く/ })) expect(link).toHaveAttribute("href", "/sc");
  });
  it("filters a domain, reports empty searches and resets selection", () => {
    render(<HomeQualificationFinder domains={domains} />);
    fireEvent.click(screen.getByRole("button", { name: "電気" }));
    expect(screen.getByRole("button", { name: "電気" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /第二種電気工事士/ })).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "該当しない資格" } });
    expect(screen.getByText("該当する資格が見つかりませんでした。")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "検索をクリアして選び直す" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("button", { name: /^ITパスポート/ })).toHaveAttribute("aria-expanded", "false");
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
