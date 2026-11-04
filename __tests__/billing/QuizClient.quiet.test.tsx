import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const observed = vi.hoisted(() => ({ player: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }) }));
vi.mock("@/components/quiz/QuizPlayer", () => ({ QuizPlayer: (props: { quiet?: boolean }) => { observed.player(props); return null; } }));
import { QuizClient } from "@/app/quiz/QuizClient";
import { FE_QUESTIONS_2009_AUTUMN_AM } from "@/data/questions/fe/by-year/2009-autumn-am";
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); observed.player.mockClear(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it.each([false, true])("keeps quiet presentation scoped to the configured practice gate: %s", async enabled => {
  const question = FE_QUESTIONS_2009_AUTUMN_AM[0];
  vi.stubGlobal("fetch", vi.fn(async () => Response.json(enabled ? { question, access: { kind: "guest", remaining: 9, freeDaily: 10, resetAt: "2026-11-05T15:00:00Z", retryAfter: null } } : question)));
  render(<QuizClient billingGateEnabled={enabled} poolIds={[question.id]} mode="year" exam="fe" />);
  await waitFor(() => expect(observed.player).toHaveBeenLastCalledWith(expect.objectContaining({ quiet: enabled })));
});
