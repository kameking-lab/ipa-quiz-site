import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KISHO_QUESTIONS as questions } from "@/data/questions/kisho";
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
import YearModePage, { generateMetadata as yearMetadata } from "@/app/modes/year/page";
import TopicModePage, { generateMetadata as topicMetadata } from "@/app/modes/topic/page";
import { QuizClient } from "@/app/quiz/QuizClient";
import { QuizModeTabs } from "@/components/quiz/QuizModeTabs";
import { StreamQuizLoader } from "@/components/quiz/stream/StreamQuizLoader";
import { filterQuestions } from "@/lib/questions/filter";
import { quizBackHref } from "@/lib/questions/practice-session";

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
  it.each(["ippan", "senmon"])("keeps %s in normal and stream player pools", async session => {
    const params = { exam: "kisho", session, mode: "random" };
    const normal = await QuizPage({ searchParams: Promise.resolve(params) });
    assertIds(playerProps(normal).poolIds, questions.filter(q => q.session === session));
    const stream = await StreamQuizPage({ searchParams: Promise.resolve(params) });
    const pool = elements(stream).find(node => node.type === StreamQuizLoader)!.props.pool!;
    expect(pool).toHaveLength(30);
    expect(pool.every(q => q.exam === "kisho" && q.session === session)).toBe(true);
  });
  it("retains all 60 academic originals through year and topic links", async () => {
    for (const Page of [YearModePage, TopicModePage]) {
      const tree = await Page({ searchParams: Promise.resolve({ exam: "kisho" }) });
      const links = quizLinks(tree);
      expect(links.length).toBeGreaterThan(0);
      const ids: string[] = [];
      for (const link of links) {
        expect(link.searchParams.get("exam")).toBe("kisho");
        const quiz = await QuizPage({ searchParams: Promise.resolve(Object.fromEntries(link.searchParams)) });
        ids.push(...playerProps(quiz).poolIds!);
      }
      expect(new Set(ids)).toEqual(new Set(questions.map(q => q.id)));
    }
    const year = await YearModePage({ searchParams: Promise.resolve({ exam: "kisho" }) });
    const html = renderToStaticMarkup(year);
    expect(html).toContain("????");
    expect(html).toContain("????");
  });
});
