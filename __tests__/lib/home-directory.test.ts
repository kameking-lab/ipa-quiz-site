import { describe, expect, it } from "vitest";
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
    const hrefs = new Set(safety?.featured.map((i) => i.href));
    for (const hub of QUALIFICATION_HUBS) expect(hrefs).toContain(qualificationHubPath(hub.slug));
    for (const chip of safety?.compact ?? []) {
      expect(chip.href).toMatch(/^\/e-learning\/exams\?group=lckohyo&subject=/);
      expect(chip.periodLabel).toMatch(/^[1-9]\d*回分$/);
    }
  });

  it("shows only live external qualifications", () => {
    const external = domains.filter((d) => !["it", "safety"].includes(d.id)).flatMap((d) => d.featured);
    const live = QUALIFICATION_CATALOG.filter((q) => q.status === "live" && q.examCode).map((q) => `/${q.examCode}`);
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
});
