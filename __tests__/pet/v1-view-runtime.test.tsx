import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import * as runtime from "@/lib/pet/v1/runtime";
import { PetProfileStore } from "@/lib/pet/v1/profile-store";
import { readSyncAccount } from "@/lib/sync/ownership";
import { usePetProfileView, type PetCommittedDetail } from "@/components/pet/usePetProfileView";
import type { Question } from "@/lib/questions/types";
import type { PetLearningResult } from "@/lib/pet/v1/learning";
vi.mock("@/lib/sync/ownership", () => ({ readSyncAccount: vi.fn() }));
beforeEach(() => { localStorage.clear(); vi.mocked(readSyncAccount).mockResolvedValue(null); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
const q: Question = { id: "ap-q1", exam: "ap", year: 2023, season: "spring", session: "am", qNumber: 1,
  type: "multiple-choice", category: "test", topicTags: [], difficulty: 1, question: "選んでください", answer: "ア",
  choices: { ア: "一", イ: "二" }, explanation: "学習に使う問題の解説です。", hasImage: false, sourcePdfUrl: "https://example.test/q.pdf", license: "IPA-public" };
async function persist(notify: (result: PetLearningResult) => void) {
  const store = new PetProfileStore({ storage: localStorage, now: Date.now, exclusive: { run: async (_key, work) => work() } });
  const occurredAt = Date.now();
  const status = await runtime.persistPetAttempt({ store, owner: { ownerScope: "guest", isCurrent: () => true, revalidate: async () => true },
    timeZone: "Asia/Tokyo", attempt: { eventId: "one", sessionId: "session", occurredAt, reviewBefore: null },
    context: { source: "question", question: q }, input: { source: "question", questionId: q.id, answer: { kind: "multiple-choice", selected: ["ア"] } },
    notify, legacyRaw: () => null });
  expect(status).toBe("applied"); return occurredAt;
}
function event(result: PetLearningResult, occurredAt: number): PetCommittedDetail {
  return { ownerScope: "guest", qualificationId: "ap", questionId: q.id, eventId: "one", occurredAt, result };
}
it("actual committed revision survives an older in-flight read-only load", async () => {
  const browserStore = runtime.browserPetProfiles(), originalLoad = browserStore.load.bind(browserStore);
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  const load = vi.spyOn(browserStore, "load").mockImplementation(async (owner, zone) => {
    const snapshot = await originalLoad(owner, zone); await pending; return snapshot;
  });
  vi.spyOn(runtime, "browserPetProfiles").mockReturnValue(browserStore);
  const fresh = vi.fn(), hook = renderHook(() => usePetProfileView(fresh));
  await waitFor(() => expect(load).toHaveBeenCalledTimes(1));
  let saved!: PetLearningResult;
  const occurredAt = await persist(result => { saved = result; });
  act(() => window.dispatchEvent(new CustomEvent("pet-v1:committed", { detail: event(saved, occurredAt) })));
  await act(async () => { release(); });
  expect(saved.document.revision).toBe(1);
  expect(hook.result.current.document?.revision).toBe(1);
  expect(hook.result.current.document?.profiles[0].growth).toBe(3);
  expect(fresh).toHaveBeenCalledTimes(1);
});
it("loading the actual saved snapshot before its notification still permits the one fresh reaction", async () => {
  const fresh = vi.fn(), hook = renderHook(() => usePetProfileView(fresh));
  await waitFor(() => expect(hook.result.current.status).toBe("ready"));
  let saved!: PetLearningResult;
  const occurredAt = await persist(result => { saved = result; });
  act(() => window.dispatchEvent(new Event("focus")));
  await waitFor(() => expect(hook.result.current.document?.revision).toBe(1));
  act(() => window.dispatchEvent(new CustomEvent("pet-v1:committed", { detail: event(saved, occurredAt) })));
  expect(fresh).toHaveBeenCalledTimes(1);
});
