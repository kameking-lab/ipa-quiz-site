import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GroupPage, { generateMetadata, generateStaticParams } from "@/app/qualifications/[slug]/page";
import QualificationsPage from "@/app/qualifications/page";
import HtmlSitemapPage from "@/app/sitemap/page";
import DailyChallengePage from "@/app/challenge/page";
import { getPublishedQualificationGroups } from "@/lib/qualifications/published-groups";
import { qualificationGroupPath } from "@/lib/qualifications/groups";
import { groupHomeDirectory } from "@/lib/home/grouped-directory";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { renderMainSitemapXml } from "@/lib/seo/sitemap-xml";
import { SITE_BASE_URL } from "@/lib/seo/config";

const groups = getPublishedQualificationGroups();

describe("qualification groups", () => {
  it("collects each published child once and keeps its catalog link across domains", () => {
    const directory = groupHomeDirectory(getHomeDirectory());
    const cards = directory.flatMap(domain => [...domain.featured, ...domain.compact]);
    expect(Object.fromEntries(groups.map(({ group, children }) => [group.slug, children.length]))).toEqual({
      chori: 12, "gijutsushi-first": 22, tohan: 6, junkango: 3, dokugeki: 3, kyoin: 11, "kokka-sogo": 3,
    });
    expect(groups.find(row => row.group.slug === "chori")?.children.map(child => child.item.href))
      .toEqual(expect.arrayContaining(["/chori-ehime", "/chori-nara"]));
    for (const { group, children } of groups) {
      const href = qualificationGroupPath(group.slug);
      const parents = cards.filter(card => card.href === href);
      expect(parents, href).toHaveLength(1);
      expect(parents[0].children?.map(child => child.href).sort()).toEqual(children.map(child => child.item.href).sort());
      expect(cards.some(card => children.some(child => card.key === child.item.key))).toBe(false);
    }
    expect(directory.find(domain => domain.id === "construction")?.featured.map(card => card.href)).toContain("/qualifications/gijutsushi-first");
  });

  it("links to each parent once in the HTML sitemap", () => {
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(createElement(HtmlSitemapPage)), "text/html");
    for (const { group, children } of groups) {
      expect(doc.querySelectorAll(`a[href="${qualificationGroupPath(group.slug)}"]`)).toHaveLength(1);
      for (const { item } of children) expect(doc.querySelector(`a[href="${item.href}"]`)).toBeNull();
    }
  });

  it("lists a single parent in the coverage disclosure", () => {
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(createElement(QualificationsPage)), "text/html");
    const coverage = doc.querySelector("#qualification-coverage")!;
    for (const { group, children } of groups) {
      expect(coverage.querySelectorAll(`a[href="${qualificationGroupPath(group.slug)}"]`)).toHaveLength(1);
      for (const { item } of children) expect(coverage.querySelector(`a[href="${item.href}"]`)).toBeNull();
    }
  });

  it("prerenders indexable parents and includes their own canonical URLs in the sitemap", async () => {
    expect(generateStaticParams().map(param => param.slug).sort()).toEqual(groups.map(row => row.group.slug).sort());
    const sitemap = renderMainSitemapXml();
    for (const { group, children } of groups) {
      const path = qualificationGroupPath(group.slug);
      const props = { params: Promise.resolve({ slug: group.slug }) };
      expect((await generateMetadata(props)).alternates?.canonical).toBe(path);
      expect(sitemap).toContain(`<loc>${SITE_BASE_URL}${path}</loc>`);
      const doc = new DOMParser().parseFromString(renderToStaticMarkup(await GroupPage(props)), "text/html");
      expect(doc.querySelector("h1")?.textContent).toBe(group.name);
      expect([...doc.querySelectorAll("li a")].map(anchor => [anchor.textContent, anchor.getAttribute("href")]))
        .toEqual(children.map(({ item, label }) => [label, item.href]));
    }
  });

  it("keeps the daily challenge destination when a region is selected there", async () => {
    const html = renderToStaticMarkup(await DailyChallengePage({ searchParams: Promise.resolve({ group: "chori" }) }));
    const doc = new DOMParser().parseFromString(html, "text/html");
    const region = [...doc.querySelectorAll("li a")].find(anchor => anchor.textContent === "北海道");
    expect(region?.getAttribute("href")).toBe("/challenge?exam=chori-hokkaido");
  });
});
