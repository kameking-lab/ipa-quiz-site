import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { BrowseQualifications } from "@/components/home/pace/BrowseQualifications";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";

const domains: HomeDirectoryDomain[] = [{
  id: "it", title: "IT", lead: "", allHref: "/ipa", allLabel: "すべて",
  compact: [], totalQuestions: 1, qualificationCount: 1,
  featured: [{ key: "ip", name: "ITパスポート", href: "/ip", questionCount: 1, periodLabel: "1回分" }],
}];

afterEach(cleanup);

it.each([
  [undefined, "/ip"],
  [["ip"], "/challenge?exam=ip"],
] as const)("finds a nickname while retaining the destination for challenge exams %s", (challengeExamCodes, href) => {
  render(<BrowseQualifications domains={domains} challengeExamCodes={challengeExamCodes} />);
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "アイパス" } });
  const results = screen.getByRole("list", { name: "資格の検索結果" });
  expect(within(results).getByRole("link", { name: /^ITパスポート/ })).toHaveAttribute("href", href);
});

it("lists one parent for a broad query and links directly to an identified region", () => {
  const regional = { ...domains[0], featured: [
    { key: "chori-hokkaido", name: "調理師試験（北海道）", href: "/chori-hokkaido", questionCount: 60, periodLabel: "1期分" },
    { key: "chori-gunma", name: "調理師試験（群馬県）", href: "/chori-gunma", questionCount: 60, periodLabel: "1期分" },
    { key: "chori-ehime", name: "調理師試験（愛媛県）", href: "/chori-ehime", questionCount: 60, periodLabel: "1期分" },
  ] };
  const view = render(<BrowseQualifications domains={[regional]} />);
  const search = screen.getByRole("searchbox");
  for (const [query, href] of [
    ["調理師", "/qualifications/chori"], ["調理師 北海道", "/chori-hokkaido"],
    ["ちょうりし ほっかいどう", "/chori-hokkaido"], ["群馬県", "/chori-gunma"],
    ["愛媛 調理師", "/chori-ehime"],
  ]) {
    fireEvent.change(search, { target: { value: query } });
    const links = within(screen.getByRole("list", { name: "資格の検索結果" })).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", href);
  }
  fireEvent.change(search, { target: { value: "調理師" } });
  view.rerender(<BrowseQualifications domains={[regional]} challengeExamCodes={["chori-hokkaido", "chori-gunma"]} />);
  expect(within(screen.getByRole("list", { name: "資格の検索結果" })).getByRole("link"))
    .toHaveAttribute("href", "/challenge?group=chori");
});
