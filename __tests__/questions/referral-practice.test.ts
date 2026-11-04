import { expect, it } from "vitest";
import { referralPracticeHref } from "@/lib/questions/referral-practice";
import { FP3_QUESTIONS } from "@/data/questions/fp3";
import { getPoolIds } from "@/lib/questions/pool-server";
import type { QuizFilter } from "@/lib/questions/types";

it("retains exam, year, season, session, first question and category for the entire practice pool", async () => {
  const scoped = FP3_QUESTIONS.filter(q => q.year === 2024 && q.season === "published");
  const category = scoped[0].category;
  const href = referralPracticeHref(scoped.filter(q => q.category === category), "/fp3/topic/example", category);
  expect(href).not.toBeNull();
  const params = new URL(href!, "http://localhost").searchParams;
  const filter: QuizFilter = { mode: "year", exam: "fp3", year: Number(params.get("year")),
    season: params.get("season") as QuizFilter["season"], session: params.get("session") as QuizFilter["session"], category };
  const ids = await getPoolIds(filter);
  expect(ids.length).toBeGreaterThan(0);
  expect(ids).toContain(params.get("question"));
  expect(ids.every(id => scoped.some(q => q.id === id && q.category === category))).toBe(true);
  expect(params.get("order")).toBe("1");
  expect(params.get("returnTo")).toBe("/fp3/topic/example");
});
it("does not send empty corpora to a different qualification", () => {
  expect(referralPracticeHref([], "/fp3")).toBeNull();
});
