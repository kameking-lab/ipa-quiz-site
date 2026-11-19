import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KISHO_QUESTIONS as questions } from "@/data/questions/kisho";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import type { Question } from "@/lib/questions/types";

const access = vi.hoisted(() => ({ entitled: true, gate: false, query: "exam=kisho" }));
vi.mock("@/lib/billing/stream-access", () => ({ streamAccess: async () => access.entitled }));
vi.mock("@/lib/billing/practice-access", () => ({ practiceGateEnabled: () => access.gate }));
vi.mock("@/app/quiz/QuizClient", () => ({ QuizClient: () => null }));
vi.mock("@/components/quiz/stream/StreamQuizLoader", () => ({ StreamQuizLoader: () => null }));
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(access.query),
  usePathname: () => "/quiz",
  redirect: vi.fn(),
}));

import QuizPage from "@/app/quiz/page";
import StreamQuizPage from "@/app/quiz/stream/page";
import YearModePage from "@/app/modes/year/page";
import TopicModePage from "@/app/modes/topic/page";
import { QuizClient } from "@/app/quiz/QuizClient";
import { StreamQuizLoader } from "@/components/quiz/stream/StreamQuizLoader";

interface Props {
  children?: ReactNode;
  href?: string;
  poolIds?: string[];
  pool?: Question[];
  exam?: string;
  backHref?: string;
}
function elements(tree: ReactNode): ReactElement<Props>[] {
  return Children.toArray(tree).flatMap(node => isValidElement<Props>(node)
    ? [node, ...elements(node.props.children)] : []);
}
function quizLinks(tree: ReactNode) {
  return elements(tree).flatMap(node => node.props.href?.startsWith("/quiz?")
    ? [new URL(node.props.href, "https://local.invalid")] : []);
}
function playerProps(tree: ReactNode) {
  const node = elements(tree).find(node => node.type === QuizClient);
  expect(node).toBeDefined();
  return node!.props;
}
function assertIds(ids: string[] | undefined, expected: Question[]) {
  expect(ids).toEqual(expected.map(q => q.id));
  expect(ids!.length).toBeGreaterThan(0);
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(Math, "random").mockReturnValue(0.5);
  access.entitled = true;
  access.gate = false;
  access.query = "exam=kisho";
});

describe("weather learning routes retain exam and official subject", () => {
  it("accepts either of the two official answers to round 59 specialist question 8", () => {
    const question = questions.find(q => q.id === "kisho-59-senmon-q08")!;
    for (const choice of ["エ", "オ"]) {
      expect(isCompleteSelectionCorrect(question.answer, [choice], question.requiredSelections)).toBe(true);
    }
    expect(isCompleteSelectionCorrect(question.answer, ["エ", "オ"], question.requiredSelections)).toBe(false);
  });

  it.each([["ippan", 60], ["senmon", 60], ["pm1", 8], ["pm2", 7]])("keeps %s in normal and stream player pools", async (session, streamCount) => {
    const params = { exam: "kisho", session, mode: "random" };
    const normal = await QuizPage({ searchParams: Promise.resolve(params) });
    assertIds(playerProps(normal).poolIds, questions.filter(q => q.session === session));
    const stream = await StreamQuizPage({ searchParams: Promise.resolve(params) });
    const pool = elements(stream).find(node => node.type === StreamQuizLoader)!.props.pool!;
    expect(pool).toHaveLength(streamCount);
    expect(pool.every(q => q.exam === "kisho" && q.session === session)).toBe(true);
  });
  it("retains academic papers by year and all papers by topic", async () => {
    for (const Page of [YearModePage, TopicModePage]) {
      const trees = Page === TopicModePage
        ? await Promise.all(["ippan", "senmon", "pm1", "pm2"].map(session => Page({ searchParams: Promise.resolve({ exam: "kisho", session }) })))
        : [await Page({ searchParams: Promise.resolve({ exam: "kisho" }) })];
      const links = trees.flatMap(quizLinks);
      expect(links.length).toBeGreaterThan(0);
      const ids: string[] = [];
      for (const link of links) {
        expect(link.searchParams.get("exam")).toBe("kisho");
        const quiz = await QuizPage({ searchParams: Promise.resolve(Object.fromEntries(link.searchParams)) });
        ids.push(...playerProps(quiz).poolIds!);
      }
      const expected = Page === YearModePage ? questions.filter(q => q.type === "multiple-choice") : questions;
      expect(new Set(ids)).toEqual(new Set(expected.map(q => q.id)));
    }
    const year = await YearModePage({ searchParams: Promise.resolve({ exam: "kisho" }) });
    const html = renderToStaticMarkup(year);
    expect(html).toContain("\u5b66\u79d1\u4e00\u822c");
    expect(html).toContain("\u5b66\u79d1\u5c02\u9580");
  });
});
