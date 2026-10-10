import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { EXAM_QUESTION_COUNTS } from "@/lib/constants/exam-question-counts";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { QUALIFICATION_HUBS, qualificationHubPath } from "@/lib/exam-qualification-hubs";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

describe("home directory", () => {
  const domains = getHomeDirectory();
  const all = domains.flatMap((d) => [...d.featured, ...d.compact]);

  it("keeps the primary category routes reachable", () => {
    const hrefs = new Set(domains.map((d) => d.allHref));
    expect(hrefs).toContain("/ipa");
    expect(hrefs).toContain("/e-learning/exams");
    expect(hrefs).toContain("/qualifications");
  });

  it("lists all 13 IPA categories with the same counts as the /ipa grid", () => {
    const it = domains.find((d) => d.id === "it");
    expect(it).toBeDefined();
    const items = [...(it?.featured ?? []), ...(it?.compact ?? [])];
    expect(items).toHaveLength(13);
    for (const item of items) {
      expect(item.questionCount).toBe(EXAM_QUESTION_COUNTS[item.key as keyof typeof EXAM_QUESTION_COUNTS]);
      expect(item.questionCount).toBeGreaterThan(0);
      expect(item.periodLabel).toMatch(/^[1-9]\d*期分$/);
    }
  });

  it("links every safety qualification hub", () => {
    const safety = domains.find((d) => d.id === "safety");
    const featured = safety?.featured ?? [];
    const hrefs = featured.map((item) => item.href);
    for (const hub of QUALIFICATION_HUBS) {
      expect(hrefs.filter((href) => href === qualificationHubPath(hub.slug))).toHaveLength(1);
    }
    expect(hrefs).not.toContain("/eisei1");
    expect(hrefs).not.toContain("/eisei2");
    for (const name of ["第一種衛生管理者", "第二種衛生管理者"]) {
      const entries = featured.filter((item) => item.name === name);
      expect(entries).toHaveLength(1);
      expect(entries[0]?.questionCount).toBeGreaterThan(0);
    }
    for (const chip of safety?.compact ?? []) {
      expect(chip.href).toMatch(/^\/e-learning\/exams\?group=lckohyo&subject=/);
      expect(chip.periodLabel).toMatch(/^[1-9]\d*回分$/);
    }
  });

  it("shows only live external qualifications", () => {
    const external = domains.filter((d) => !["it", "safety"].includes(d.id)).flatMap((d) => d.featured);
    const live = QUALIFICATION_CATALOG.filter((q) => q.status === "live" && q.examCode && q.domain !== "safety").map((q) => `/${q.examCode}`);
    expect(external.map((i) => i.href).sort()).toEqual([...live].sort());
  });

  it("never advertises an empty qualification and sums domain totals from cards", () => {
    for (const item of all) expect(item.questionCount).toBeGreaterThan(0);
    for (const d of domains) {
      const sum = [...d.featured, ...d.compact].reduce((s, i) => s + i.questionCount, 0);
      expect(d.totalQuestions).toBe(sum);
      expect(d.qualificationCount).toBe(d.featured.length + d.compact.length);
    }
  });

  it("uses unique keys and in-site hrefs", () => {
    expect(new Set(all.map((i) => i.href)).size).toBe(all.length);
    for (const item of all) expect(item.href.startsWith("/")).toBe(true);
  });

  it("shows the current partial OT and orthoptist counts in their cards", () => {
    for (const [code, count] of [["sagyo-ryohoshi", 298], ["shino-kunrenshi", 184]] as const) {
      const item = all.find((entry) => entry.key === code);
      expect(item?.questionCount).toBe(count);
      expect(item?.sub).toContain(`${count}原問`);
      expect(item?.sub).toContain("部分収録");
    }
  });

  it("renders every live qualification link in the initial HTML without disclosure controls", () => {
    const html = renderToStaticMarkup(createElement(HomeDirectory, { domains }));
    expect(html).not.toContain("<details");
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]?.replaceAll("&amp;", "&"));
    for (const item of all) expect(hrefs.filter((href) => href === item.href)).toHaveLength(1);
    expect(hrefs.length).toBe(all.length + domains.length);
  });
});
