import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CHIZAI2_QUESTIONS as questions } from "@/data/questions/chizai2";
import type { Question } from "@/lib/questions/types";

const access = vi.hoisted(() => ({ entitled: true, gate: false, query: "exam=chizai2" }));
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
  access.query = "exam=chizai2";
});

describe("知財2級の学習モード間で資格と問題集合を保持", () => {
  it("科目省略時は学科を選び、無料試用へ分野条件も引き継ぐ", async () => {
    const normal = await QuizPage({ searchParams: Promise.resolve({ exam: "chizai2", mode: "random" }) });
    assertIds(playerProps(normal).poolIds, questions.filter(q => q.session === "gakka"));
    const stream = await StreamQuizPage({ searchParams: Promise.resolve({ exam: "chizai2" }) });
    const pool = elements(stream).find(node => node.type === StreamQuizLoader)!.props.pool!;
    expect(pool).toHaveLength(60);
    expect(pool.every(q => q.exam === "chizai2" && q.session === "gakka")).toBe(true);
    access.entitled = false;
    const params = { exam: "chizai2", session: "practical", category: questions[0].category, topic: questions[0].topicTags[0], returnTo: "/modes/topic?exam=chizai2" };
    const denied = await StreamQuizPage({ searchParams: Promise.resolve(params) });
    expect(Object.fromEntries(quizLinks(denied)[0].searchParams)).toMatchObject({ ...params, mode: "random" });
  });

  it.each(["gakka", "practical"] as const)("通常→ストリーム→無料試用で%sを保持", async session => {
    const params = { mode: "random", exam: "chizai2", session, returnTo: "/chizai2" };
    access.query = new URLSearchParams(params).toString();
    const normal = await QuizPage({ searchParams: Promise.resolve(params) });
    assertIds(playerProps(normal).poolIds, questions.filter(q => q.session === session));
    expect(playerProps(normal).exam).toBe("chizai2");
    const tabs = elements(normal).find(node => node.type === QuizModeTabs)!;
    const html = renderToStaticMarkup(tabs);
    const document = new DOMParser().parseFromString(html, "text/html");
    const streamHref = document.querySelector<HTMLAnchorElement>('a[href^="/quiz/stream?"]')!.getAttribute("href")!;
    const streamParams = Object.fromEntries(new URL(streamHref, "https://local.invalid").searchParams);
    expect(streamParams).toMatchObject({ exam: "chizai2", session, returnTo: "/chizai2" });
    const expected = filterQuestions(questions, { mode: "random", exam: "chizai2", session })
      .filter(q => (q.requiredSelections ?? 1) === 1).slice(0, 60);
    const stream = await StreamQuizPage({ searchParams: Promise.resolve(streamParams) });
    const loader = elements(stream).find(node => node.type === StreamQuizLoader)!;
    expect(loader.props.pool).toEqual(expected);
    expect(expected.length).toBeGreaterThan(0);
    expect(loader.props.backHref).toBe("/chizai2");

    access.gate = true;
    const gated = await StreamQuizPage({ searchParams: Promise.resolve(streamParams) });
    assertIds(playerProps(gated).poolIds, expected);
    expect(playerProps(gated).exam).toBe("chizai2");

    access.entitled = false;
    const denied = await StreamQuizPage({ searchParams: Promise.resolve(streamParams) });
    const trial = quizLinks(denied)[0];
    expect(Object.fromEntries(trial.searchParams)).toEqual(params);
    const resumed = await QuizPage({ searchParams: Promise.resolve(Object.fromEntries(trial.searchParams)) });
    assertIds(playerProps(resumed).poolIds, questions.filter(q => q.session === session));
  });

  it("年度別への戻り先で知財2級の4期160問と学科・実技を表示", async () => {
    const back = new URL(quizBackHref({ exam: "chizai2", mode: "year" }), "https://local.invalid");
    const params = Object.fromEntries(back.searchParams);
    const page = await YearModePage({ searchParams: Promise.resolve(params) });
    const html = renderToStaticMarkup(page);
    expect(html).toContain("学科");
    expect(html).toContain("実技");
    expect(html).not.toContain("gakka</");
    expect(html).not.toContain("practical</");
    const links = quizLinks(page);
    expect(links).toHaveLength(4);
    const ids: string[] = [];
    for (const link of links) {
      expect(link.searchParams.get("exam")).toBe("chizai2");
      const player = playerProps(await QuizPage({ searchParams: Promise.resolve(Object.fromEntries(link.searchParams)) }));
      expect(player.exam).toBe("chizai2");
      expect(player.backHref).toBe("/modes/year?exam=chizai2");
      expect(player.poolIds).toHaveLength(40);
      ids.push(...player.poolIds!);
    }
    expect(ids.sort()).toEqual(questions.map(q => q.id).sort());
    expect((await yearMetadata({ searchParams: Promise.resolve(params) })).alternates?.canonical).toBe("/modes/year?exam=chizai2");
  });

  it.each(["gakka", "practical"] as const)("分野別への戻り先で%sの80問を保持", async session => {
    const back = new URL(quizBackHref({ exam: "chizai2", mode: "topic" }), "https://local.invalid");
    const params = { ...Object.fromEntries(back.searchParams), session };
    access.query = new URLSearchParams(params).toString();
    const page = await TopicModePage({ searchParams: Promise.resolve(params) });
    const links = quizLinks(page);
    expect(links.length).toBeGreaterThan(0);
    const ids: string[] = [];
    for (const link of links) {
      expect(link.searchParams.get("exam")).toBe("chizai2");
      expect(link.searchParams.get("session")).toBe(session);
      const player = playerProps(await QuizPage({ searchParams: Promise.resolve(Object.fromEntries(link.searchParams)) }));
      expect(player.exam).toBe("chizai2");
      expect(player.backHref).toBe(`/modes/topic?exam=chizai2&session=${session}`);
      ids.push(...player.poolIds!);
    }
    expect(ids.sort()).toEqual(questions.filter(q => q.session === session).map(q => q.id).sort());
    expect((await topicMetadata({ searchParams: Promise.resolve(params) })).alternates?.canonical).toBe("/modes/topic?exam=chizai2");
  });

  it.each(["ap", "invalid-exam"])("既存の%sは応用情報として維持", async exam => {
    access.entitled = false;
    const page = await StreamQuizPage({ searchParams: Promise.resolve({ exam }) });
    expect(quizLinks(page)[0].searchParams.get("exam")).toBe("ap");
    for (const metadata of [yearMetadata, topicMetadata]) {
      expect((await metadata({ searchParams: Promise.resolve({ exam }) })).alternates?.canonical).toMatch(/^\/modes\/(year|topic)$/);
    }
  });
});
