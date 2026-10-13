import { createElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { buildPersonalPriority } from "@/lib/home/home-personal-priority";
import type { HomeDirectoryDomain, HomeDirectoryItem } from "@/lib/home/home-directory";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { qualificationHubForEntry } from "@/lib/exam-qualification-hubs";
import { LS_KEYS } from "@/lib/storage/keys";
import { writeSettings } from "@/lib/storage/settings";

const items: HomeDirectoryItem[] = [
  { key: "fp2", name: "FP2級", href: "/fp2", questionCount: 10, periodLabel: "1回分" },
  { key: "fp3", name: "FP3級", href: "/fp3", questionCount: 10, periodLabel: "1回分" },
];
const domains: HomeDirectoryDomain[] = [{
  id: "money", title: "お金", lead: "", allHref: "/qualifications", allLabel: "全資格を見る",
  featured: items, compact: [], totalQuestions: 20, qualificationCount: 2,
}];
const now = Date.UTC(2026, 9, 13);

afterEach(() => { cleanup(); localStorage.clear(); });

describe("personal qualification priority", () => {
  it("shows due questions first, then actual recent study, and rejects unknown or future data", () => {
    const priorities = buildPersonalPriority(domains, {
      history: [
        { id: "fp2-2026-published-gakka-q1", at: now - 1000 },
        { id: "fp3-2026-published-gakka-q1", at: now - 2000 },
        { id: "fp4-2026-published-gakka-q1", at: now - 100 },
        { id: "fp2-2026-published-gakka-q2", at: now + 100 },
      ],
      due: [{ id: "fp3-2026-published-gakka-q1", dueAt: now - 1 }, { id: "fp2-2026-published-gakka-q2", dueAt: now + 1 }],
      papers: [],
    }, now);
    expect(priorities.map(({ item, dueCount }) => [item.key, dueCount])).toEqual([["fp3", 1], ["fp2", 0]]);
  });

  it("maps a known official paper to its exact published qualification hub", () => {
    const paper = EXAM_CATALOG.find((entry) => qualificationHubForEntry(entry));
    expect(paper).toBeDefined();
    const hub = qualificationHubForEntry(paper!);
    const safety: HomeDirectoryDomain = {
      ...domains[0]!, id: "safety", featured: [{ key: hub!.slug, name: hub!.name, href: `/e-learning/exams/qualifications/${hub!.slug}`, questionCount: 1, periodLabel: "1回分" }],
    };
    const priorities = buildPersonalPriority([safety], {
      history: [{ id: `${paper!.id}-q1`, at: now - 1000 }],
      due: [{ id: `${paper!.id}-q1`, dueAt: now - 1 }],
      papers: [{ examId: paper!.id, answered: 1, updatedAt: new Date(now - 500).toISOString() }],
    }, now);
    expect(priorities).toMatchObject([{ item: { key: hub!.slug }, dueCount: 1, lastStudiedAt: now - 500 }]);
  });

  it("leaves the entire directory in original order when history recording is off", () => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: "fp3-2026-published-gakka-q1", selected: "a", correct: false, at: now - 1000 }], starredIds: [] }));
    writeSettings({ randomizeChoices: false, excludeRecent: false, calculationOnly: false, recordHistory: false });
    render(createElement(HomeDirectory, { domains }));
    expect(screen.queryByRole("heading", { name: "あなたの学習" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "全資格を見る" })).toHaveAttribute("href", "/qualifications");
    expect(screen.getAllByRole("link").filter((link) => ["/fp2", "/fp3"].includes(link.getAttribute("href") ?? "")).map((link) => link.getAttribute("href"))).toEqual(["/fp2", "/fp3"]);
  });

  it("keeps an anonymous empty-storage visit on the full unpersonalized directory", () => {
    render(createElement(HomeDirectory, { domains }));
    expect(screen.queryByRole("heading", { name: "あなたの学習" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link").filter((link) => ["/fp2", "/fp3"].includes(link.getAttribute("href") ?? "")).map((link) => link.getAttribute("href"))).toEqual(["/fp2", "/fp3"]);
    expect(screen.getByRole("link", { name: "全資格を見る" })).toBeInTheDocument();
  });

  it("puts the actually studied qualification first without hiding the full directory", () => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: "fp3-2026-published-gakka-q1", selected: "a", correct: true, at: Date.now() - 1000 }], starredIds: [] }));
    render(createElement(HomeDirectory, { domains }));
    expect(screen.getByRole("heading", { name: "あなたの学習" })).toBeInTheDocument();
    const personal = screen.getByRole("heading", { name: "あなたの学習" }).closest("section")!;
    expect(personal.querySelector("a")?.getAttribute("href")).toBe("/fp3");
    expect(screen.getAllByRole("link").filter((link) => ["/fp2", "/fp3"].includes(link.getAttribute("href") ?? "")).map((link) => link.getAttribute("href"))).toEqual(["/fp3", "/fp3", "/fp2"]);
    expect(screen.getByRole("link", { name: "全資格を見る" })).toHaveAttribute("href", "/qualifications");
  });

  it("ignores null and numeric history IDs while retaining valid study", () => {
    const saved = JSON.stringify({ entries: [null, { id: 123, at: Date.now() - 1000 }, { id: "fp3-2026-published-gakka-q1", at: Date.now() - 1000 }], starredIds: [] });
    localStorage.setItem(LS_KEYS.history, saved);
    render(createElement(HomeDirectory, { domains }));
    expect(screen.getByRole("heading", { name: "あなたの学習" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /FP3級.*最近学習した資格/ })).toHaveAttribute("href", "/fp3");
    expect(localStorage.getItem(LS_KEYS.history)).toBe(saved);
  });

  it("falls back to the full ordinary directory when a corrupt SRS card makes storage reading fail", () => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: "fp3-2026-published-gakka-q1", at: Date.now() - 1000 }], starredIds: [] }));
    const saved = JSON.stringify({ cards: { bad: null } });
    localStorage.setItem(LS_KEYS.spacedRepetition, saved);
    render(createElement(HomeDirectory, { domains }));
    expect(screen.queryByRole("heading", { name: "あなたの学習" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link").filter((link) => ["/fp2", "/fp3"].includes(link.getAttribute("href") ?? "")).map((link) => link.getAttribute("href"))).toEqual(["/fp2", "/fp3"]);
    expect(localStorage.getItem(LS_KEYS.spacedRepetition)).toBe(saved);
  });

  it("does not invent a due qualification from a numeric SRS question ID", () => {
    localStorage.setItem(LS_KEYS.spacedRepetition, JSON.stringify({ cards: { bad: { id: 123, dueAt: Date.now() - 1000 } } }));
    render(createElement(HomeDirectory, { domains }));
    expect(screen.queryByRole("heading", { name: "あなたの学習" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "全資格を見る" })).toBeInTheDocument();
  });
});
