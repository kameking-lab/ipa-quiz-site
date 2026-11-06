import { beforeEach, expect, it, vi } from "vitest";
import type { Question } from "@/lib/questions/types";
import { PetProfileStore } from "@/lib/pet/v1/profile-store";
import { persistPetAttempt, preparePetOwner } from "@/lib/pet/v1/runtime";
import { petProfileStorageKey } from "@/lib/pet/v1/profile";
import { LS_KEYS } from "@/lib/storage/keys";
import { readSyncAccount } from "@/lib/sync/ownership";
import { validateLocalPetLearningSubmission } from "@/lib/pet/submission-validation";
import { recordReview } from "@/lib/learning/spaced-repetition";
vi.mock("@/lib/sync/ownership", () => ({ readSyncAccount: vi.fn() }));

const q: Question = { id: "ap-2023h-am-q1", exam: "ap", year: 2023, season: "spring", session: "am", qNumber: 1,
  type: "multiple-choice", category: "test", topicTags: [], difficulty: 1, question: "選択してください", answer: "ア",
  choices: { ア: "一", イ: "二", ウ: "三", エ: "四" }, explanation: "これは学習のための正答の説明です。", hasImage: false,
  sourcePdfUrl: "https://example.test/q.pdf", license: "IPA-public" };
const input = { source: "question" as const, questionId: q.id, answer: { kind: "multiple-choice" as const, selected: ["ア"] } };
const at = Date.parse("2026-11-05T12:00:00+09:00");
function fixture() {
  let current = true, fail = false, checks = 0;
  const data = new Map<string, string>();
  const notify = vi.fn();
  let beforeLock = () => {};
  const store = new PetProfileStore({ now: () => at, storage: {
    getItem: key => data.get(key) ?? null,
    setItem: (key, raw) => { if (fail) throw new Error("quota"); data.set(key, raw); },
  }, exclusive: { run: async (_key, operation) => { beforeLock(); return operation(); } } });
  const owner = { ownerScope: "guest", isCurrent: () => current, revalidate: async () => { checks++; return current; } };
  const options = { owner, store, timeZone: "Asia/Tokyo", input, context: { source: "question" as const, question: q },
    attempt: { eventId: "event-1", sessionId: "session-1", occurredAt: at, reviewBefore: null }, notify,
    legacyRaw: () => data.get(LS_KEYS.petLearning) ?? null };
  return { data, notify, options, switchOwner: () => { current = false; }, fail: () => { fail = true; }, checks: () => checks,
    beforeLock: (fn: () => void) => { beforeLock = fn; } };
}
beforeEach(() => { localStorage.clear(); vi.mocked(readSyncAccount).mockReset(); });
it("writes only v1 once and notifies only after a successful commit; reload does not notify", async () => {
  const f = fixture();
  expect(await persistPetAttempt(f.options)).toBe("applied");
  expect(f.notify).toHaveBeenCalledTimes(1);
  expect(f.notify.mock.calls[0][0].reward.growth).toBe(3);
  expect(f.notify.mock.calls[0][0].document.revision).toBe(1);
  expect(f.notify.mock.calls[0][0].document).toEqual((await f.options.store.load(f.options.owner, "Asia/Tokyo") as { document: unknown }).document);
  expect(await persistPetAttempt(f.options)).toBe("duplicate");
  await f.options.store.load(f.options.owner, "UTC");
  expect(f.notify).toHaveBeenCalledTimes(1);
  expect([...f.data.keys()]).toEqual([petProfileStorageKey("guest")]);
  expect(f.checks()).toBe(6);
});
it("migrates understood legacy identities without touching the old document or farming its first answer", async () => {
  const f = fixture();
  const raw = JSON.stringify({ version: 1, ownership: "device-guest", answers: [JSON.stringify(["ap", q.id])], food: 1, meals: 0, outfit: "none" });
  f.data.set(LS_KEYS.petLearning, raw);
  await persistPetAttempt(f.options);
  expect(f.data.get(LS_KEYS.petLearning)).toBe(raw);
  expect(f.notify.mock.calls[0][0].reward.growth).toBe(0);
  expect(f.notify.mock.calls[0][0].document.legacyMigration.raw).toBe(raw);
});
it("does not notify/write on quota failures, corrupt legacy or stale owners waiting on the lock", async () => {
  const f = fixture(); f.fail(); expect(await persistPetAttempt(f.options)).toBe("storage_error"); expect(f.notify).not.toHaveBeenCalled();
  const corrupt = fixture(); corrupt.data.set(LS_KEYS.petLearning, "{broken");
  expect(await persistPetAttempt(corrupt.options)).toBe("invalid_data"); expect(corrupt.notify).not.toHaveBeenCalled();
  const switched = fixture(); switched.beforeLock(switched.switchOwner);
  expect(await persistPetAttempt(switched.options)).toBe("owner_changed"); expect(switched.data.size).toBe(0);
});
it("records reveal as reading, without growth, correctness, history or a new SRS review", async () => {
  const f = fixture(); expect(await persistPetAttempt({ ...f.options, input: null })).toBe("applied");
  expect(f.notify.mock.calls[0][0]).toMatchObject({ reaction: "read", reward: { growth: 0, bond: 0 } });
  await persistPetAttempt({ ...f.options, attempt: { ...f.options.attempt, eventId: "answer-after-reveal" } });
  expect(f.notify.mock.calls[1][0].reward.growth).toBe(0);
  expect(localStorage.getItem(LS_KEYS.spacedRepetition)).toBeNull();
});
it("does not infer self assessment, hidden content or reference-only reading as a scored event", async () => {
  for (const patch of [{ type: "descriptive" as const }, { needsReview: true }, { publicAllowed: false }]) {
    const f = fixture();
    expect(await persistPetAttempt({ ...f.options, context: { source: "question", question: { ...q, ...patch } } })).toBe("invalid");
    expect(f.data.size).toBe(0);
  }
});
it("uses the original pre-write SRS snapshot with no extra read, even when the callback fails", () => {
  const before = { id: q.id, ef: 2.5, reps: 1, intervalDays: 1, lastReviewedAt: at - 86400000, dueAt: at };
  localStorage.setItem(LS_KEYS.spacedRepetition, JSON.stringify({ cards: { [q.id]: before } }));
  const observer = vi.fn(() => { throw new Error("optional"); });
  const updated = recordReview(q.id, true, undefined, observer);
  expect(observer).toHaveBeenCalledWith({ lastReviewedAt: before.lastReviewedAt, dueAt: before.dueAt });
  expect(updated.lastReviewedAt).toBeGreaterThan(before.lastReviewedAt);
});
it("matches all permitted answer combinations and rejects incomplete/duplicate picks", () => {
  const question = { ...q, answer: ["ア", "イ"], requiredSelections: 2, acceptedAnswerCombinations: [["ア", "イ"], ["ウ"]] } satisfies Question;
  const grade = (selected: string[]) => validateLocalPetLearningSubmission({ ...input, answer: { kind: "multiple-choice", selected } }, { source: "question", question })?.grade;
  expect(grade(["ウ"])).toBe("correct"); expect(grade(["ア", "イ"])).toBe("correct");
  expect(grade(["ア"])).toBe("incorrect"); expect(grade([])).toBeUndefined(); expect(grade(["ア", "ア"])).toBeUndefined();
});
it("does not adopt the sync owner's account, or fall back to guest on unavailable auth", async () => {
  localStorage.setItem(LS_KEYS.syncLocalOwner, JSON.stringify({ userId: "old", token: "one" }));
  vi.mocked(readSyncAccount).mockResolvedValue({ id: "new", label: "New" });
  const owner = await preparePetOwner(() => true);
  expect(owner?.ownerScope).toBe("user:new");
  vi.mocked(readSyncAccount).mockRejectedValue(new Error("offline"));
  expect(await preparePetOwner(() => true)).toBeNull(); expect(await owner?.revalidate()).toBe(false);
});
it("rejects a delayed session reply and an owner/token change after preparation", async () => {
  let current = true;
  vi.mocked(readSyncAccount).mockImplementation(async () => { current = false; return null; });
  expect(await preparePetOwner(() => current)).toBeNull();
  vi.mocked(readSyncAccount).mockResolvedValue(null);
  const owner = await preparePetOwner(() => true); expect(owner?.ownerScope).toBe("guest");
  localStorage.setItem(LS_KEYS.syncLocalOwner, "new-token"); expect(owner?.isCurrent()).toBe(false);
});
it("grades only complete current-format mock answers, retaining canonical qualification across sources", async () => {
  const f = fixture();
  const question = { id: q.id, question: q.question, choices: q.choices!, answer: q.answer, category: q.category,
    petContext: { qualificationId: "ap" as const, eligible: true, contentVersion: "mock-projection-v1" } };
  expect(await persistPetAttempt({ ...f.options, context: { source: "mock", question } })).toBe("applied");
  expect(f.notify.mock.calls[0][0].document.profiles[0].qualificationId).toBe("ap");
  // The same answer reached through regular practice must not reward again.
  await persistPetAttempt({ ...f.options, attempt: { ...f.options.attempt, eventId: "other-source" } });
  expect(f.notify.mock.calls[1][0].reward.growth).toBe(0);
  const old = fixture();
  expect(await persistPetAttempt({ ...old.options, context: { source: "mock", question: { ...question, petContext: undefined } } })).toBe("unsupported");
  expect(old.data.size).toBe(0);
});
