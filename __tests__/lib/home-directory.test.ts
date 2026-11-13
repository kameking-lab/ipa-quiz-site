import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { EXAM_QUESTION_COUNTS } from "@/lib/constants/exam-question-counts";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { QUALIFICATION_HUBS, qualificationHubPath } from "@/lib/exam-qualification-hubs";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_EXAM_CODES } from "@/lib/exam-config";
import { EXAM_CATALOG, EXAM_LIBRARY_PATH } from "@/lib/exam-library-catalog";
import { getExamPaperStats } from "@/lib/exam-library-papers";
import { qualificationHubForEntry } from "@/lib/exam-qualification-hubs";
import { frequentExamKeys, HOME_EXAM_CALENDAR, upcomingExamPicks } from "@/lib/home/featured-exams";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";

describe("home directory", () => {
  const domains = getHomeDirectory();
  const all = domains.flatMap((d) => [...d.featured, ...d.compact]);

  it("covers at least forty published qualifications with official statistics and retains dynamic eligibility", () => {
    const published = new Set(all.map(item => item.key));
    const covered = HOME_EXAM_CALENDAR.filter(row => published.has(row.key) && row.candidates !== null);
    expect(covered.length).toBeGreaterThanOrEqual(40);
    for (const key of ["takken", "fp2", "fp3", "ip", "denko2", "denken3", "chintai", "tohan", "caremanager", "dai-1-shu-eisei-kanrisha", "kanri", "kikenbutsu-otsu4"]) {
      expect(covered.some(row => row.key === key), key).toBe(true);
    }
    expect(upcomingExamPicks([...published], [], new Date("2026-11-13T03:00:00Z")).map(row => row.key)).toEqual(["kikenbutsu-otsu4", "ap", "kaigo"]);
    expect(all.some(item => item.key.startsWith("boki"))).toBe(false);
  });

  it("resolves actual history IDs for every registered question exam, including legacy prefixes", () => {
    const aliases = Object.fromEntries(all.flatMap(item => (item.historyPrefixes ?? []).map(prefix => [prefix, item.key])));
    for (const code of Object.keys(EXAM_QUESTION_COUNTS)) {
      const item = all.find(item => item.key === code);
      if (!item) continue; // Hygiene's canonical library hubs are tested below.
      const question = getQuestionsByExamStrict(code as keyof typeof EXAM_QUESTION_COUNTS)[0];
      if (!question) continue;
      expect(frequentExamKeys([{ id: question.id, at: 1 }], all.map(item => item.key), aliases), code).toEqual([item.key]);
    }
  });

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

  it("links every official-paper hub in its field and keeps hygiene hubs unique", () => {
    const safety = domains.find((d) => d.id === "safety");
    const featured = safety?.featured ?? [];
    const hrefs = featured.map((item) => item.href);
    for (const hub of QUALIFICATION_HUBS) {
      const group = domains.find(domain => domain.id === (hub.slug === "survey-assistant" ? "construction" : "safety"))!;
      expect(group.featured.filter(item => item.href === qualificationHubPath(hub.slug))).toHaveLength(1);
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

  it("places engineering first-stage library subjects in their field instead of safety", () => {
    const library = domains.flatMap(domain => domain.compact.map(item => ({ domain: domain.id, item }))).filter(({ item }) => item.key.startsWith("pe-first-"));
    expect(library.length).toBeGreaterThan(0);
    for (const { domain, item } of library) {
      expect(domain).toBe(item.name.includes("情報工学") ? "it" : item.name.includes("電気電子") ? "electrical" : "construction");
    }
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

  it("covers every published exam and library subject exactly once", () => {
    const hrefs = all.map(item => item.href);
    const hygieneHubs = { eisei1: "dai-1-shu-eisei-kanrisha", eisei2: "dai-2-shu-eisei-kanrisha" };
    for (const [code, count] of Object.entries(EXAM_QUESTION_COUNTS)) {
      if (!count) continue;
      const hub = hygieneHubs[code as keyof typeof hygieneHubs];
      const href = hub ? qualificationHubPath(hub) : `/${code}`;
      expect(hrefs.filter(value => value === href), code).toHaveLength(1);
    }
    for (const entry of EXAM_CATALOG) {
      if (!getExamPaperStats(entry.id)) continue;
      const hub = qualificationHubForEntry(entry);
      const href = hub ? qualificationHubPath(hub.slug)
        : `${EXAM_LIBRARY_PATH}?group=${entry.group}&subject=${encodeURIComponent(entry.subject)}`;
      expect(hrefs.filter(value => value === href), entry.id).toHaveLength(1);
    }
  });

  it("shows the current partial OT and orthoptist counts in their cards", () => {
    for (const [code, count] of [["sagyo-ryohoshi", 324], ["shino-kunrenshi", 220]] as const) {
      const item = all.find((entry) => entry.key === code);
      expect(item?.questionCount).toBe(count);
      expect(item?.sub).toContain(`${count}原問`);
      expect(item?.sub).toContain("部分収録");
    }
  });

  it("keeps every qualification in the initial HTML inside collapsed category disclosures", () => {
    const html = renderToStaticMarkup(createElement(HomeDirectory, { domains }));
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll("details")).toHaveLength(domains.length);
    expect(doc.querySelectorAll("details[open]")).toHaveLength(0);
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]?.replaceAll("&amp;", "&"));
    for (const item of all) expect(hrefs.filter((href) => href === item.href)).toHaveLength(1);
    expect(hrefs.length).toBe(all.length + domains.length);
  });

  it("classifies registered qualifications by the catalog, including older cards", () => {
    const findDomain = (key: string) => domains.find(domain => [...domain.featured, ...domain.compact].some(item => item.key === key))?.id;
    for (const key of ["takken", "mankan", "kanri", "kanteishi"]) expect(findDomain(key)).toBe("real-estate");
    for (const key of ["gyosei", "sharoushi", "benrishi", "chizai2", "tsukanshi"]) expect(findDomain(key)).toBe("legal");
    expect(findDomain("fp3")).toBe("money");
    // The same catalog-domain mapping used for new qualifications covers every registered live exam.
    const expected = { "information-technology": "it", finance: "money", accounting: "money", "real-estate": "real-estate", legal: "legal", construction: "construction", electrical: "electrical", safety: "safety", welfare: "welfare", pharmacy: "welfare", "personal-services": "welfare", automotive: "automotive" };
    for (const entry of QUALIFICATION_CATALOG.filter(entry => entry.status === "live" && entry.examCode && !["eisei1", "eisei2"].includes(entry.examCode))) {
      expect(findDomain(entry.examCode!), entry.examCode).toBe(expected[entry.domain]);
    }
  });
});

it("土地家屋調査士の最新2回66原問への入口を表示する", () => {
  const item = getHomeDirectory().flatMap(d => [...d.featured, ...d.compact]).find(entry => entry.key === "chosashi");
  expect(item?.href).toBe("/chosashi");
  expect(item?.questionCount).toBe(66);
  expect(item?.periodLabel).toBe("2期分");
});
