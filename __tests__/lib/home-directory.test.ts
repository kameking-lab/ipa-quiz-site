import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { EXAM_QUESTION_COUNTS } from "@/lib/constants/exam-question-counts";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { QUALIFICATION_HUBS, qualificationHubPath } from "@/lib/exam-qualification-hubs";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_EXAM_CODES } from "@/lib/exam-config";

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
    const items = [...(it?.featured ?? []), ...(it?.compact ?? [])].filter(item => (ALL_EXAM_CODES as string[]).includes(item.key));
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
      expect(chip.href).toMatch(/^\/e-learning\/exams\?group=(?:lckohyo|pe-first)&subject=/);
      expect(chip.periodLabel).toMatch(/^[1-9]\d*回分$/);
    }
  });

  it("shows only live external qualifications", () => {
    const external = all.filter(item => QUALIFICATION_CATALOG.some(entry => entry.status === "live" && (entry.examCode ?? entry.slug) === item.href.slice(1)));
    const live = QUALIFICATION_CATALOG.filter((q) => q.status === "live" && !["eisei1", "eisei2"].includes(q.examCode ?? "") && (q.examCode || q.slug === "chusho-secondary")).map((q) => `/${q.examCode ?? q.slug}`);
    expect(external.map((i) => i.href).sort()).toEqual([...live].sort());
  });

  it("offers the dentist corpus with its actual published count", () => {
    const dentist = all.find((item) => item.key === "shika-ishi");
    expect(dentist?.href).toBe("/shika-ishi");
    expect(dentist?.questionCount).toBe(726);
    expect(dentist?.periodLabel).toBe("5期分");
  });

  it("links the three Riyoshi papers with the published question count", () => {
    const item = all.find((entry) => entry.key === "riyoshi");
    expect(item?.href).toBe("/riyoshi");
    expect(item?.questionCount).toBe(165);
    expect(item?.periodLabel).toBe("3期分");
    expect(item?.sub).toContain("全165原問・全肢解説");
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
    for (const [code, count] of [["sagyo-ryohoshi", 324], ["shino-kunrenshi", 220]] as const) {
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

it("土地家屋調査士の最新2回66原問への入口を表示する", () => {
  const item = getHomeDirectory().flatMap(d => [...d.featured, ...d.compact]).find(entry => entry.key === "chosashi");
  expect(item?.href).toBe("/chosashi");
  expect(item?.questionCount).toBe(66);
  expect(item?.periodLabel).toBe("2期分");
});
