import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const observed = vi.hoisted(() => ({ player: vi.fn(), native: false }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }) }));
vi.mock("@/components/quiz/QuizPlayer", () => ({ QuizPlayer: (props: { quiet?: boolean }) => { observed.player(props); return null; } }));
vi.mock("@/mobile/shared/contracts", () => ({ nativeClient: () => observed.native, NATIVE_HEADER: "X-Kakomon-Native" }));
import { QuizClient } from "@/app/quiz/QuizClient";
import { FE_QUESTIONS_2009_AUTUMN_AM } from "@/data/questions/fe/by-year/2009-autumn-am";
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); observed.player.mockClear(); observed.native = false; });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it.each([[false, false], [true, false], [false, true], [true, true]])("keeps quiet presentation scoped to gated or native practice: gate=%s native=%s", async (enabled, native) => {
  observed.native = native;
  const question = FE_QUESTIONS_2009_AUTUMN_AM[0];
  vi.stubGlobal("fetch", vi.fn(async () => Response.json(enabled || native ? { question, access: { kind: "guest", remaining: 9, freeDaily: 10, resetAt: "2026-11-05T15:00:00Z", retryAfter: null } } : question)));
  render(<QuizClient billingGateEnabled={enabled} poolIds={[question.id]} mode="year" exam="fe" backHref="/fe" />);
  await waitFor(() => expect(observed.player).toHaveBeenLastCalledWith(expect.objectContaining({ quiet: enabled || native })));
});
