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

it("lists one parent when the parent or a specific region matches", () => {
  const regional = { ...domains[0], featured: [
    { key: "chori-hokkaido", name: "調理師試験（北海道）", href: "/chori-hokkaido", questionCount: 60, periodLabel: "1期分" },
    { key: "chori-gunma", name: "調理師試験（群馬県）", href: "/chori-gunma", questionCount: 60, periodLabel: "1期分" },
  ] };
  const view = render(<BrowseQualifications domains={[regional]} />);
  const search = screen.getByRole("searchbox");
  for (const query of ["調理師", "調理師 北海道", "ちょうりし ほっかいどう", "群馬県"]) {
    fireEvent.change(search, { target: { value: query } });
    const links = within(screen.getByRole("list", { name: "資格の検索結果" })).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/qualifications/chori");
    expect(links[0]).toHaveTextContent("調理師試験（都道府県別 2）");
  }
  view.rerender(<BrowseQualifications domains={[regional]} challengeExamCodes={["chori-hokkaido", "chori-gunma"]} />);
  expect(within(screen.getByRole("list", { name: "資格の検索結果" })).getByRole("link"))
    .toHaveAttribute("href", "/challenge?group=chori");
});
