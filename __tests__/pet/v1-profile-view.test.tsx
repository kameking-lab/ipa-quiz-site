import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { usePetProfileView, type PetCommittedDetail } from "@/components/pet/usePetProfileView";
import { emptyPetProfiles, newPetProfile } from "@/lib/pet/v1/profile";
const load = vi.hoisted(() => vi.fn());
vi.mock("@/lib/pet/v1/runtime", () => ({
  preparePetOwner: async (current: () => boolean) => ({ ownerScope: "guest", isCurrent: current }),
  browserPetProfiles: () => ({ load }),
}));
const doc = emptyPetProfiles("guest", "Asia/Tokyo"); doc.profiles.push(newPetProfile("guest", "ap"));
beforeEach(() => { localStorage.clear(); load.mockReset(); load.mockResolvedValue({ status: "ready", document: doc }); });
afterEach(cleanup);
function detail(revision: number, occurredAt = Date.now() + 100): PetCommittedDetail {
  return { ownerScope: "guest", qualificationId: "ap", questionId: "q1", eventId: `event-${revision}`, occurredAt,
    result: { outcome: "applied", document: { ...doc, revision }, reaction: "correct", reward: { growth: 3, bond: 0 }, comboMilestone: null, overcame: false } };
}
const emit = (value: PetCommittedDetail) => act(() => window.dispatchEvent(new CustomEvent("pet-v1:committed", { detail: value })));
it("a supplied room view does not create another auth/load subscription or reaction", async () => {
  const fresh = vi.fn(), hook = renderHook(() => usePetProfileView(fresh, { status: "ready", document: doc }));
  expect(hook.result.current.document).toBe(doc); await act(async () => {}); expect(load).not.toHaveBeenCalled();
  emit(detail(4)); expect(fresh).not.toHaveBeenCalled(); expect(hook.result.current.document).toBe(doc);
});
it("load/restore is read-only and never a fresh reaction; stale/duplicate/other-owner notifications don't replay", async () => {
  const fresh = vi.fn(), write = vi.spyOn(Storage.prototype, "setItem");
  const hook = renderHook(() => usePetProfileView(fresh));
  await waitFor(() => expect(hook.result.current.status).toBe("ready"));
  expect(fresh).not.toHaveBeenCalled(); expect(write).not.toHaveBeenCalled();
  emit(detail(1, 0)); expect(fresh).not.toHaveBeenCalled();
  emit({ ...detail(2), ownerScope: "user:other" }); expect(fresh).not.toHaveBeenCalled();
  emit(detail(2)); emit(detail(2)); expect(fresh).toHaveBeenCalledTimes(1);
  write.mockRestore();
});
it("a slow initial snapshot cannot replace a newer committed profile", async () => {
  let resolve!: (value: unknown) => void;
  load.mockReturnValue(new Promise(value => { resolve = value; }));
  const fresh = vi.fn(), hook = renderHook(() => usePetProfileView(fresh));
  await waitFor(() => expect(load).toHaveBeenCalledTimes(1));
  emit(detail(2));
  await act(async () => resolve({ status: "ready", document: doc }));
  expect(hook.result.current.document?.revision).toBe(2);
  expect(fresh).toHaveBeenCalledTimes(1);
});
