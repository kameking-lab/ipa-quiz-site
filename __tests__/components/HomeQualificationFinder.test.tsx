import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HomeQualificationFinder } from "@/components/home/landing/HomeQualificationFinder";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { getHomeDirectory } from "@/lib/home/home-directory";
const domains = getHomeDirectory();
beforeEach(cleanup);
describe("qualification discovery", () => {
  it("finds advanced IPA by lowercase/fullwidth abbreviation, and non-IPA by name", () => {
    render(<HomeQualificationFinder domains={domains} />);
    const input = screen.getByRole("searchbox", { name: "資格名・略称で検索" });
    fireEvent.change(input, { target: { value: "ｓｃ" } });
    expect(screen.getByRole("link", { name: /情報処理安全確保支援士/ })).toHaveAttribute("href", "/sc");
    fireEvent.change(input, { target: { value: "衛生" } });
    expect(screen.getAllByRole("link", { name: /第一種衛生管理者/ }).map((link) => link.getAttribute("href"))).toContain("/eisei1");
    expect(screen.queryByRole("link", { name: /ITパスポート/ })).not.toBeInTheDocument();
  });
  it("filters a category and clears an empty search without losing the directory", () => {
    render(<HomeQualificationFinder domains={domains} />);
    fireEvent.click(screen.getByRole("button", { name: "電気" }));
    expect(screen.getByRole("button", { name: "電気" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: /第二種電気工事士/ })).toHaveAttribute("href", "/denko2");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "該当しない資格" } });
    expect(screen.getByText("該当する資格が見つかりませんでした。")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "条件をクリアして選び直す" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("link", { name: /ITパスポート/ })).toHaveAttribute("href", "/ip");
  });
  it("keeps every real qualification href in server-rendered native disclosures with JS off", () => {
    const html = renderToStaticMarkup(<HomeDirectory domains={domains} />);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const hrefs = new Set(Array.from(doc.querySelectorAll("a")).map((a) => a.getAttribute("href")));
    for (const item of domains.flatMap((d) => [...d.featured, ...d.compact])) expect(hrefs).toContain(item.href);
    expect(doc.querySelectorAll("details[id^=domain-]")).toHaveLength(domains.length);
  });
});
